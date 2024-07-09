const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { express: expressMiddleware } = require("@apollo/server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { USERS } = require("./user");
const { TODOS } = require("./todo");
async function startServer() {
  const app = express();

  const typeDefs = gql`
    type User {
      id: ID!
      name: String!
      username: String!
      email: String!
      phone: String!
    }

    type Todo {
      id: ID!
      title: String!
      completed: Boolean!
      user: User
    }

    type Query {
      getTodos: [Todo]
      getAllUser: [User]
      getUser(id: ID!): User
    }
  `;

  const resolvers = {
    Todo: {
      user:  (todo) => {
        USERS.find((e) => e.id === todo.id);
      },
    },
    Query: {
      getTodos: async () => TODOS,
      getAllUser: async () => USERS,

      getUser: async ({ id }) => {
        USERS.find((e) => e.id === id);
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  app.use(cors());
  app.use(bodyParser.json());
  server.applyMiddleware({ app });

  const PORT = 8000;
  app.listen(PORT, () =>
    console.log(
      `Server is running at http://localhost:${PORT}`
    )
  );
}

startServer();
