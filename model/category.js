const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    default: null,
  },
});
const CategoryModal = mongoose.model("category", CategorySchema);
module.exports = CategoryModal;
