import React from 'react'
import  { useState } from 'react';

export default function Personne() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        cin: '',
        email: ''
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/envoyerInfo', { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
      
            if (response.ok) {
              console.log('Données enregistrées avec succès !');
              setFormData({
                firstName: '',
                lastName: '',
                cin: '',
                email: ''
              });
            } else {
              console.error('Erreur lors de l\'enregistrement des données');
            }
          } catch (error) {
            console.error('Erreur lors de la communication avec le serveur :', error);
          }
      };
  return (
    <>

        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                </div>
                    <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="cin">CIN:</label>
                    <input type="text" id="cin" name="cin" value={formData.cin} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
         
    </>
  )
}