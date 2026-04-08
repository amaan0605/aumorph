import { useShop } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const Cart = () => {
  const { cart, getCartTotal, updateQuantity, removeFromCart } = useShop();

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '80px' }}>
      <motion.h1 
        initial="hidden" animate="visible" variants={fadeIn}
        style={{ fontSize: '3rem', marginBottom: '40px' }}
      >
        Your Cart
      </motion.h1>

      {cart.length === 0 ? (
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}>
          <p style={{ color: 'var(--color-muted-grey)', fontSize: '1.2rem', marginBottom: '32px' }}>Your cart is empty.</p>
          <Link to="/products"><Button>Return to Collection</Button></Link>
        </motion.div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '60px', alignItems: 'start' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '24px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ 
                  width: '120px', 
                  aspectRatio: '4/5', 
                  backgroundImage: `url(${item.imageUrl || item.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: 'var(--color-charcoal)',
                  borderRadius: '4px'
                }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '1.4rem', margin: 0 }}>{item.name}</h3>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-warm-glow)', margin: 0 }}>{item.price}</p>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '4px' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Minus size={16} /></button>
                      <span style={{ width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Plus size={16} /></button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      style={{ background: 'none', border: 'none', color: 'var(--color-muted-grey)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Trash2 size={18} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Cart Summary */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.4 }} style={{ backgroundColor: 'var(--color-charcoal)', padding: '32px', borderRadius: '4px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--color-soft-grey)' }}>
              <span>Subtotal</span>
              <span>${getCartTotal()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: 'var(--color-soft-grey)' }}>
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', fontSize: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
              <span>Total</span>
              <span style={{ color: 'var(--color-warm-glow)' }}>${getCartTotal()}</span>
            </div>
            <Link to="/checkout" style={{ width: '100%' }}>
              <Button style={{ width: '100%', padding: '20px', fontSize: '1.1rem' }}>Proceed to Checkout</Button>
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
};
