// Existing imports
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import styles from './inventory.module.css';

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

  const fetchCarListings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'carListings'));
      const cars = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarListings(cars);
      setFilteredCars(cars);
    } catch (error) {
      console.error('Error fetching car listings: ', error);
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
      return (
        (searchFilters.make === '' || car.make.toLowerCase().includes(searchFilters.make.toLowerCase())) &&
        (searchFilters.model === '' || car.model.toLowerCase().includes(searchFilters.model.toLowerCase())) &&
        (searchFilters.year === '' || car.year.toLowerCase().includes(searchFilters.year.toLowerCase())) &&
        (searchFilters.minPrice === '' || car.price >= parseInt(searchFilters.minPrice)) &&
        (searchFilters.maxPrice === '' || car.price <= parseInt(searchFilters.maxPrice)) &&
        (searchFilters.condition === '' || car.titleStatus.toLowerCase() === searchFilters.condition.toLowerCase())
      );
    });
    setFilteredCars(filtered);
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
    {/* Header Section */}
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.logo}>Dearborn Salvage Auto</h1>
        <div className={styles.contactInfo}>
          <p>1234 N. Telegraph Road, Dearborn, MI 48127</p>
          <p>(555) 123-4567</p>
        </div>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
      {/* Search Bar Section */}
      <div className={styles.searchFilterContainer}>
        <div className={styles.searchFilters}>

          
          {/* Search Inputs */}
          <input
            type="text"
            name="make"
            placeholder="Make"
            onChange={handleInputChange}
            className={styles.searchInput}
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            onChange={handleInputChange}
            className={styles.searchInput}
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            onChange={handleInputChange}
            className={styles.searchInput}
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            onChange={handleInputChange}
            className={styles.searchInput}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            onChange={handleInputChange}
            className={styles.searchInput}
          />
          <select
            name="condition"
            onChange={handleInputChange}
            className={styles.searchInput}
          >
            <option value="">Condition</option>
            <option value="clean">Clean</option>
            <option value="salvage">Salvage</option>
          </select>
          <button onClick={handleSearch} className={styles.searchButton}>Search</button>
        </div>
      </div>

      {/* Car Listings Section */}
      <div className={styles.carListingsContainer}>
        {filteredCars.length === 0 ? (
          <p>No cars available.</p>
        ) : (
          filteredCars.map((car) => {
            const imagesArray = [car.images?.outside, car.images?.interiorDash, car.images?.backSeat];
            const totalImages = imagesArray.length;
            const currentImageIndex = imageIndexes[car.id] || 0;

            return (
              <div key={car.id} className={styles.carCard}>
                {/* Image Section */}
                <div className={styles.imageContainer}>
                  <img
                    src={imagesArray[currentImageIndex]}
                    alt={`${car.make} ${car.model}`}
                    className={styles.carImage}
                  />
                  <button className={styles.arrowLeft} onClick={() => handlePreviousImage(car.id, totalImages)}>&#8249;</button>
                  <button className={styles.arrowRight} onClick={() => handleNextImage(car.id, totalImages)}>&#8250;</button>
                </div>

                {/* Car Details Section */}
                <div className={styles.carDetails}>
                  <h3>{car.year} {car.make} {car.model}</h3>
                  <p><strong>Price:</strong> ${car.price}</p>
                  <p><strong>Mileage:</strong> {car.odometer} miles</p>
                  <p><strong>Condition:</strong> {car.titleStatus}</p>
                  <p><strong>Engine:</strong> {car.engineSize}</p>
                  <p><strong>Color:</strong> {car.color}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Inventory;
