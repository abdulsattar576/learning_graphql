const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  graphql,
  GraphQLList,
} = require("graphql");

const AuthorModel = require("../model/auther/Auther");
const AuthorType = require("./author/author.type");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => {
    return {
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      authorId: { type: GraphQLID },
      author: {
        type: AuthorType,
        async resolve(parent) {
          return AuthorModel.findById(parent.authorId);
        },
      },
    };
  },
});
module.exports = BookType;
