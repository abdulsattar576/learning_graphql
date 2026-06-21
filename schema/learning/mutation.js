const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
let users = [
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
//mutation learning
const mutationUser = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addUser: {
      type: UserType,
      args: { name: { type: GraphQLString }, age: { type: GraphQLInt } },
      resolve(parent, args) {
        const user = {
          id: Date.now().toString(),
          name: args.name,
          age: args.age,
        };
        users.push(user);
        console.log(users);
        return user;
      },
    },
    UpdateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        console.log(args);
        if (!args.id || !args.name || !args.age) {
          throw new Error("all fields are required");
        }
        const user = users.find((item) => item.id === args.id);
        if (user) {
          user.name = args.name;
          user.age = args.age;
        }
        return user;
      },
    },
    DeleteUser:{
      type:UserType,
      args:{id:{type:GraphQLString}},
      resolve(parent,args){
        if(!args.id){
          throw new Error("id are required")
        }
        const user=users.findIndex((u)=>u.id ===args.id)
        if(user === -1) throw new Error("index not found")
          users.splice(user,1)
        
      }
    }
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutationUser,
});
