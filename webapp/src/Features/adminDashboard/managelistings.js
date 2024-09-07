import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; // Import React Modal
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase'; // Import Firestore and Storage
import styles from "../adminDashboard/managelisting.module.css";
import "../adminDashboard/managelistings.module.css"

Modal.setAppElement('#root');

const ManageListings = () => {
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
    imageUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [progress, setProgress] = useState(0);

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

  // Call fetchCarListings when the component mounts
  useEffect(() => {
    fetchCarListings();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleInputChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFile) {
      const storageRef = ref(storage, `cars/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress); // Track upload progress
        },
        (error) => {
          console.error('Error uploading image: ', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          try {
            await addDoc(collection(db, 'carListings'), {
              ...carData,
              imageUrl: downloadURL,
            });
            alert('Car listing added successfully!');
            closeModal(); // Close modal after successful submission
            fetchCarListings(); // Refresh car listings
          } catch (error) {
            console.error('Error adding car listing to Firestore: ', error);
          }
        }
      );
    } else {
      alert('Please upload an image.');
    }
  };

  if (loading) return <p>Loading car listings...</p>;

  return (
    <div>
      <h2>Manage Car Listings</h2>
      <button onClick={openModal}>Add New Listing</button>

      {carListings.length === 0 ? (
        <p>No car listings available.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Odometer</th>
              <th>Price</th>
              <th>Color</th>
              <th>Cylinders</th>
              <th>Engine Size</th>
              <th>Drivetrain</th>
              <th>Title Status</th>
              <th>Vin</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {carListings.map((car) => (
              <tr key={car.id}>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.odometer}</td>
                <td>${car.price}</td>
                <td>{car.color}</td>
                <td>{car.cylinders}</td>
                <td>{car.engineSize}</td>
                <td>{car.drivetrain}</td>
                <td>{car.titleStatus}</td>
                <td>{car.vin}</td>
                <td>
                  {car.imageUrl && (
                    <img className={styles.image} src={car.imageUrl} alt={`${car.make} ${car.model}`} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Adding a New Car */}
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
          <input type="text" name="titleStatus" placeholder="Title Status (e.g., Clean, Salvage)" onChange={handleInputChange} required />
          <input type="text" name="color" placeholder="Color" onChange={handleInputChange} required />
          <input type="text" name="vin" placeholder="Vin" onChange={handleInputChange} required />
          <input type="file" onChange={handleImageChange} required />
          <button type="submit">Submit</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
        {progress > 0 && <p>Upload progress: {progress}%</p>}
      </Modal>
    </div>
  );
};

export default ManageListings;