import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders/my-orders')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="container" style={{ paddingTop: '160px', color: 'var(--color-muted-grey)' }}>Loading your orders...</div>;

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '80px' }}>
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Your Orders</h1>
        <p style={{ color: 'var(--color-muted-grey)', fontSize: '1.1rem', marginBottom: '48px' }}>Track your requested pieces.</p>

        {orders.length === 0 ? (
          <div style={{ padding: '64px 0', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <Package size={48} style={{ color: 'rgba(255,255,255,0.1)', marginBottom: '16px', margin: '0 auto' }} />
            <p style={{ color: 'var(--color-muted-grey)' }}>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {orders.map((order) => (
              <div key={order.id} style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', padding: '32px', background: 'rgba(255,255,255,0.01)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <p style={{ color: 'var(--color-muted-grey)', fontSize: '0.85rem', marginBottom: '4px' }}>Order Number</p>
                    <p style={{ fontSize: '1rem', letterSpacing: '1px' }}>{order.id.split('-')[0].toUpperCase()}</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--color-muted-grey)', fontSize: '0.85rem', marginBottom: '4px' }}>Date Placed</p>
                    <p style={{ fontSize: '1rem' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--color-muted-grey)', fontSize: '0.85rem', marginBottom: '4px' }}>Total Amount</p>
                    <p style={{ fontSize: '1rem' }}>${order.totalAmount}</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--color-muted-grey)', fontSize: '0.85rem', marginBottom: '4px' }}>Status</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: order.status === 'SHIPPED' ? '#4caf50' : 'var(--color-warm-glow)' }}>
                      {order.status === 'SHIPPED' ? <Truck size={18} /> : <CheckCircle size={18} />}
                      <span style={{ fontSize: '0.9rem' }}>{order.status}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {order.orderItems.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                      <div style={{ 
                        width: '80px', 
                        height: '80px', 
                        backgroundImage: `url(${item.product.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '4px'
                      }} />
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{item.product.name}</h3>
                        <p style={{ color: 'var(--color-muted-grey)', fontSize: '0.9rem' }}>Qty: {item.quantity}</p>
                      </div>
                      <p style={{ fontSize: '1.1rem' }}>${item.priceAtPurchase}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
