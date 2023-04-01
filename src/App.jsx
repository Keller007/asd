import React from 'react';
import './App.css';
import { db } from './db1.js';
import { BusinessResults } from './BusinessResults';
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';

function App() {
  const [selectCat, setSelectCat] = React.useState('All');

  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
  });

  const GET_BUSINESS = gql`
    query Query($filter: BusinessCat) {
      businesses(filter: $filter) {
        address
        category
        name
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_BUSINESS, {
    variables: {
      filter: {
        businescategories: selectCat,
      },
    },
  });

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <h1>Business Search</h1>
      <form>
        <label>
          Select Business Category:
          <select
            onChange={(event) => setSelectCat(event.target.value)}
            value={selectCat}
            className="select"
          >
            <option value="All">All</option>
            <option value="Library">Library</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Car Wash">Car Wash</option>
          </select>
        </label>
        <input type="submit" value="submit" onClick={()=>{refetch}} />
      </form>

      <BusinessResults
        db={
          selectCat === 'All'
            ? data.businesses
            : data.businesses.filter((item) => item.category === selectCat)
        }
      />
    </>
  );
}

export default App;
