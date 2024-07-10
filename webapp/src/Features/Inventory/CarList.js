// src/Features/Inventory/CarList.js
import React from 'react';

const CarList = ({ cars }) => {
  return (
    <div className="car-list">
      {cars.map((car, index) => (
        <div key={index} className="car-card">
          <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="car-image" />
          <h2>{car.year} {car.make} {car.model}</h2>
          <p>Price: ${car.price}</p>
        </div>
      ))}
    </div>
  );
};

export default CarList;
