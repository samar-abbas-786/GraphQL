const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyparser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `type User{
    id:ID!
    name:String!
    username:String!
    email:String!
    phone:String!



    }
    
    type Todo{
    id:ID!
    title:String!
    completed:Boolean!
     user:User
    
    }
     
     type Query{
     getTodos:[Todo]
     getAllUser:[User]
     getUser(id:ID!):User
     }`,
    resolvers: {
        Todo:{
            user:async(todo)=>(await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data,
        },
      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
        getAllUser: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
        getUser:async (parent,{id}) =>
            (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
      },
    },
  });

  app.use(cors());
  app.use(bodyparser.json());
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, console.log("App is running at PORT 8000"));
}

startServer();
