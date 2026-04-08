import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch('/api/admin/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`/api/admin/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchOrders();
  };

  if (loading) return <div style={{ color: 'var(--color-muted-grey)' }}>Loading orders...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '32px' }}>Order Management</h1>
      
      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '16px 24px', color: 'var(--color-soft-grey)', fontWeight: 'normal' }}>Order ID</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-soft-grey)', fontWeight: 'normal' }}>Customer</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-soft-grey)', fontWeight: 'normal' }}>Items</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-soft-grey)', fontWeight: 'normal' }}>Total</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-soft-grey)', fontWeight: 'normal' }}>Status</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-soft-grey)', fontWeight: 'normal' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--color-muted-grey)' }}>{o.id.split('-')[0]}...</td>
                <td style={{ padding: '16px 24px' }}>
                  <div>{o.user.name || 'Unknown'}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted-grey)' }}>{o.user.email}</div>
                </td>
                <td style={{ padding: '16px 24px', color: 'var(--color-muted-grey)' }}>
                  {o.orderItems.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}
                </td>
                <td style={{ padding: '16px 24px', color: 'var(--color-warm-glow)' }}>${o.totalAmount}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem',
                    background: o.status === 'SHIPPED' ? 'rgba(76,175,80,0.1)' : 'rgba(255,255,255,0.05)',
                    color: o.status === 'SHIPPED' ? '#4caf50' : 'var(--color-soft-grey)'
                  }}>
                    {o.status}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <select 
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    style={{ background: 'var(--color-charcoal)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '8px', borderRadius: '4px', outline: 'none' }}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PAID">PAID</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-muted-grey)' }}>No orders strictly found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
