import React, { useState } from 'react';

const PackageForm = ({ onSubmit, initialData = {}, buttonText }) => {
  const [formData, setFormData] = useState({
    destination: initialData.destination || '',
    title: initialData.title || '',
    description: initialData.description || '',
    price: initialData.price || '',
    availableDates: initialData.availableDates || '',
    maxTravelers: initialData.maxTravelers || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      availableDates: formData.availableDates.split(',').map((date) => new Date(date)),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={formData.destination}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      ></textarea>
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="availableDates"
        placeholder="Available Dates (comma-separated)"
        value={formData.availableDates}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="maxTravelers"
        placeholder="Max Travelers"
        value={formData.maxTravelers}
        onChange={handleChange}
        required
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default PackageForm;
