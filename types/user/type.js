const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const UserTypes = new GraphQLObjectType({
  name: "user",
  fields: {
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
  },
});
module.exports = UserTypes;
