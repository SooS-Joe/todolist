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
   * *** UPDATE A DOCUMENT ***
   *
   * You can update a single document or multiple documents in a single call.
   *
   * Here we update the PrepTimeInMinutes value on the document we
   * just found.
   */
  const findOneQuery = { text: "take a shit" };
  const updateDoc = { $set: { text: "take a nut" } };

  // The following updateOptions document specifies that we want the *updated*
  // document to be returned. By default, we get the document as it was *before*
  // the update.
  const updateOptions = { returnDocument: "after" };

  try {
    const updateResult = await collection.findOneAndUpdate(
      findOneQuery,
      updateDoc,
      updateOptions
    );
    console.log(`Here is the updated document:${updateResult.value}\n`);
    console.log(updateResult);
  } catch (err) {
    console.error(
      `Something went wrong trying to update one document: ${err}\n`
    );
  }
  await client.close();
}
run().catch(console.dir);
