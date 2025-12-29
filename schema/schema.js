const { GraphQLSchema,GraphQLObjectType,GraphQLString } = require('graphql');
const ExampleQuery=new GraphQLObjectType({
    name:'User',
    fields:()=>({
       hello:{
        type:GraphQLString,
        resolve(){
            return 'hello world'
        }   
       }  
    })
})

 module.exports=new GraphQLSchema({
    query:ExampleQuery
 })