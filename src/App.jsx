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
    country(code: "IN") {
      name
      capital
      emoji
    }
  }
`;

// const GET_COUNTRY_BY_CODE = gql`
//   query getCountry {
//     country(code: "IN") {
//       name
//       capital
//       emoji
//     }
//   }
// `;

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  //const { countryLoading, countryError, countryData } = useQuery(GET_COUNTRY_BY_CODE);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capital</th>
            <th>Continent</th>
            <th>Language</th>
            <th>code</th>
          </tr>
        </thead>
        <tbody>
          {data.countries.map((country) => (
            <tr key={country.code}>
              <td>{country.name}</td>
              <td>{country.capital}</td>
              <td>{country.continent.name}</td>
              <td>{country.languages.map((lang) => lang.name).join(", ")}</td>
              <td>{country.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Country Details</h1>
      <h2>
        {data.country.name} {data.country.emoji}
      </h2>
      <h3>{data.country.capital}</h3>
    </div>
  );
}

export default App;
