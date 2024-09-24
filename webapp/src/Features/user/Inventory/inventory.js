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
    let filtered = carListings.filter((car) => {
      const { make, model, year, price, drivetrain } = filters;
  
      // Check if each filter matches, allow empty filters to be considered as matches
      const matchesMake = !make || car.make.toLowerCase() === make.toLowerCase();
      const matchesModel = !model || car.model.toLowerCase() === model.toLowerCase();
      const matchesYear = !year || (car.year >= year[0] && car.year <= year[1]);
      const matchesPrice = !price || (car.price >= price[0] && car.price <= price[1]);
      const matchesDriveTrain = !drivetrain || drivetrain === car.drivetrain;
  

      {/*console.log(`Make: ${car.make} vs Filter: ${make} | Matches: ${matchesMake}`);
      console.log(`Model: ${car.model} vs Filter: ${model} | Matches: ${matchesModel}`);
      console.log(`Year: ${car.year} vs Filter: ${year} | Matches: ${matchesYear}`);
      console.log(`Price: ${car.price} vs Filter: ${price} | Matches: ${matchesPrice}`);
      console.log(`Drivetrain: ${car.drivetrain} vs Filter: ${drivetrain} | Matches: ${matchesDriveTrain}`); */}
  
      const overallMatch = matchesMake && matchesModel && matchesYear && matchesPrice && matchesDriveTrain;
      console.log(`Overall Matches: ${overallMatch}`);
      
      return overallMatch;
    });
  
    console.log('Filtered Cars:', filtered);
    setFilteredCars(filtered);
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
