import mongoose from "mongoose";

async function content() {
  await mongoose.connect("mongodb://127.0.0.1:27017/shopping");

  console.log("Connected.");
}

function convertToObject(document) {
  document._id = document._id.toString();
  return document;
}

const db = { content, convertToObject };

export default db;
