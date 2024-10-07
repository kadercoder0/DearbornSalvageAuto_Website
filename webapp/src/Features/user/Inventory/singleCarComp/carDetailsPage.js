// CarDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageCarousel from './ImageCarousel'; // Assuming ImageCarousel is a separate component
import CarFeatures from './carFeatures';
import { db } from '../../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import InventoryHeader from '../../Inventory/inventoryHeader';

const CarDetailsPage = () => {
  const { carId } = useParams(); // Get carId from the URL
  const [carData, setCarData] = useState(null);

  useEffect(() => {
    // Fetch the car data from Firestore using carId
    const fetchCarData = async () => {
      try {
        const carDocRef = doc(db, 'carListings', carId);
        const carDoc = await getDoc(carDocRef);
        if (carDoc.exists()) {
          setCarData(carDoc.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCarData();
  }, [carId]);

  if (!carData) {
    return <p>Loading car details...</p>;
  }

  return (
    <div>
      <InventoryHeader />
      <ImageCarousel carImages={carData.images} />
      <CarFeatures carId={carId}/>
    </div>
  );
};

export default CarDetailsPage;
