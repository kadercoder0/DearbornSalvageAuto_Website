import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import styles from './carFeatures.module.css';  // Import the CSS file

const CarFeatures = ({ carId }) => {
  const [carFeatures, setCarFeatures] = useState(null);  // Initialize as null to handle no data scenario
  const [loading, setLoading] = useState(true);  // Loading state to manage fetch status

  useEffect(() => {
    const fetchCarFeatures = async () => {
      if (!carId) {
        console.error("No carId provided!");  // Check if carId is undefined or null
        return;
      }

      try {
        console.log("Fetching car data for ID:", carId);  // Log carId for debugging

        const carDocRef = doc(db, 'carListings', carId);
        const carDoc = await getDoc(carDocRef);

        if (carDoc.exists()) {
          console.log("Car data:", carDoc.data());  // Log the data retrieved
          setCarFeatures(carDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching car features:", error);
      } finally {
        setLoading(false);  // Stop loading after data fetch
      }
    };

    if (carId) {
      fetchCarFeatures();  // Only fetch if carId exists
    }
  }, [carId]);

  // Loading state or no data fallback
  if (loading) {
    return <p>Loading car data...</p>;
  }

  if (!carFeatures) {
    return <p>No car details available.</p>;
  }

  // Render car features if available
  return (
    <div className={styles.featuresContainer}>
      <h3 className={styles.title}>Vehicle Info</h3>
      <ul className={styles.featuresList}>

        <li>
          {/* <i class="fas fa-tachometer-alt"></i>*/}
          <span className={styles.icon}><i className="fas fa-tachometer"></i></span>
          <span className={styles.label}>Mileage:</span> {carFeatures.odometer || 'N/A'}

        </li>

        <li>
        {/* <i class="fa-solid fa-dollar-sign"></i>*/}

        <span className={styles.icon}><i className="fas fa-solid fa-dollar-sign"></i></span>
        <span className={styles.label}>Price:</span> {carFeatures.price || 'N/A'}

        </li>

        <li>
        <span className={styles.icon}><i className="fas fa-cogs"></i></span>
        <span className={styles.label}>Cylinders:</span> {carFeatures.cylinders || 'N/A'}
        </li>

        <li>
          <span className={styles.icon}><i className="fas fa-cogs"></i></span>
          <span className={styles.label}>Engine:</span> {carFeatures.engineSize || 'N/A'}
        </li>
        <li>
          <span className={styles.icon}><i className="fas fa-car"></i></span>
          <span className={styles.label}>Transmission:</span> {carFeatures.transmission || 'Automatic'}
        </li>
        <li>
          <span className={styles.icon}><i className="fas fa-car"></i></span>
          <span className={styles.label}>DriveTrain:</span> {carFeatures.drivetrain || 'N/A'}
        </li>
        <li>
          <span className={styles.icon}><i className="fas fa-gas-pump"></i></span>
          <span className={styles.label}>Fuel:</span> {carFeatures.fuel || 'Gasoline'}
        </li>
        <li>
          <span className={styles.icon}><i className="fas fa-paintbrush"></i></span>
          <span className={styles.label}>Exterior Color:</span> {carFeatures.color || 'N/A'}
        </li>
        
        <li>
          <span className={styles.icon}><i className="fas fa-car"></i></span>
          <span className={styles.label}>Title:</span> {carFeatures.titleStatus || 'N/A'}
        </li>
        <li>
          <span className={styles.icon}><i className="fas fa-barcode"></i></span>
          <span className={styles.label}>VIN:</span> {carFeatures.vin || 'N/A'}
        </li>
      </ul>
    </div>
  );
};

export default CarFeatures;
