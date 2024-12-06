import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";
import CarFeatures from "./carFeatures";
import CarSpecs from "./CarSpecs";
import { db } from "../../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import InventoryHeader from "../../Inventory/inventoryHeader";
import styles from "./carDetails.module.css";

const CarDetailsPage = () => {
  const { carId } = useParams();
  const [carData, setCarData] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const carDocRef = doc(db, "carListings", carId);
        const carDoc = await getDoc(carDocRef);
        if (carDoc.exists()) {
          setCarData(carDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [carId]);

  if (!carData) {
    return <p>Loading car details...</p>;
  }

  return (
    <div>
      {/* Fixed Header */}
      <InventoryHeader />

      {/* Main Content */}
      <div className={styles.container}>
        {/* Image Carousel Section with Title */}
        <div className={styles.carouselSection}>
          <div className={styles.titleOverlay}>
            <h2 className={styles.carTitle}>
              {carData.year} {carData.make} {carData.model}
            </h2>
          </div>
          <ImageCarousel carImages={carData.images} />
        </div>

        {/* Vehicle Info Section */}
        <div className={styles.vehicleInfoSection}>
          <CarFeatures carId={carId} />
        </div>

        {/* Car Specs Section */}
        <div className={styles.carSpecsContainer}>
          <CarSpecs carId={carId} />
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
