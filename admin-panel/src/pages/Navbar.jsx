import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Rediriger vers la page de connexion
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">LocaBase</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Menu avec Flexbox */}
          <div className="d-flex justify-content-between w-100">
            {/* Menu gauche */}
            <ul className="navbar-nav d-flex">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  <i className="bi bi-house-door"></i> Dashboard
                </Link>
              </li>
            </ul>

            {/* Menu central */}
            <ul className="navbar-nav d-flex">
              <li className="nav-item">
                <Link className="nav-link" to="/add-hotel">
                  <i className="bi bi-hotel"></i> Ajouter Hôtel
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-restaurant">
                  <i className="bi bi-cup-hot"></i> Ajouter Restaurant
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-business">
                  <i className="bi bi-building"></i> Ajouter Business
                </Link>
              </li>
            </ul>

            {/* Menu droit */}
            <ul className="navbar-nav d-flex">
              {user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link text-white">
                      <i className="bi bi-person-circle"></i> {user.name}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right"></i> Déconnexion
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm" to="/login">
                    <i className="bi bi-box-arrow-in-right"></i> Connexion
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
