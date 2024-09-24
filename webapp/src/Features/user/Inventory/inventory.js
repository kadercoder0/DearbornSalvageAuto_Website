import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import styles from './inventory.module.css';
import testVideo from '../../../Assets/test4-1542298376.mp4';
import "../Inventory/inventoryHeader";
import InventoryHeader from '../Inventory/inventoryHeader';
import CarComp from "../Inventory/carComp/carComp.js";

const Inventory = () => {
  const [carListings, setCarListings] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    make: '',
    model: '',
    year: '',
    minPrice: '',
    maxPrice: '',
    condition: '',
  });
  const [imageIndexes, setImageIndexes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false); // State for toggling filters

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
    } catch (error) {
      setError('Error fetching car listings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarListings();
  }, []);

  const handleInputChange = (e) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    let filtered = carListings.filter((car) => {
      const { make, model, year, minPrice, maxPrice, condition } = searchFilters;
      return (
        (!make || car.make.toLowerCase().includes(make.toLowerCase())) &&
        (!model || car.model.toLowerCase().includes(model.toLowerCase())) &&
        (!year || car.year.toString().includes(year)) &&
        (!minPrice || car.price >= parseInt(minPrice)) &&
        (!maxPrice || car.price <= parseInt(maxPrice)) &&
        (!condition || car.titleStatus.toLowerCase() === condition.toLowerCase())
      );
    });
    setFilteredCars(filtered);
  };

  const resetSearch = () => {
    setSearchFilters({
      make: '',
      model: '',
      year: '',
      minPrice: '',
      maxPrice: '',
      condition: '',
    });
    setFilteredCars(carListings);
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
      <InventoryHeader />
    
      <CarComp />

      {/* <button className={styles.toggleButton} onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button> */}

      {showFilters && (
        <div className={styles.searchFilterContainer}>
          <div className={styles.searchFilters}>
            <input
              type="text"
              name="make"
              placeholder="Make"
              value={searchFilters.make}
              onChange={handleInputChange}
              className={styles.searchInput}
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={searchFilters.model}
              onChange={handleInputChange}
              className={styles.searchInput}
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={searchFilters.year}
              onChange={handleInputChange}
              className={styles.searchInput}
            />
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={searchFilters.minPrice}
              onChange={handleInputChange}
              className={styles.searchInput}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={searchFilters.maxPrice}
              onChange={handleInputChange}
              className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchButton}>Filter</button>
            <button onClick={resetSearch} className={styles.resetButton}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
