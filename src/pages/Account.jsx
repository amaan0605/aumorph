import { useShop } from '../context/ShopContext';
import { Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, User, LogOut, Settings, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const Account = () => {
  const { user, logout } = useShop();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch('/api/orders/my-orders')
        .then(res => res.json())
        .then(data => {
          if (!data.error) setOrders(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  if (!user) return <Navigate to="/auth" />;

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '80px' }}>
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '3rem', margin: 0 }}>My Account</h1>
            <p style={{ color: 'var(--color-muted-grey)', fontSize: '1.1rem', marginTop: '8px' }}>Welcome back, {user.name || user.email.split('@')[0]}</p>
          </div>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-muted-grey)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'start' }}>
          
          {/* Profile Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'var(--color-charcoal)', padding: '32px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', marginBottom: '24px' }}>
                <User size={24} color="var(--color-warm-glow)" /> Account Details
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--color-soft-grey)' }}>
                <div>
                  <span style={{ color: 'var(--color-muted-grey)', display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Name</span>
                  <span style={{ fontSize: '1.1rem', color: 'white' }}>{user.name || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-muted-grey)', display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Email</span>
                  <span style={{ fontSize: '1.1rem', color: 'white' }}>{user.email}</span>
                </div>
              </div>
            </div>

            {user.role === 'ADMIN' && (
              <div style={{ background: 'rgba(245, 214, 161, 0.05)', padding: '32px', borderRadius: '4px', border: '1px solid rgba(245, 214, 161, 0.2)' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem', color: 'var(--color-warm-glow)', marginBottom: '16px' }}>
                  <Settings size={24} /> Administrator
                </h2>
                <p style={{ color: 'var(--color-muted-grey)', marginBottom: '24px' }}>You have elevated permissions. Access the backend nexus to manage products, users, and orders.</p>
                <Link to="/admin">
                  <Button style={{ width: '100%', padding: '16px' }}>Open Admin Dashboard</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Orders Section */}
          <div style={{ background: 'var(--color-charcoal)', padding: '32px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', gridColumn: window.innerWidth > 768 ? '2 / -1' : '1' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', marginBottom: '24px' }}>
              <Package size={24} color="var(--color-warm-glow)" /> Order History
            </h2>

            {loading ? (
              <p style={{ color: 'var(--color-muted-grey)' }}>Loading orders...</p>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-muted-grey)' }}>
                <Package size={48} strokeWidth={1} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p style={{ marginBottom: '24px' }}>You haven't placed any orders yet.</p>
                <Link to="/products"><Button>Explore Collection</Button></Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {orders.map(order => (
                  <div key={order.id} style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', marginBottom: '24px' }}>
                      <div>
                        <span style={{ display: 'block', color: 'var(--color-muted-grey)', fontSize: '0.85rem', marginBottom: '4px' }}>ORDER ID</span>
                        <span style={{ fontSize: '0.9rem', color: 'white', fontFamily: 'monospace' }}>#{order.id.slice(0, 8).toUpperCase()}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                         <span style={{ display: 'block', color: 'var(--color-muted-grey)', fontSize: '0.85rem', marginBottom: '4px' }}>DATE</span>
                         <span style={{ fontSize: '0.9rem', color: 'white' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                      {order.orderItems.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: '60px', height: '60px', backgroundImage: `url(${item.product.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'var(--color-black)' }} />
                          <div style={{ flex: 1 }}>
                            <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{item.product.name}</h4>
                            <span style={{ color: 'var(--color-muted-grey)', fontSize: '0.9rem' }}>Qty: {item.quantity}</span>
                          </div>
                          <div style={{ color: 'var(--color-warm-glow)' }}>
                            ${item.priceAtPurchase * item.quantity}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={16} color="var(--color-muted-grey)" /> 
                        <span style={{ 
                          color: order.status === 'PAID' ? '#4CAF50' : 'var(--color-warm-glow)',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          letterSpacing: '0.05em'
                        }}>{order.status}</span>
                      </div>
                      <div style={{ fontSize: '1.2rem' }}>Total: <span style={{ color: 'var(--color-warm-glow)' }}>${order.totalAmount}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
