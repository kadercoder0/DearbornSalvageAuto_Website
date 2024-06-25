// src/Features/Inventory/CreateListing.js
import React, { useState } from 'react';

const makesAndModels = {
  Acura: ['ILX', 'MDX', 'RDX', 'TLX'],
  AlfaRomeo: ['Giulia', 'Stelvio'],
  Audi: ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7'],
  BMW: ['3 Series', '5 Series', 'X1', 'X3', 'X5'],
  Buick: ['Enclave', 'Encore', 'Envision'],
  Cadillac: ['CT5', 'Escalade', 'XT4', 'XT5', 'XT6'],
  Chevrolet: ['Blazer', 'Camaro', 'Equinox', 'Malibu', 'Silverado', 'Tahoe', 'Traverse'],
  Chrysler: ['300', 'Pacifica', 'Voyager'],
  Dodge: ['Challenger', 'Charger', 'Durango'],
  Fiat: ['500', '500X'],
  Ford: ['Edge', 'Escape', 'Expedition', 'Explorer', 'F-150', 'Mustang'],
  Genesis: ['G70', 'G80', 'G90'],
  GMC: ['Acadia', 'Canyon', 'Sierra', 'Terrain', 'Yukon'],
  Honda: ['Accord', 'Civic', 'CR-V', 'Fit', 'HR-V', 'Insight', 'Odyssey', 'Passport', 'Pilot', 'Ridgeline'],
  Hyundai: ['Elantra', 'Kona', 'Palisade', 'Santa Fe', 'Sonata', 'Tucson'],
  Infiniti: ['Q50', 'QX50', 'QX60', 'QX80'],
  Jaguar: ['E-Pace', 'F-Pace', 'XE', 'XF'],
  Jeep: ['Cherokee', 'Compass', 'Gladiator', 'Grand Cherokee', 'Renegade', 'Wrangler'],
  Kia: ['Forte', 'K5', 'Niro', 'Seltos', 'Sorento', 'Soul', 'Sportage', 'Telluride'],
  LandRover: ['Defender', 'Discovery', 'Range Rover', 'Range Rover Sport'],
  Lexus: ['ES', 'GX', 'IS', 'NX', 'RX', 'UX'],
  Lincoln: ['Aviator', 'Corsair', 'Nautilus', 'Navigator'],
  Mazda: ['CX-3', 'CX-30', 'CX-5', 'CX-9', 'Mazda3', 'Mazda6'],
  MercedesBenz: ['A-Class', 'C-Class', 'E-Class', 'GLA', 'GLC', 'GLE', 'S-Class'],
  Mini: ['Clubman', 'Countryman', 'Hardtop'],
  Mitsubishi: ['Eclipse Cross', 'Mirage', 'Outlander'],
  Nissan: ['Altima', 'Armada', 'Frontier', 'Kicks', 'Leaf', 'Maxima', 'Murano', 'Pathfinder', 'Rogue', 'Sentra', 'Titan', 'Versa'],
  Porsche: ['911', 'Cayenne', 'Macan', 'Panamera'],
  Ram: ['1500', '2500', '3500'],
  Subaru: ['Ascent', 'Crosstrek', 'Forester', 'Impreza', 'Legacy', 'Outback', 'WRX'],
  Tesla: ['Model 3', 'Model S', 'Model X', 'Model Y'],
  Toyota: ['4Runner', 'Avalon', 'Camry', 'Corolla', 'Highlander', 'Land Cruiser', 'Prius', 'RAV4', 'Sequoia', 'Sienna', 'Tacoma', 'Tundra'],
  Volkswagen: ['Atlas', 'Golf', 'Jetta', 'Passat', 'Tiguan'],
  Volvo: ['S60', 'S90', 'V60', 'XC40', 'XC60', 'XC90'],
  // Add more makes and models as needed
};

const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 2000; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};

const CreateListing = ({ addListing }) => {
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addListing(car);
    setCar({
      make: '',
      model: '',
      year: '',
      price: '',
      description: '',
      imageUrl: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Make:</label>
      <select name="make" value={car.make} onChange={handleChange} required>
        <option value="">Select Make</option>
        {Object.keys(makesAndModels).map((make) => (
          <option key={make} value={make}>{make}</option>
        ))}
      </select>
      <label>Model:</label>
      <select name="model" value={car.model} onChange={handleChange} required>
        <option value="">Select Model</option>
        {car.make && makesAndModels[car.make].map((model) => (
          <option key={model} value={model}>{model}</option>
        ))}
      </select>
      <label>Year:</label>
      <select name="year" value={car.year} onChange={handleChange} required>
        <option value="">Select Year</option>
        {getYears().map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <label>Price:</label>
      <input type="number" name="price" value={car.price} onChange={handleChange} required />
      <label>Description:</label>
      <textarea name="description" value={car.description} onChange={handleChange} required />
      <label>Image URL:</label>
      <input type="url" name="imageUrl" value={car.imageUrl} onChange={handleChange} required />
      <button type="submit">Add Listing</button>
    </form>
  );
};

export default CreateListing;
