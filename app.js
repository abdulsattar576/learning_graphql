const express=require('express')
const{graphqlHTTP} =require('express-graphql')
const app=express();
const schema=require('./schema/schema')
//middleware
app.use('/graphql',graphqlHTTP(
    {
schema,
graphiql:true
    }
))
app.listen(3000,()=>{
    console.log('server is running on port 3000')
})