import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PackageForm from './PackageForm';


const AdminPackageManager = () => {
  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
console.log("packa",packages);

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

  const handleCreate = async (packageData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/package/create', packageData
      );
      setPackages([...packages, response.data]);
     
    } catch (error) {
      console.error('Error creating package:', error);
     
    }
  };

  const handleUpdate = async (id, packageData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/package/updatepost/${id}`, packageData);
      setPackages(packages.map((pkg) => (pkg._id === id ? response.data : pkg)));
    
      setEditingPackage(null);
    } catch (error) {
      console.error('Error updating package:', error);
     
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/package/deletepost/${id}`);
      setPackages(packages.filter((pkg) => pkg._id !== id));
     
    } catch (error) {
      console.error('Error deleting package:', error);
     
    }
  };

  return (
    <div>
      <h2>Admin Package Manager</h2>
      {editingPackage ? (
        <PackageForm
          initialData={editingPackage}
          onSubmit={(data) => handleUpdate(editingPackage._id, data)}
          buttonText="Update Package"
        />
      ) : (
        <PackageForm onSubmit={handleCreate} buttonText="Create Package" />
      )}

      <h3>Existing Packages</h3>
      {packages.map((pkg) => (
        <div key={pkg._id}>
          <h4>{pkg.title}</h4>
          <button onClick={() => setEditingPackage(pkg)}>Edit</button>
          <button onClick={() => handleDelete(pkg._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPackageManager;
