import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PackageList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/package/getpackages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div>
      <h2>Available Packages</h2>
      {packages.map((pkg) => (
        <div key={pkg._id}>
          <h3>{pkg.title}</h3>
          <p>{pkg.description}</p>
          <p>Destination: {pkg.destination}</p>
          <p>Price: ${pkg.price}</p>
          <p>Available Dates: {pkg.availableDates.join(', ')}</p>
          <p>Max Travelers: {pkg.maxTravelers}</p>
        </div>
      ))}
    </div>
  );
};

export default PackageList;
