import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction de récupération des données
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [hotelRes, restaurantRes, businessRes] = await Promise.all([
          axios.get('https://locabase-api.onrender.com/api/hotels'),
          axios.get('https://locabase-api.onrender.com/api/restaurants'),
          axios.get('https://locabase-api.onrender.com/api/businesses')
        ]);
        setHotels(hotelRes.data);
        setRestaurants(restaurantRes.data);
        setBusinesses(businessRes.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des données :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Fonction de rendu des sections (cartes pour Hôtels, Restaurants et Services)
  const renderSection = (title, emoji, data, color) => {
    return (
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-light">
          <h5 className={`text-${color}`}>
            <span role="img" aria-label={title}>{emoji}</span> {title}
          </h5>
        </div>
        <div className="card-body">
          {data.length === 0 ? (
            <div className="text-center text-muted py-3">
              <p>Aucune donnée disponible pour <strong>{title}</strong>.</p>
            </div>
          ) : (
            <table className="table table-striped table-hover">
              <thead className={`table-${color} text-white`}>
                <tr>
                  <th>Image</th>
                  <th>Nom</th>
                  <th>Adresse</th>
                  <th>Ville</th>
                  <th>Description</th>
                  <th>Contact</th>
                  <th>Pays</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item._id}>
                    <td>
                      {item.image || item.images?.[0] ? (
                        <img
                          src={item.image || item.images[0]}
                          alt={item.nom || item.name || ''}
                          width="60"
                          height="60"
                          style={{ objectFit: 'cover', borderRadius: '8px' }}
                        />
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>{item.nom || item.name || '—'}</td>
                    <td>{item.adresse || item.address || '—'}</td>
                    <td>{item.ville || '—'}</td>
                    <td>{item.description || '—'}</td>
                    <td>{item.contact || item.phone || item.email || '—'}</td>
                    <td>{item.pays || '—'}</td>
                    <td>
                      <button className="btn btn-sm btn-info m-1">
                        <i className="bi bi-pencil-square"></i> Modifier
                      </button>
                      <button className="btn btn-sm btn-danger m-1">
                        <i className="bi bi-trash"></i> Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">📊 Tableau de bord – LocaBase</h2>
        <p className="text-muted">Visualisez les structures enregistrées dans la base</p>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Chargement des données...</p>
        </div>
      ) : (
        <>
          {renderSection('Hôtels', '🏨', hotels, 'primary')}
          {renderSection('Restaurants', '🍽️', restaurants, 'danger')}
          {renderSection('Business / Services', '🏬', businesses, 'success')}
        </>
      )}
    </div>
  );
};

export default Dashboard;
