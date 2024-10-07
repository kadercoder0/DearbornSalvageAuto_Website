import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import styles from './inventory.module.css';
import testVideo from '../../../Assets/test4-1542298376.mp4';
import "../Inventory/inventoryHeader";
import InventoryHeader from '../Inventory/inventoryHeader';
import CarComp from "../Inventory/carComp/carComp.js";
import FilterSidebar from '../Inventory/filterSideBar.js';

const Inventory = () => {
  const [carListings, setCarListings] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCarListings = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, 'carListings'));
      const cars = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarListings(cars);
      setFilteredCars(cars);
      console.log('Car Listings from Firestore:', cars); // Log fetched car listings
    } catch (error) {
      setError('Error fetching car listings. Please try again later.');
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
        (!drivetrain || car.drivetrain.toLowerCase().includes(drivetrain.toLowerCase())) && // Convert both to lowercase
        (!price || (car.price >= price[0] && car.price <= price[1]))
      );
    });
  
    setFilteredCars(filtered); // Update filtered cars list
  };
  

  
  const resetFilters = () => {
    setFilteredCars(carListings); // Reset the filtered cars list
  };

  const handleNextImage = (carId, totalImages) => {
    setImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [carId]: (prevIndexes[carId] === undefined ? 1 : (prevIndexes[carId] + 1) % totalImages),
    }));
  };

  const handlePreviousImage = (carId, totalImages) => {
    setImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [carId]: (prevIndexes[carId] === undefined ? totalImages - 1 : (prevIndexes[carId] - 1 + totalImages) % totalImages),
    }));
  };

  return (
    <div className={styles.inventoryPage}>
      <FilterSidebar applyFilters={applyFilters} resetFilters={resetFilters} />
      <div className={styles.mainContent}>
        <InventoryHeader />
        <CarComp carListings={filteredCars} />
      </div>
    </div>
  );
};

export default Inventory;
