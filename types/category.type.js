const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  graphql,
  GraphQLList,
} = require("graphql");
const BookModel = require("../model/auther/book");
const BookType = require("./book.type");
const CategoryModal = require("../model/category");

const CategoryType = new GraphQLObjectType({
  name: "category",
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      // books: {
      //   type: new GraphQLList(BookType),
      //   async resolve(parent, args) {
      //     return BookModel.find({ categoryId: parent.id });
      //   },
      // },
      parentCategory: {
        type: CategoryType,
        async resolve(parent) {
          return parent.parentCategory
            ? await CategoryModal.findById(parent.parentCategory)
            : null;
        },
      },
      subCategories: {
        type: new GraphQLList(CategoryType),
        async resolve(parent) {
          return await CategoryModal.find({ parentCategory: parent.id });
        },
      },
    };
  },
});
module.exports = CategoryType;
