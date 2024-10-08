import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import CarFeatures from './carFeatures';
import { db } from '../../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import InventoryHeader from '../../Inventory/inventoryHeader'; // Import InventoryHeader
import styles from './carDetails.module.css'; // Import your CSS

const CarDetailsPage = () => {
  const { carId } = useParams();
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
      {/* Inventory Header */}
      <InventoryHeader />

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.carouselSection}>
          <ImageCarousel carImages={carData.images} />
        </div>
        <div className={styles.vehicleInfoSection}>
          <CarFeatures carId={carId} />
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
