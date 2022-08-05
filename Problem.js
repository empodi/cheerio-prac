import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  ID: Number,
  title: String,
  tag: [{ type: String }],
});

const problemModel = mongoose.model("Problem", problemSchema);
export default problemModel;
