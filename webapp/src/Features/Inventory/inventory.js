import React, { useState, useEffect } from 'react';
import CreateListing from './CreateListing';
import CarList from './CarList';
import { Link } from 'react-router-dom'; 
import Filter from './Filter';
import './inventory.css'; // Import CSS for styling

const Inventory = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [originalCars, setOriginalCars] = useState([]);

  const addListing = (car) => {
    const updatedCars = [...cars, car];
    setCars(updatedCars);
    setOriginalCars(updatedCars);
    setFilteredCars(updatedCars);
  };

  const applyFilter = (filters) => {
    const filtered = originalCars.filter((car) => {
      return (
        (filters.make === '' || car.make === filters.make) &&
        (filters.model === '' || car.model === filters.model) &&
        (filters.year === '' || car.year.toString() === filters.year) &&
        (filters.minPrice === '' || car.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || car.price <= parseInt(filters.maxPrice))
      );
    });
    setFilteredCars(filtered);
  };

  const resetFilters = () => {
    setFilteredCars(originalCars);
  };

  useEffect(() => {
    setFilteredCars(cars);
    setOriginalCars(cars);
  }, [cars]);

  return (
    <div className="inventory-page">
      <div className="filter-container">
        <Filter applyFilter={applyFilter} />
        <button onClick={resetFilters}>Reset Filters</button>
      </div>
      <div className="main-content">
        <div className="listings-container">
          <h1>Inventory</h1>
          <nav className="navbar">
              <Link to="/home" className="nav-link"> Back to Home</Link>
          </nav>
          <CarList cars={filteredCars} />
        </div>
        <div className="create-listing-container">
          <h2>Create Listing</h2>
          <CreateListing addListing={addListing} />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
