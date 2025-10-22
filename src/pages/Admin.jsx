import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost/itp110'}/admin.php`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setOrders(response.data.orders);
        setStats(response.data.stats);
      } else {
        setError(response.data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Admin orders error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost/itp110'}/admin.php`, {
        action: 'update_status',
        order_id: orderId,
        status: newStatus
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        fetchOrders(); // Refresh the orders
      } else {
        setError(response.data.message || 'Failed to update order status');
      }
    } catch (err) {
      setError('Failed to update order status');
      console.error('Update status error:', err);
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
          <h2>Admin Dashboard</h2>
          <p className="muted">Manage orders and view statistics</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {/* Statistics Cards */}
        <div className="grid" style={{ marginBottom: '40px' }}>
          <div className="card">
            <h3>Total Orders</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)' }}>
              {stats.totalOrders}
            </p>
          </div>
          
          <div className="card">
            <h3>Pending Orders</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>
              {stats.pendingOrders}
            </p>
          </div>
          
          <div className="card">
            <h3>Completed Orders</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
              {stats.completedOrders}
            </p>
          </div>
          
          <div className="card">
            <h3>Total Revenue</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)' }}>
              ₱{stats.totalRevenue}
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="section-head">
          <h3>All Orders</h3>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h3>No orders yet</h3>
            <p className="muted">No orders have been placed yet.</p>
          </div>
        ) : (
          <div className="grid">
            {orders.map(order => (
              <div key={order.id} className="card" style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
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
                
                <p><strong>Customer:</strong> {order.customer_name}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
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

                {/* Status Update Buttons */}
                <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {order.order_status !== 'preparing' && (
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#ffc107',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Mark Preparing
                    </button>
                  )}
                  
                  {order.order_status !== 'completed' && (
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Mark Completed
                    </button>
                  )}
                  
                  {order.order_status !== 'cancelled' && (
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Admin;
