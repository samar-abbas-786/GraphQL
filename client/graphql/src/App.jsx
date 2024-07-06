import "./App.css";
import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "https://localhost:8000/graphql",
  cache: new InMemoryCache(),
});
const query = `
query GetTodos{
getTodos{
title
completed
user{
name
email
phone}
}
}`;

function App() {
  return <></>;
}

export default App;
