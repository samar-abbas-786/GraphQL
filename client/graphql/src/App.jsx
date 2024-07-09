import "./App.css";
import { useQuery, gql } from "@apollo/client";

const query = gql`
  query GetAllTodos {
    getTodos {
      id
      title
      completed
      user {
        name
        email
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(query);
  console.log(data);
  if (loading) return <h1>Loading....</h1>;
  if (error) return console.log("Error Occured", error.message);
  return <div>{JSON.stringify(data)}</div>;
}

export default App;
