const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3030;

//setting up connection to the database
const uri =
	"mongodb+srv://admin:&mC092mDsrsFKJ2a@joster.orjbuos.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect();
console.log("database connection established");
const dbName = "TodoList";
const database = client.db(dbName);

//telling express we are going to send and recieve json objects
app.use(express.json());
app.use(cors());

app.get("/todos", async (request, response) => {
	const collectionName = "Todos";
	const collection = database.collection(collectionName);

	try {
		const cursor = await collection.find({});
		if (!cursor)
			response
				.status(400)
				.send("nothing found in collection " + collectionName);
		else {
			const todos = await cursor.toArray();
			response.status(200).send(todos);
		}
		// add a linebreak
		console.log();
	} catch (err) {
		response.status(500).send(err);
		console.error(
			`Something went wrong trying to find the documents: ${err}\n`
		);
	}
});

app.post("/todos", async (request, response) => {
	const collectionName = "Todos";
	const collection = database.collection(collectionName);
	try {
		const insertResult = await collection.insertOne({
			text: request.body.text,
			done: false
		});
		if (!insertResult) {
			response
				.status(500)
				.send(
					`Can't insert ${request.body.text} into collection "${collectionName}`
				);
		} else {
			const todos = await collection.find({}).toArray();
			response.status(200).send(todos);
		}
	} catch (err) {
		response.status(500).send(err);
		console.error(
			`Something went wrong trying to delete documents: ${err}\n`
		);
	}
});

app.put("/todos", async (request, response) => {
	const collectionName = "Todos";
	const collection = database.collection(collectionName);
	const id = new ObjectId(request.body.id);
	const findOneQuery = { _id: id };
	const updateQuery = {
		$set: { text: request.body.text, done: request.body.done }
	};
	const updateOptions = { returnDocument: "after" };
	try {
		const updateResult = await collection.findOneAndUpdate(
			findOneQuery,
			updateQuery,
			updateOptions
		);
		if (!updateResult) {
			response
				.status(404)
				.send(
					request.params.id +
						" not found in the collection " +
						collectionName
				);
		} else {
			const todos = await collection.find({}).toArray();
			response.status(200).send(todos);
		}
	} catch (err) {
		response.status(500).send(err);
		console.error(
			`Something went wrong trying to update documents: ${err}\n`
		);
	}
});

app.delete("/todos", async (request, response) => {
	const collectionName = "Todos";
	const collection = database.collection(collectionName);
	const id = new ObjectId(request.body.id);
	try {
		const deleteResult = await collection.deleteOne({
			_id: id
		});
		if (!deleteResult) {
			response
				.status(404)
				.send(
					request.params.id +
						" not found in the collection " +
						collectionName
				);
		} else {
			const todos = await collection.find({}).toArray();
			response.status(200).send(todos);
		}
	} catch (err) {
		response.status(500).send(err);
		console.error(
			`Something went wrong trying to delete documents: ${err}\n`
		);
	}
});

app.get("/tshirt", (request, response) => {
	response.status(200).send({
		tshirt: "👕",
		size: "large"
	});
});

app.post("/tshirt/:id", (request, response) => {
	const { id } = request.params;
	const { logo } = request.body;
	if (!logo) {
		response.status(418).send({ message: "we neeed a logo" });
	}
	response.send({
		tshirt: `👕 with your ${logo} and ID of ${id}`
	});
});

app.listen(PORT, () => {
	console.log(`it's alive on http://localhost:${PORT}`);
});
