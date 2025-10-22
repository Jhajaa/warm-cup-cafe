import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost/itp110'}/order_history.php`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        setError(response.data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Failed to fetch order history');
      console.error('Order history error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#28a745';
      case 'preparing':
        return '#ffc107';
      case 'pending':
        return '#17a2b8';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <section style={{ paddingTop: '80px' }}>
        <div className="section-head">
          <h2>Order History</h2>
          <p className="muted">Your past orders</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h3>No orders yet</h3>
            <p className="muted">You haven't placed any orders yet.</p>
            <a href="/order" className="cta">Place Your First Order</a>
          </div>
        ) : (
          <div className="grid">
            {orders.map(order => (
              <div key={order.id} className="card" style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4>Order #{order.id}</h4>
                  <span 
                    style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      backgroundColor: getStatusColor(order.order_status),
                      color: 'white',
                      fontSize: '0.8rem',
                      textTransform: 'capitalize'
                    }}
                  >
                    {order.order_status}
                  </span>
                </div>
                
                <p><strong>Drink:</strong> {order.drink}</p>
                <p><strong>Size:</strong> {order.size}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Total:</strong> ₱{order.total_price}</p>
                
                {order.notes && (
                  <p><strong>Notes:</strong> {order.notes}</p>
                )}
                
                <p className="muted" style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                  Ordered on: {formatDate(order.created_at)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderHistory;
