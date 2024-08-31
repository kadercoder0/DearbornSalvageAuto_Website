import React, { useState } from 'react';

const CarList = ({ cars }) => {
    const [selectedCar, setSelectedCar] = useState(null);

    const handleClick = (car) => {
        setSelectedCar(car);
    };

    const closeModal = () => {
        setSelectedCar(null);
    };

    return (
        <div className="car-list">
            {cars.map((car, index) => (
                <div key={index} className={`car-card`} onClick={() => handleClick(car)}>
                    <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="car-image" />
                    <h3>{car.year} {car.make} {car.model}</h3>
                    <p>Price: ${car.price}</p>
                </div>
            ))}
        </div>
    );
};

export default CarList;
