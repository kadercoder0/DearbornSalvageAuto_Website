import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import styles from './managelistings.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const ManageListings = () => {
  const navigate = useNavigate();
  const [carListings, setCarListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    odometer: '',
    price: '',
    cylinders: '',
    vin: '',
    drivetrain: '',
    engineSize: '',
    titleStatus: '',
    color: '',
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]); // For uploading multiple images
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null); // Store the car being edited
  const [imageIndexes, setImageIndexes] = useState({}); // Store image indexes for each car
  const closeModal = () => setModalIsOpen(false);

  const handleProfileClick = () => {
    navigate('/admin/adminprofile'); // Navigate to the admin profile page
  };

  // Open edit modal and set the current car data
  const openEditModal = (car) => {
    setCurrentCar(car);
    setEditModalIsOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => setEditModalIsOpen(false);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const carDocRef = doc(db, 'carListings', currentCar.id); // Reference to the specific car document
  
      // Collect updated form data
      const updatedCarData = {
        make: carData.make || currentCar.make,
        model: carData.model || currentCar.model,
        year: carData.year || currentCar.year,
        odometer: carData.odometer || currentCar.odometer,
        price: carData.price || currentCar.price,
        color: carData.color || currentCar.color,
        cylinders: carData.cylinders || currentCar.cylinders,
        engineSize: carData.engineSize || currentCar.engineSize,
        drivetrain: carData.drivetrain || currentCar.drivetrain,
        titleStatus: carData.titleStatus || currentCar.titleStatus,
      };
  
      // Update the car document with the new data
      await updateDoc(carDocRef, updatedCarData);
  
      alert('Car listing updated successfully!');
      closeEditModal(); // Close the modal after successful edit
      fetchCarListings(); // Refresh the listings
    } catch (error) {
      console.error('Error updating car listing: ', error);
    }
  };
  

  // Handle the form submit for adding a new listing
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageURLs = [];
      for (let file of imageFiles) {
        const imageRef = ref(storage, `cars/${file.name}`);
        const uploadTask = await uploadBytesResumable(imageRef, file);
        const downloadURL = await getDownloadURL(uploadTask.ref);
        imageURLs.push(downloadURL); // Push each uploaded image's URL to the array
      }

      // Add car listing with image URLs
      await addDoc(collection(db, 'carListings'), {
        ...carData,
        images: imageURLs,
      });

      alert('Car listing added successfully!');
      closeModal(); // Close modal after submission
      fetchCarListings(); // Refresh listings
    } catch (error) {
      console.error('Error adding car listing: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'carListings', id));
      alert('Car listing deleted successfully!');
      fetchCarListings(); // Refresh listings
    } catch (error) {
      console.error('Error deleting car listing: ', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };
  

  // Fetch car listings from Firestore
  const fetchCarListings = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'carListings'));
      const cars = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarListings(cars);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching car listings: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarListings();
  }, []);

  // Handle image file selection
  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]); // Set the selected image files
  };

  // Slideshow logic for each car's image set
  const handleNextImage = (carId, totalImages) => {
    setImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [carId]: (prevIndexes[carId] === undefined ? 1 : (prevIndexes[carId] + 1) % totalImages), // Cycle through images
    }));
  };

  const handlePreviousImage = (carId, totalImages) => {
    setImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [carId]: (prevIndexes[carId] === undefined ? totalImages - 1 : (prevIndexes[carId] - 1 + totalImages) % totalImages), // Cycle back through images
    }));
  };

  return (
    <div className={styles.container}>
      {/* Header row with profile icon and title */}
      <div className={styles.header}>
        <h2>Car Listings Management</h2>
        <div className={styles.profileIcon} onClick={handleProfileClick}>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>

      <button onClick={() => setModalIsOpen(true)}>Add New Listing</button>

      {carListings.length === 0 ? (
        <p>No car listings available.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Odometer</th>
                <th>Price</th>
                <th>Color</th>
                <th>Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {carListings.map((car) => {
                const totalImages = car.images.length;
                const currentImageIndex = imageIndexes[car.id] || 0; // Default to 0 if undefined

                return (
                  <tr key={car.id}>
                    <td>{car.make}</td>
                    <td>{car.model}</td>
                    <td>{car.year}</td>
                    <td>{car.odometer}</td>
                    <td>${car.price}</td>
                    <td>{car.color}</td>
                    <td>
                      {totalImages > 0 && (
                        <div className={styles.carousel}>
                          <img
                            src={car.images[currentImageIndex]}
                            alt={`${car.make} ${car.model}`}
                            className={styles.carImage}
                          />
                          <button
                            className={styles.arrowLeft}
                            onClick={() => handlePreviousImage(car.id, totalImages)}
                          >
                            &#8249;
                          </button>
                          <button
                            className={styles.arrowRight}
                            onClick={() => handleNextImage(car.id, totalImages)}
                          >
                            &#8250;
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleDelete(car.id)} className={styles.deleteButton}>
                        <i className="fas fa-trash"></i>
                      </button>
                      <button onClick={() => openEditModal(car)} className={styles.editButton}>
                      <i className="fas fa-pen-to-square"></i>
                    </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Add Car Listing">
        <h2>Add Car Listing</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <input type="text" name="make" placeholder="Make" onChange={handleInputChange} required />
          <input type="text" name="model" placeholder="Model" onChange={handleInputChange} required />
          <input type="number" name="year" placeholder="Year" onChange={handleInputChange} required />
          <input type="number" name="odometer" placeholder="Odometer" onChange={handleInputChange} required />
          <input type="number" name="price" placeholder="Price" onChange={handleInputChange} required />
          <input type="text" name="cylinders" placeholder="Cylinders" onChange={handleInputChange} required />
          <input type="text" name="engineSize" placeholder="Engine Size" onChange={handleInputChange} required />
          <input type="text" name="drivetrain" placeholder="Drivetrain" onChange={handleInputChange} required />
          <input type="text" name="titleStatus" placeholder="Title Status" onChange={handleInputChange} required />
          <input type="text" name="color" placeholder="Color" onChange={handleInputChange} required />
          <input type="text" name="vin" placeholder="VIN" onChange={handleInputChange} required />

          {/* Multiple file input for uploading images */}
          <label>Upload Images</label>
          <input type="file" name="images" multiple onChange={handleImageChange} />

          <button type="submit">Submit</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
      </Modal>


      <Modal isOpen={editModalIsOpen} onRequestClose={closeEditModal} contentLabel="Edit Car Listing">
  <h2>Edit Car Listing</h2>
  {currentCar && (
    <form onSubmit={handleEditSubmit} className={styles.modalForm}>
      <input
        type="text"
        name="make"
        placeholder="Make"
        defaultValue={currentCar.make}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        defaultValue={currentCar.model}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="year"
        placeholder="Year"
        defaultValue={currentCar.year}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="odometer"
        placeholder="Odometer"
        defaultValue={currentCar.odometer}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        defaultValue={currentCar.price}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="color"
        placeholder="Color"
        defaultValue={currentCar.color}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="cylinders"
        placeholder="Cylinders"
        defaultValue={currentCar.cylinders}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="engineSize"
        placeholder="Engine Size"
        defaultValue={currentCar.engineSize}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="drivetrain"
        placeholder="Drivetrain"
        defaultValue={currentCar.drivetrain}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="titleStatus"
        placeholder="Title Status"
        defaultValue={currentCar.titleStatus}
        onChange={handleInputChange}
        required
      />
      
      <button type="submit">Submit</button>
      <button type="button" onClick={closeEditModal}>Cancel</button>
    </form>
  )}
</Modal>


    </div>
  );
};

export default ManageListings;
