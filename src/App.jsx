import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
    }
  }
`;

const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      capital
      emoji
      currency
    }
  }
`;

function App() {
  const [selectedCode, setSelectedCode] = useState("");

  // 1. Get all countries for dropdown
  const {
    loading: countriesLoading,
    error: countriesError,
    data: countriesData,
  } = useQuery(GET_COUNTRIES);

  // 2. Fetch single country only when selected
  const {
    loading: countryLoading,
    error: countryError,
    data: countryData,
  } = useQuery(GET_COUNTRY, {
    variables: { code: selectedCode },
    skip: !selectedCode, // ✅ don’t run until user picks one
  });

  if (countriesLoading) return <p>Loading countries…</p>;
  if (countriesError) return <p>Error: {countriesError.message}</p>;

  return (
    <div>
      <h2>Select a Country</h2>
      <select
        value={selectedCode}
        onChange={(e) => setSelectedCode(e.target.value)}
      >
        <option value="">-- Choose a country --</option>
        {countriesData.countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>

      {selectedCode && (
        <div>
          <h2>Country Details</h2>
          {countryLoading && <p>Loading country details…</p>}
          {countryError && <p>Error: {countryError.message}</p>}
          {countryData && (
            <div>
              <p>
                {countryData.country.name} {countryData.country.emoji}
              </p>
              <p>Capital: {countryData.country.capital}</p>
              <p>Currency: {countryData.country.currency}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
