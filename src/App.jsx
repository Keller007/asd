import React from 'react';
import './App.css';
import { db } from './db.js';

function App() {
  console.log(db.businesses);
  return (
    <>
      <h1>Business Search</h1>
      <form>
        <label>
          Select Business Category:
          <select>
            <option value="All">All</option>
            <option value="Library">Library</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Car Wash">Car Wash</option>
          </select>
        </label>
        <input type="submit" value="submit" />
      </form>

      <div className="container">
        <h2>Results</h2>
        <div className="center">
          <span>Name</span>
          <span>address</span>
          <span>category</span>
        </div>

        {db.businesses.map((item, i) => (
          <div className="center">
            <div>{item.name}</div>
            <div>{item.address}</div>
            <div>{item.category}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
