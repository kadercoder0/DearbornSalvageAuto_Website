import React, { useEffect, useState } from 'react';
import SliderComp from "../Inventory/component/sliderComp";
import AntdSelect from "../Inventory/component/selectCom";
import CheckboxComp from "../Inventory/component/checkboxComp";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import styles from '../Inventory/filterSideBar.module.css';

const FilterSidebar = ({ applyFilters, resetFilters }) => {
  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [yearRange, setYearRange] = useState([2004, 2024]);
  const [priceRange, setPriceRange] = useState([7995, 179995]);
  const [driveTrainOptions, setDriveTrainOptions] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    make: '',
    model: '',
    year: yearRange,
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
      [type]: value
    }));
  };

  // Trigger search function with selected filters
  const handleSearch = () => {
    applyFilters(selectedFilters);
  };

  // Reset filters to default values
  const handleReset = () => {
    const defaultFilters = {
      make: '',
      model: '',
      year: yearRange,
      price: priceRange,
      drivetrain: '',
    };

    setSelectedFilters(defaultFilters); // Reset the filter fields to default
    resetFilters(); // Reset car listings
  };

  return (
    <div className={styles.sidebar}>
      <p>Filter Cars</p>
      <div className={styles.filterWrapper}>
        <SliderComp
          label="Year"
          min={yearRange[0]}
          max={yearRange[1]}
          value={selectedFilters.year} // Use value instead of defaultValue
          onChange={(value) => handleFilterChange('year', value)}
        />
        
        <AntdSelect
          defaultValue="Make"
          options={makeOptions}
          value={selectedFilters.make} // Bind the value prop to selectedFilters
          onChange={(value) => handleFilterChange('make', value)}
        />
        
        <AntdSelect
          defaultValue="Model"
          options={modelOptions}
          value={selectedFilters.model} // Bind the value prop to selectedFilters
          onChange={(value) => handleFilterChange('model', value)}
        />
        
        <SliderComp
          label="Price"
          min={priceRange[0]}
          max={priceRange[1]}
          value={selectedFilters.price} // Use value instead of defaultValue
          onChange={(value) => handleFilterChange('price', value)}
        />

        <CheckboxComp
          label="DriveTrain"
          checkboxData={driveTrainOptions}
          value={selectedFilters.drivetrain} // Bind the value prop to selectedFilters
          onChange={(value) => handleFilterChange('drivetrain', value)}
        />

        {/* Search and Reset Buttons */}
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
        <button className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
