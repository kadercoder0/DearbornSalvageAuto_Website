import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore methods from firebase/firestore
import { db } from '../../../../firebase'; // Correct path to your firebase config
import styles from './carSpecs.module.css';

const CarSpecs = ({ carId }) => {
  const [carSpecs, setCarSpecs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarSpecs = async () => {
      if (!carId) {
        console.error("No carId provided!");
        return;
      }

      try {
        const carDocRef = doc(db, 'carListings', carId); // Get reference to the document
        const carDoc = await getDoc(carDocRef);

        if (carDoc.exists()) {
          const specs = carDoc.data().carSpecifications;
          setCarSpecs(specs);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching car specifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarSpecs();
  }, [carId]);

  if (loading) {
    return <p>Loading car specifications...</p>;
  }

  if (!carSpecs) {
    return <p>No specifications available for this car.</p>;
  }

  return (
    <div className={styles.carSpecsContainer}>
      <h2>Car Specifications</h2>
      <ul className={styles.carSpecsList}>
        {carSpecs.map((spec, index) => (
          <li key={index}>{spec}</li>
        ))}
      </ul>
    </div>
  );
};

export default CarSpecs;
