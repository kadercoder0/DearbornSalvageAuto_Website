import React, { useEffect, useState } from 'react';
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import styles from '../Inventory/filterSideBar.module.css';

const FilterSidebar = ({ applyFilters, resetFilters }) => {
  const [isOpen, setIsOpen] = useState(false); // State to track sidebar visibility on mobile
  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    make: '',
    model: '',
    minYear: '',
    price: [0, Number.MAX_SAFE_INTEGER],
    drivetrain: '',
  });


  useEffect(() => {
    const handleWheel = (e) => {
      if (document.activeElement.type === "number") {
        e.preventDefault();
      }
    };

    // Add event listener
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Fetch car data from Firestore
  const fetchCarData = async () => {
    try {
      const carListingsSnapshot = await getDocs(collection(db, 'carListings'));
      const carListings = carListingsSnapshot.docs.map((doc) => doc.data());

      const makes = [...new Set(carListings.map((car) => car.make))];
      const models = [...new Set(carListings.map((car) => car.model))];
      const driveTrains = [...new Set(carListings.map((car) => car.drivetrain))];

      setMakeOptions(makes.map((make) => ({ value: make, label: make })));
      setModelOptions(models.map((model) => ({ value: model, label: model })));
    } catch (error) {
      console.error('Error fetching car data: ', error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, []);

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  const handleSearch = () => {
    const filtersToApply = {
      ...selectedFilters,
      price: [parseInt(minPrice) || 0, parseInt(maxPrice) || Number.MAX_SAFE_INTEGER],
    };
    applyFilters(filtersToApply);
  };

  const handleReset = () => {
    setSelectedFilters({
      make: '',
      model: '',
      minYear: '',
      drivetrain: '',
    });
    setMinPrice('');
    setMaxPrice('');
    resetFilters();
  };

  return (
    <div>
      {/* Toggle button only visible on mobile */}
      <button className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
  
      {/* Sidebar content */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {/* Close button */}
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
          ×
        </button>
  
        <div className={styles.filterWrapper}>
          {/* Min Year */}
          <div className={styles.textField}>
            <label htmlFor="minYear">Min Year</label>
            <input
              type="number"
              id="minYear"
              value={selectedFilters.minYear}
              onChange={(e) => handleFilterChange('minYear', e.target.value)}
              placeholder="Enter minimum year"
            />
          </div>
  
          {/* Make */}
          <div className={styles.textField}>
            <label htmlFor="make">Make</label>
            <input
              type="text"
              id="make"
              value={selectedFilters.make}
              onChange={(e) => handleFilterChange('make', e.target.value.toLowerCase())}
              placeholder="Enter car make"
            />
          </div>
  
          {/* Model */}
          <div className={styles.textField}>
            <label htmlFor="model">Model</label>
            <input
              type="text"
              id="model"
              value={selectedFilters.model}
              onChange={(e) => handleFilterChange('model', e.target.value.toLowerCase())}
              placeholder="Enter car model"
            />
          </div>
  
          {/* Min and Max Price */}
          <div className={styles.textField}>
            <label htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Enter minimum price"
            />
          </div>
          <div className={styles.textField}>
            <label htmlFor="maxPrice">Max Price</label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Enter maximum price"
            />
          </div>
  
          {/* Drivetrain */}
          <div className={styles.textField}>
            <label htmlFor="drivetrain">Drivetrain</label>
            <input
              type="text"
              id="drivetrain"
              value={selectedFilters.drivetrain}
              onChange={(e) => handleFilterChange('drivetrain', e.target.value)}
              placeholder="Enter drivetrain"
            />
          </div>
  
          {/* Buttons */}
          <div className={styles.buttonsWrapper}>
            <button className={styles.searchButton} onClick={handleSearch}>
              Search
            </button>
            <button className={styles.resetButton} onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
