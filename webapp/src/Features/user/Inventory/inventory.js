import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import styles from './inventory.module.css';
import testVideo from './images/test4-1542298376.mp4';

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
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>Dearborn Salvage Auto</h1>
          <div className={styles.contactInfo}>
            <p>14041 Greenfield Rd, Detroit, MI, United States</p>
            <p>+1 (313)203-6018</p>
          </div>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </nav>
      </header>

      <div className={styles.videoSection}>
        <video
          className={styles.backgroundVideo}
          src={testVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>

      <button className={styles.toggleButton} onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

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

      <div className={styles.carListingsContainer}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {filteredCars.length === 0 && !loading && <p>No cars available.</p>}
        {filteredCars.map((car) => {
          const imagesArray = car.images || [];
          const totalImages = imagesArray.length;
          const currentImageIndex = imageIndexes[car.id] || 0;

          return (
            <div key={car.id} className={styles.carCard}>
              <div className={styles.imageContainer}>
                <img
                  src={imagesArray[currentImageIndex]}
                  alt={`${car.make} ${car.model}`}
                  className={styles.carImage}
                />
                {totalImages > 1 && (
                  <>
                    <button 
                      className={styles.arrowLeft} 
                      onClick={() => handlePreviousImage(car.id, totalImages)} 
                      aria-label="Previous Image"
                    >
                      &#8249;
                    </button>
                    <button 
                      className={styles.arrowRight} 
                      onClick={() => handleNextImage(car.id, totalImages)} 
                      aria-label="Next Image"
                    >
                      &#8250;
                    </button>
                  </>
                )}
              </div>

              <div className={styles.carDetails}>
                <h3>{car.year} {car.make} {car.model}</h3>
                <p><strong>Price:</strong> ${car.price.toLocaleString()}</p>
                <p><strong>Mileage:</strong> {car.odometer.toLocaleString()} miles</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
