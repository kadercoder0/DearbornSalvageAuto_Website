import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; // Import React Modal
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase'; // Import Firestore and Storage
import styles from "../adminDashboard/managelisting.module.css";
import "../adminDashboard/managelistings.module.css";

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
  });

  // State for multiple image files
  const [outsideImageFile, setOutsideImageFile] = useState(null);
  const [interiorDashImageFile, setInteriorDashImageFile] = useState(null);
  const [backSeatImageFile, setBackSeatImageFile] = useState(null);
  // eslint-disable-next-line
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

  useEffect(() => {
    fetchCarListings();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleInputChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  // Update the image file states based on file input
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === "outside") setOutsideImageFile(files[0]);
    if (name === "interiorDash") setInteriorDashImageFile(files[0]);
    if (name === "backSeat") setBackSeatImageFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (outsideImageFile && interiorDashImageFile && backSeatImageFile) {
      const outsideRef = ref(storage, `cars/outside/${outsideImageFile.name}`);
      const interiorDashRef = ref(storage, `cars/interiorDash/${interiorDashImageFile.name}`);
      const backSeatRef = ref(storage, `cars/backSeat/${backSeatImageFile.name}`);

      const uploadOutsideTask = uploadBytesResumable(outsideRef, outsideImageFile);
      const uploadInteriorDashTask = uploadBytesResumable(interiorDashRef, interiorDashImageFile);
      const uploadBackSeatTask = uploadBytesResumable(backSeatRef, backSeatImageFile);

      // Upload all three images in parallel
      Promise.all([uploadOutsideTask, uploadInteriorDashTask, uploadBackSeatTask]).then(async ([outsideSnap, interiorDashSnap, backSeatSnap]) => {
        const outsideURL = await getDownloadURL(outsideSnap.ref);
        const interiorDashURL = await getDownloadURL(interiorDashSnap.ref);
        const backSeatURL = await getDownloadURL(backSeatSnap.ref);

        try {
          // Store car data with image URLs
          await addDoc(collection(db, 'carListings'), {
            ...carData,
            images: {
              outside: outsideURL,
              interiorDash: interiorDashURL,
              backSeat: backSeatURL,
            },
          });
          alert('Car listing added successfully!');
          closeModal(); // Close modal after successful submission
          fetchCarListings(); // Refresh car listings
        } catch (error) {
          console.error('Error adding car listing to Firestore: ', error);
        }
      }).catch((error) => {
        console.error('Error uploading images: ', error);
      });
    } else {
      alert('Please upload all three images.');
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
              <th>Images</th>
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
                  {car.images && (
                    <>
                      <img src={car.images.outside} alt="Outside" className={styles.image} />
                      <img src={car.images.interiorDash} alt="Interior Dash" className={styles.image} />
                      <img src={car.images.backSeat} alt="Back Seat" className={styles.image} />
                    </>
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
          <input type="text" name="titleStatus" placeholder="Title Status" onChange={handleInputChange} required />
          <input type="text" name="color" placeholder="Color" onChange={handleInputChange} required />
          <input type="text" name="vin" placeholder="Vin" onChange={handleInputChange} required />

          {/* Three file inputs for three images */}
          <label>Outside Image</label>
          <input type="file" name="outside" onChange={handleImageChange} required />
          <label>Interior Dash Image</label>
          <input type="file" name="interiorDash" onChange={handleImageChange} required />
          <label>Back Seat Image</label>
          <input type="file" name="backSeat" onChange={handleImageChange} required />

          <button type="submit">Submit</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
        {progress > 0 && <p>Upload progress: {progress}%</p>}
      </Modal>
    </div>
  );
};

export default ManageListings;
