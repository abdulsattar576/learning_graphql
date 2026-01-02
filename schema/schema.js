const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
// custome user
const UserType=new GraphQLObjectType(
    {
        name:"users",
        fields:{
            id:{type:GraphQLString},
            name:{type:GraphQLString},
            age:{type:GraphQLInt}
        }
    }
);
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user:{
type:UserType,
args:{id:{type:GraphQLString}},
resolve(parent,args){
const users=[
    {
        id:'1',
        name:'sattar',
        age:23
    },
    {
        id:'2',
        name:'haroon',
        age:24
    },
    {
        id:'3',
        name:'kashif',
        age:22
    }
]
 return users.find(user=>user.id === args.id)
}
    },
   
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
});
module.exports = schema;
