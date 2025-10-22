import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Order = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    drink: '',
    size: 'small',
    quantity: 1,
    notes: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
      setFormData(prev => ({
        ...prev,
        customer_name: JSON.parse(userData).full_name
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculatePrice = () => {
    const basePrices = {
      'espresso': 130,
      'latte': 80,
      'cappuccino': 115,
      'americano': 120,
      'mocha': 70,
      'caramel-macchiato': 150,
      'iced-coffee': 100,
      'hazelnut-coffee': 199,
      'flat-white': 140,
      'matcha-latte': 160,
      'cold-brew': 120,
      'affogato': 180
    };

    const sizeMultipliers = {
      'small': 0,
      'medium': 20,
      'large': 40
    };

    const basePrice = basePrices[formData.drink] || 0;
    const sizePrice = sizeMultipliers[formData.size] || 0;
    const totalPrice = (basePrice + sizePrice) * parseInt(formData.quantity);

    return totalPrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const orderData = {
        ...formData,
        total_price: calculatePrice(),
        user_id: isLoggedIn ? user.id : null
      };

      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost/itp110'}/order.php`, orderData);
      
      if (response.data.success) {
        setSuccess('Order placed successfully! Thank you for choosing Warm Cup Café.');
        setFormData({
          customer_name: isLoggedIn ? user.full_name : '',
          phone: '',
          drink: '',
          size: 'small',
          quantity: 1,
          notes: ''
        });
        
        setTimeout(() => {
          if (isLoggedIn) {
            navigate('/order-history');
          } else {
            navigate('/');
          }
        }, 3000);
      } else {
        setError(response.data.message || 'Order failed');
      }
    } catch (err) {
      setError('Order failed. Please try again.');
      console.error('Order error:', err);
    } finally {
      setLoading(false);
    }
  };

  const drinks = [
    { value: 'espresso', label: 'Espresso - ₱130' },
    { value: 'latte', label: 'Latte - ₱80' },
    { value: 'cappuccino', label: 'Cappuccino - ₱115' },
    { value: 'americano', label: 'Americano - ₱120' },
    { value: 'mocha', label: 'Mocha - ₱70' },
    { value: 'caramel-macchiato', label: 'Caramel Macchiato - ₱150' },
    { value: 'iced-coffee', label: 'Iced Coffee - ₱100' },
    { value: 'hazelnut-coffee', label: 'Hazelnut Coffee - ₱199' },
    { value: 'flat-white', label: 'Flat White - ₱140' },
    { value: 'matcha-latte', label: 'Matcha Latte - ₱160' },
    { value: 'cold-brew', label: 'Cold Brew - ₱120' },
    { value: 'affogato', label: 'Affogato - ₱180' }
  ];

  return (
    <div className="container">
      <div className="form-container" style={{ maxWidth: '600px' }}>
        <h2>Order Your Coffee</h2>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="customer_name">Full Name</label>
          <input
            type="text"
            id="customer_name"
            name="customer_name"
            placeholder="Enter your name"
            value={formData.customer_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="09XX-XXX-XXXX"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="drink">Select Drink</label>
          <select
            id="drink"
            name="drink"
            value={formData.drink}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose a Drink --</option>
            {drinks.map(drink => (
              <option key={drink.value} value={drink.value}>
                {drink.label}
              </option>
            ))}
          </select>

          <label htmlFor="size">Size</label>
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          >
            <option value="small">Small</option>
            <option value="medium">Medium (+₱20)</option>
            <option value="large">Large (+₱40)</option>
          </select>

          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />

          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="E.g. less sugar, extra shot..."
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />

          {formData.drink && (
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px', 
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              <strong>Total Price: ₱{calculatePrice()}</strong>
            </div>
          )}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <a href="/menu" style={{ color: '#5b4646', textDecoration: 'none' }}>
            ← Back to Menu
          </a>
        </div>
      </div>
    </div>
  );
};

export default Order;
