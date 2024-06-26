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
      <p>Mileage: {car.mileage} miles</p>
      <p>Drivetrain: {car.drivetrain}</p>
      <p>Cylinders: {car.cylinders}</p>
      <p>{car.description}</p>
      <div className="car-images">
        {car.images.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt={`${car.make} ${car.model}`} className="car-image-large" />
        ))}
      </div>
    </div>
  );
};

export default CarDetails;
