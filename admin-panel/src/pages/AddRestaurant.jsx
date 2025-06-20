import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurant = () => {
  const [form, setForm] = useState({
    nom: '',
    adresse: '',
    ville: '',
    description: '',
    contact: '',
    image: '',
    continent: '',
    pays: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', imageFile);
    
    try {
      const res = await axios.post('https://locabase-api.onrender.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setForm({ ...form, image: res.data.url });
      alert('✅ Image ajoutée avec succès !');
    } catch (error) {
      console.error(error);
      setErrorMessage("❌ Erreur lors de l'upload de l'image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await axios.post('https://locabase-api.onrender.com/api/restaurants', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('🍽️ Restaurant ajouté avec succès !');
      setForm({
        nom: '',
        adresse: '',
        ville: '',
        description: '',
        contact: '',
        image: '',
        continent: '',
        pays: ''
      });
      setImageFile(null);
    } catch (error) {
      console.error(error);
      setErrorMessage("❌ Erreur lors de l'ajout du restaurant.");
    }
  };

  return (
    <div className="container-lg mt-5">
      <div className="bg-white p-4 rounded shadow-sm">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">🍽️ Ajouter un Restaurant</h2>
          <p className="text-muted">Ajoutez les informations nécessaires pour enregistrer un nouveau restaurant.</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* SECTION INFOS */}
          <fieldset className="border p-3 mb-4 rounded">
            <legend className="w-auto px-2 text-primary fw-semibold">Informations Générales</legend>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">🏷️ Nom</label>
                <input name="nom" className="form-control" value={form.nom} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">📞 Contact</label>
                <input name="contact" className="form-control" value={form.contact} onChange={handleChange} required />
              </div>
            </div>
          </fieldset>

          {/* SECTION LOCALISATION */}
          <fieldset className="border p-3 mb-4 rounded">
            <legend className="w-auto px-2 text-success fw-semibold">📍 Localisation</legend>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Adresse</label>
                <input name="adresse" className="form-control" value={form.adresse} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Ville</label>
                <input name="ville" className="form-control" value={form.ville} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Continent</label>
                <input name="continent" className="form-control" value={form.continent} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Pays</label>
                <input name="pays" className="form-control" value={form.pays} onChange={handleChange} required />
              </div>
            </div>
          </fieldset>

          {/* SECTION DESCRIPTION */}
          <fieldset className="border p-3 mb-4 rounded">
            <legend className="w-auto px-2 text-secondary fw-semibold">📝 Description</legend>
            <div className="mb-3">
              <textarea name="description" className="form-control" value={form.description} onChange={handleChange} rows={3} required />
            </div>
          </fieldset>

          {/* SECTION IMAGE */}
          <fieldset className="border p-3 mb-4 rounded">
            <legend className="w-auto px-2 text-warning fw-semibold">🖼️ Image</legend>
            <div className="mb-3">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <button
                type="button"
                className="btn btn-outline-warning mt-2"
                onClick={handleImageUpload}
                disabled={isUploading}
              >
                {isUploading ? 'Téléchargement...' : '📤 Télécharger l’image'}
              </button>

              {form.image && (
                <div className="mt-3 text-center">
                  <img
                    src={form.image}
                    alt="Aperçu"
                    className="img-thumbnail rounded-circle"
                    style={{ maxWidth: 150 }}
                  />
                </div>
              )}
            </div>
          </fieldset>

          {/* Affichage des erreurs */}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          {/* SUBMIT */}
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary btn-lg">
              ✅ Enregistrer le Restaurant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;
