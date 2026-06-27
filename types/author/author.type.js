const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");

const BookModel = require("../../model/auther/book");

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => {
    const BookType = require("../book.type");

    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      books: {
        type: new GraphQLList(BookType),
        async resolve(parent) {
          return await BookModel.find({ authorId: parent._id });
        },
      },
    };
  },
});

module.exports = AuthorType;
