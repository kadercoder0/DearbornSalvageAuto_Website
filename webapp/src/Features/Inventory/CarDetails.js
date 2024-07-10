// src/Features/Inventory/CarDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const CarDetails = ({ cars }) => {
  const { id } = useParams();
  const car = cars.find((car, index) => index.toString() === id);

  if (!car) return <div>Car not found</div>;

  return (
    <div className="car-details">
      <h2>{car.make} {car.model}</h2>
      <p>Year: {car.year}</p>
      <p>Price: ${car.price}</p>
      <p>Odometer: {car.odometer} miles</p>
      <p>Title Status: {car.titleStatus}</p>
      <p>Drivetrain: {car.drivetrain}</p>
      <p>Engine Size: {car.engineSize}</p>
      <p>Cylinders: {car.cylinders}</p>
      <p>{car.description}</p>
      <div className="car-images">
        <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="car-image-large" />
      </div>
    </div>
  );
};

export default CarDetails;
