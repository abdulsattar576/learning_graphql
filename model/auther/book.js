const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  title: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
  },
  categoryId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  ],
});
const BookModel = mongoose.model("book", BookSchema);
module.exports = BookModel;
