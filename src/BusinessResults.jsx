import React from 'react';
import './BusinessResults.css';

export const BusinessResults = ({ db }) => {
  return (
    <div>
      <div className="container">
        <h2>Results</h2>
        <div className="center results">
          <span className="items">Name</span>
          <span className="items">address</span>
          <span className="items">category</span>
        </div>

        {db.map((item, i) => (
          <div className="center" key={i}>
            <div className="items">{item.name}</div>
            <div className="items">{item.address}</div>
            <div className="items">{item.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
