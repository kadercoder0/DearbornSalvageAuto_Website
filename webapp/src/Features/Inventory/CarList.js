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

            {selectedCar && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img src={selectedCar.imageUrl} alt={`${selectedCar.make} ${selectedCar.model}`} className="modal-image" />
                        <h2>{selectedCar.year} {selectedCar.make} {selectedCar.model}</h2>
                        <p>Price: ${selectedCar.price}</p>
                        <p>Description: {selectedCar.description}</p>
                        <p>Drivetrain: {selectedCar.drivetrain}</p>
                        <p>Engine Size: {selectedCar.engineSize}</p>
                        <p>Odometer: {selectedCar.odometer} miles</p>
                        <p>Title Status: {selectedCar.titleStatus}</p>
                        <p>Cylinders: {selectedCar.cylinders}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarList;
