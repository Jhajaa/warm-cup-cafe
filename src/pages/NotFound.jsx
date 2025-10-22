import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container">
      <section style={{ 
        paddingTop: '80px', 
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '8rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '20px' }}>
          404
        </div>
        
        <h2 style={{ marginBottom: '20px' }}>Page Not Found</h2>
        
        <p className="muted" style={{ marginBottom: '30px', maxWidth: '500px' }}>
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" className="cta">
            <i className="fas fa-home" style={{ marginRight: '8px' }}></i>
            Go Home
          </Link>
          
          <Link to="/menu" className="cta">
            <i className="fas fa-coffee" style={{ marginRight: '8px' }}></i>
            Browse Menu
          </Link>
          
          <Link to="/order" className="cta">
            <i className="fas fa-shopping-cart" style={{ marginRight: '8px' }}></i>
            Place Order
          </Link>
        </div>
        
        <div style={{ marginTop: '40px' }}>
          <p className="muted">Need help? Contact us at:</p>
          <p>
            <i className="fas fa-envelope" style={{ marginRight: '8px' }}></i>
            info@warmcupcafe.com
          </p>
          <p>
            <i className="fas fa-phone" style={{ marginRight: '8px' }}></i>
            (02) 123-4567
          </p>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
