import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./inventory.module.css";
import "../Inventory/inventoryHeader";
import InventoryHeader from "../Inventory/inventoryHeader";
import CarComp from "../Inventory/carComp/carComp.js";
import FilterSidebar from "../Inventory/filterSideBar.js";
import "./carComp/carCompStyle.module.css";

const Inventory = () => {
  const [carListings, setCarListings] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false); // New state to track if filters are applied

  const fetchCarListings = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "carListings"));
      const cars = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarListings(cars);
      setFilteredCars(cars);
      console.log("Car Listings from Firestore:", cars);
    } catch (error) {
      setError("Error fetching car listings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarListings();
  }, []);

  const applyFilters = (filters) => {
    const { make, model, minYear, price, drivetrain } = filters;

    const filtered = carListings.filter((car) => {
      return (
        (!make || car.make.toLowerCase().includes(make)) &&
        (!model || car.model.toLowerCase().includes(model)) &&
        (!minYear || car.year >= parseInt(minYear)) &&
        (!drivetrain ||
          car.drivetrain.toLowerCase().includes(drivetrain.toLowerCase())) &&
        (!price || (car.price >= price[0] && car.price <= price[1]))
      );
    });

    setFilteredCars(filtered);
    setIsFiltered(true); // Set filter state to true when filters are applied
  };

  const resetFilters = () => {
    setFilteredCars(carListings);
    setIsFiltered(false); // Reset filter state
  };

  return (
    <div>
      <InventoryHeader />
      <div className={styles.inventoryPage}>
        <FilterSidebar
          applyFilters={applyFilters}
          resetFilters={resetFilters}
        />
        <div className={styles.mainContent}>
          <div className={`${styles.carCardWrapper}`}>
            <CarComp carListings={filteredCars} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
