import React, { useState, useEffect, useRef } from 'react'; 
import CreateListing from './CreateListing'; 
import CarList from './CarList'; 
import { Link } from 'react-router-dom'; 
import Filter from './Filter'; 
import './inventory.css';

const Inventory = () => { 
    const [cars, setCars] = useState([]); 
    const [filteredCars, setFilteredCars] = useState([]); 
    const [originalCars, setOriginalCars] = useState([]); 
    const resetFiltersRef = useRef(null);

    const addListing = (car) => { 
        const updatedCars = [...cars, car]; 
        setCars(updatedCars); 
        setOriginalCars(updatedCars); 
        setFilteredCars(updatedCars); 
    };

    const applyFilter = (filters) => { 
        const filtered = originalCars.filter((car) => { 
            const odometerRange = filters.odometer.split('-'); 
            const minOdometer = odometerRange[0] ? parseInt(odometerRange[0]) : 0; 
            const maxOdometer = odometerRange[1] ? parseInt(odometerRange[1]) : Infinity;

            return (
                (filters.make === '' || car.make === filters.make) &&
                (filters.model === '' || car.model === filters.model) &&
                (filters.year === '' || car.year.toString() === filters.year) &&
                (filters.minPrice === '' || car.price >= parseInt(filters.minPrice)) &&
                (filters.maxPrice === '' || car.price <= parseInt(filters.maxPrice)) &&
                (filters.drivetrain === '' || car.drivetrain === filters.drivetrain) &&
                (filters.engineSize === '' || car.engineSize === filters.engineSize) &&
                (filters.odometer === '' || (car.odometer >= minOdometer && car.odometer <= maxOdometer)) &&
                (filters.titleStatus === '' || car.titleStatus === filters.titleStatus) &&
                (filters.cylinders === '' || car.cylinders.toString() === filters.cylinders)
            );
        });
        setFilteredCars(filtered);
    };

    const resetFilters = () => { 
        setFilteredCars(originalCars); 
        if (resetFiltersRef.current) { 
            resetFiltersRef.current(); 
        } 
    };

    useEffect(() => { 
        setFilteredCars(cars); 
        setOriginalCars(cars); 
    }, [cars]);

    return ( 
        <div className="inventory-page"> 
            <div className="filter-container"> 
                <Filter applyFilter={applyFilter} resetFilters={resetFiltersRef} /> 
                <button onClick={resetFilters}>Reset Filters</button> 
            </div> 
            <div className="main-content"> 
                <div className="listings-container"> 
                    <h1>Inventory</h1> 
                    <nav className="navbar"> 
                        <Link to="/home" className="nav-link">Back to Home</Link> 
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


