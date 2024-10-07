import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const CarFeatures = ({ carId }) => {
  const [carFeatures, setCarFeatures] = useState({});

  useEffect(() => {
    const fetchCarFeatures = async () => {
      try {
        const carDoc = await getDoc(doc(db, 'carListings', carId));
        if (carDoc.exists()) {
          setCarFeatures(carDoc.data());
        }
      } catch (error) {
        console.error("Error fetching car features: ", error);
      }
    };

    fetchCarFeatures();
  }, [carId]);

  return (
    <div>
      <h2>{carFeatures.model} - {carFeatures.year}</h2>
      <ul>
        <li>Condition: {carFeatures.condition}</li>
        <li>Price: {carFeatures.price}</li>
        <li>Mileage: {carFeatures.mileage}</li>
        <li>Transmission: {carFeatures.transmission}</li>
        <li>Fuel: {carFeatures.fuel}</li>
        <li>DriveTrain: {carFeatures.drivetrain}</li>
        <li>Color: {carFeatures.color}</li>
      </ul>
    </div>
  );
};

export default CarFeatures;
