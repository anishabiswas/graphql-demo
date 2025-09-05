import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_COUNTRIES = gql`
  query getcountries {
    countries {
      name
      capital
      continent {
        name
      }
      languages {
        name
      }
      code
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Capital</th>
          <th>Continent</th>
          <th>Language</th>
        </tr>
      </thead>
      <tbody>
        {data.countries.map((country) => (
          <tr key={country.code}>
            <td>{country.name}</td>
            <td>{country.capital}</td>
            <td>{country.continent.name}</td>
            <td>{country.languages.map((lang) => lang.name).join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
