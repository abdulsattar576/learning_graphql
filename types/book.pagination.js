const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  graphql,
  GraphQLList,
  GraphQLInt,
} = require("graphql");

const BookType = require("./book.type");

const BookPaginationType = new GraphQLObjectType({
  name: "BookPagination",
  fields: () => {
    return {
      books: {
        type: new GraphQLList(BookType),
      },
      totalPages: {
        type: GraphQLInt,
      },
      currentPage: {
        type: GraphQLInt,
      },
      hasNextPage: {
        type: GraphQLString,
      },
      hasPreviousPage: {
        type: GraphQLString,
      },
    };
  },
});
module.exports = BookPaginationType;
