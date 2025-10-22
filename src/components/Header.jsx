import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header>
      <div className="container nav">
        <Link className="brand" to="/">
          <span>Warm Cup Café</span>
        </Link>
        
        <nav aria-label="Primary">
          <ul className={isMenuOpen ? 'show' : ''}>
            <li>
              <Link 
                to="/" 
                className={isActive('/') ? 'active' : ''}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/menu" 
                className={isActive('/menu') ? 'active' : ''}
                onClick={closeMenu}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={isActive('/about') ? 'active' : ''}
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/order" 
                className={isActive('/order') ? 'active' : ''}
                onClick={closeMenu}
              >
                Order
              </Link>
            </li>
          </ul>
        </nav>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <span className="user-greeting">Hello, {user?.full_name}</span>
              <Link to="/order-history" className="cta">Order History</Link>
              {user?.email === 'admin@coffeeshop.com' && (
                <Link to="/admin" className="cta">Admin</Link>
              )}
              <button onClick={handleLogout} className="cta">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="cta">Login</Link>
              <Link to="/register" className="cta">Register</Link>
            </>
          )}
        </div>

        <div 
          className="hamburger" 
          id="hamburger" 
          aria-label="Toggle navigation" 
          aria-expanded={isMenuOpen}
          role="button"
          tabIndex="0"
          onClick={toggleMenu}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
