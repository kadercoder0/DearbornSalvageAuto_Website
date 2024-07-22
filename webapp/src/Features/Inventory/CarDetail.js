import React from 'react';
import { useLocation } from 'react-router-dom';

const CarDetail = () => {
    const location = useLocation();
    
    if (!location.state || !location.state.car) {
        return <div>No car details found.</div>;
    }

    const car = location.state.car;

    return (
        <div className="car-details">
            <h2>{car.year} {car.make} {car.model}</h2>
            <p>Price: ${car.price}</p>
            <p>Description: {car.description}</p>
            <p>Drivetrain: {car.drivetrain}</p>
            <p>Engine Size: {car.engineSize}</p>
            <p>Odometer: {car.odometer} miles</p>
            <p>Title Status: {car.titleStatus}</p>
            <p>Cylinders: {car.cylinders}</p>
        </div>
    );
};

export default CarDetail;
