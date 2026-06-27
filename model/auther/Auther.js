const mongoose = require("mongoose");
const AuthorSchema = new mongoose.Schema({
  name: String,
});
const AuthorModel = mongoose.model("author", AuthorSchema);
module.exports = AuthorModel;
