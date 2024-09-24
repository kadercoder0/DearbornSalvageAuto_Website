import React, { useEffect, useState } from "react";
import styles from "./carCompStyle.module.css";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import { db } from "../../../../firebase"; // Firestore database instance

const CarComp = () => {
  const [carListings, setCarListings] = useState([]); // State to hold car listings
  const navigate = useNavigate();

  // Fetch car listings from Firestore
  const fetchCarListings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "carListings")); // Assuming "carListings" is your collection
      const cars = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarListings(cars); // Store the fetched cars in state
    } catch (error) {
      console.error("Error fetching car listings: ", error);
    }
  };

  // Use useEffect to call the function when the component mounts
  useEffect(() => {
    fetchCarListings();
  }, []);

  return (
    <div>
      <div className={styles.carCardWrapper}>
        {carListings.map((car) => (
          <div
            className={styles.cardDetail}
            key={car.id}
            onClick={() => navigate(`/inventory/car/${car.id}`)} // Navigate to the car's detail page using its ID
          >
            <img src={car.images[0]} alt={`${car.make} ${car.model}`} /> {/* Display the first image of the car */}

            <h2 className={styles.cardHeader}>
              {car.year} {car.make} {car.model} <br />
              <span>{car.type || "SEDAN 4D"}</span> {/* Assuming car type is stored */}
            </h2>

            <div className={styles.priceWrapper}>
              <p className={styles.stock}>
                Stock #:<span> {car.stock || "N/A"}</span> {/* Assuming stock is stored */}
              </p>

              <p className={styles.carCardPrice}>${car.price}</p>
            </div>

            <p className={styles.autoSales}>Greenfield Auto Center</p>

            <div className={styles.carSpecsWrapper}>
              <div className={styles.carSpecsTextWrapper}>
                <p>Mileage:</p>
                <p>{car.odometer} miles</p>
              </div>
              <div className={styles.carSpecsTextWrapper}>
                <p>Fuel:</p>
                <p>{car.fuelType || "N/A"}</p> {/* Assuming fuel type is stored */}
              </div>
              <div className={styles.carSpecsTextWrapper}>
                <p>Exterior:</p>
                <p>{car.color}</p>
              </div>
              <div className={styles.carSpecsTextWrapper}>
                <p>Interior:</p>
                <p>{car.interior || "N/A"}</p> {/* Assuming interior color is stored */}
              </div>
              <div className={styles.carSpecsTextWrapper}>
                <p>DriveTrain:</p>
                <p>{car.drivetrain || "FWD"}</p>
              </div>
              <div className={styles.carSpecsTextWrapper}>
                <p>Transmission:</p>
                <p>{car.transmission || "AUTO"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarComp;
