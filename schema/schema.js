const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
const UserType = new GraphQLObjectType({
  name: "user",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        const users = [
          {
            id: "1",
            name: "sattar",
            age: 22,
          },
          {
            id: "2",
            name: "haroon",
            age: 2,
          },
        ];
        const user = users.find((user) => user.id === args.id);
        return user;
      },
    },
    hello: {
      type: GraphQLString,
      resolve() {
        return "hello sattar";
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
