const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyparser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `type Todo{
    id:ID!
    movie:String
    image:String
     imdb_url:String
    
    }
     
     type Query{
     getTodos:[Todo]
     }`,
    resolvers: {
      Query: {
        getTodos: async () =>
          (await axios.get("https://dummyapi.online/api/movies")).data,
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
