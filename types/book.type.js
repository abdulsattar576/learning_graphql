const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  graphql,
  GraphQLList,
} = require("graphql");

const AuthorModel = require("../model/auther/Auther");
const AuthorType = require("./author/author.type");
const CategoryModal = require("../model/category");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => {
    const CategoryType = require("./category.type");
    return {
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      categoryId: { type: new GraphQLList(GraphQLID) },
      authorId: { type: GraphQLID },
      author: {
        type: AuthorType,
        async resolve(parent) {
          return AuthorModel.findById(parent.authorId);
        },
      },
      categories: {
        type: new GraphQLList(CategoryType),
        async resolve(parent, args) {
          return await CategoryModal.find({ _id: { $in: parent.categoryId } });
        },
      },
    };
  },
});
module.exports = BookType;
