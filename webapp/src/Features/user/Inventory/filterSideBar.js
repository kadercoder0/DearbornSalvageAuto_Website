import React, { useEffect, useState } from 'react';
//import SliderComp from "../Inventory/component/sliderComp";
import AntdSelect from "../Inventory/component/selectCom";
//import CheckboxComp from "../Inventory/component/checkboxComp";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import styles from '../Inventory/filterSideBar.module.css';

const FilterSidebar = ({ applyFilters, resetFilters }) => {
  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [yearRange, setYearRange] = useState([2004, 2024]); 
  const [priceRange, setPriceRange] = useState([7995, 179995]);
  const [driveTrainOptions, setDriveTrainOptions] = useState([]);

  // Updated price filters using minPrice and maxPrice
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [selectedFilters, setSelectedFilters] = useState({
    make: '',
    model: '',
    minYear: yearRange[0], // Only track minYear
    price: priceRange,
    drivetrain: '',
  });

  // Fetch data from Firestore
  const fetchCarData = async () => {
    try {
      const carListingsSnapshot = await getDocs(collection(db, 'carListings'));
      const carListings = carListingsSnapshot.docs.map(doc => doc.data());

      const makes = [...new Set(carListings.map(car => car.make))];
      const models = [...new Set(carListings.map(car => car.model))];
      const driveTrains = [...new Set(carListings.map(car => car.drivetrain))];

      setMakeOptions(makes.map(make => ({ value: make, label: make })));
      setModelOptions(models.map(model => ({ value: model, label: model })));
      setDriveTrainOptions(driveTrains.map(dt => ({ value: dt, label: dt })));
    } catch (error) {
      console.error("Error fetching car data: ", error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, []);

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [type]: type === 'year' ? value.toString() : value // Convert year to string for Firestore comparison
    }));
  };
  

  // Trigger search function with selected filters
  const handleSearch = () => {
    const filtersToApply = {
      ...selectedFilters,
      drivetrain: selectedFilters.drivetrain.toLowerCase(), // Convert drivetrain filter to lowercase
      make: selectedFilters.make.toLowerCase(),
      model: selectedFilters.model.toLowerCase(),
      price: [parseInt(minPrice) || 0, parseInt(maxPrice) || Number.MAX_SAFE_INTEGER], // Add price range to filters
      minYear: selectedFilters.minYear.toString(), // Convert minYear to string for comparison
    };

    applyFilters(filtersToApply); // Call the applyFilters function with the updated filters
  };

  

   // Reset filters to default values
   const handleReset = () => {
    const defaultFilters = {
      make: '',
      model: '',
      minYear: '', // Reset to default min year
      drivetrain: '',
    };

    // Reset all fields to default
    setSelectedFilters(defaultFilters);
    setMinPrice('');  // Reset price filters
    setMaxPrice('');
    resetFilters(); // Reset car listings
  };

  return (
    <div className={styles.sidebar}>
      <p>Filter Cars</p>
      
      <div className={styles.filterWrapper}>
        {/* Min Year Field */}
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

        
        {/* Make Field */}
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
        
        {/* Model Field */}
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
  
        {/* Min Price Field */}
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
  
        {/* Max Price Field */}
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
  
        {/* Drivetrain Field */}
        <div className={styles.textField}>
          <label htmlFor="drivetrain">DriveTrain</label>
          <input
            type="text"
            id="drivetrain"
            value={selectedFilters.drivetrain}
            onChange={(e) => handleFilterChange('drivetrain', e.target.value)} // Input remains as entered
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
  );  
};

export default FilterSidebar;
