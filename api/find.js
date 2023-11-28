const { MongoClient } = require("mongodb");

async function run() {
  // TODO:
  // Replace the placeholder connection string below with your
  // Altas cluster specifics. Be sure it includes
  // a valid username and password! Note that in a production environment,
  // you do not want to store your password in plain-text here.
  const uri =
    "mongodb+srv://admin:&mC092mDsrsFKJ2a@joster.orjbuos.mongodb.net/?retryWrites=true&w=majority";
  // The MongoClient is the object that references the connection to our
  // datastore (Atlas, for example)
  const client = new MongoClient(uri);

  // The connect() method does not attempt a connection; instead it instructs
  // the driver to connect using the settings provided when a connection
  // is required.
  await client.connect();

  // Provide the name of the database and collection you want to use.
  // If the database and/or collection do not exist, the driver and Atlas
  // will create them automatically when you first write data.
  const dbName = "TodoList";
  const collectionName = "Todos";

  // Create references to the database and collection in order to run
  // operations on them.
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  /*
   * *** FIND DOCUMENTS ***
   *
   * Now that we have data in Atlas, we can read it. To retrieve all of
   * the data in a collection, we call Find() with an empty filter.
   * The Builders class is very helpful when building complex
   * filters, and is used here to show its most basic use.
   */

  try {
    const cursor = await collection.find({});
    cursor.forEach((todo) => {
      console.log(`You have to ${todo.text}.`);
    });
    // add a linebreak
    console.log();
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }

  // We can also find a single document. Let's find the first document
  // that has the string "potato" in the ingredients list.
  const findOneQuery = { text: "take a shit" };

  try {
    const findOneResult = await collection.findOne(findOneQuery);
    if (findOneResult === null) {
      console.log("You don't have to take a shit...\n");
    } else {
      console.log(
        `You have to take a shit, take a look:\n${JSON.stringify(
          findOneResult
        )}\n`
      );
      console.log(
        `You have to take a shit, take a look:\n${findOneResult.text}\n`
      );
    }
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
  }
  await client.close();
}
run().catch(console.dir);
