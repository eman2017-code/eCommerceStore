const mongoose = require("mongoose");

const databaseConnectionString = "mongodb://localhost/ecommerce";

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
