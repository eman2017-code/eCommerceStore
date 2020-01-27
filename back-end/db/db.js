const mongoose = require("mongoose");

// const databaseConnectionString = "mongodb://localhost/ecommerce";
const databaseConnectionString =
  "mongodb+srv://admin:password123*@cluster0-bs1fx.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(databaseConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${databaseConnectionString}`);
});

mongoose.connection.on("disconnected", () => {
  console.log(`Mongoose is disconnected`);
});

mongoose.connection.on("error", err => {
  console.log(err, "mongoose error");
});
