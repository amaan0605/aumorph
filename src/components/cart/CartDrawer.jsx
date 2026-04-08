import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import { Button } from '../ui/Button';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, getCartTotal } = useShop();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleGoToCart = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000
            }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: "easeOut" }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              maxWidth: '450px',
              height: '100vh',
              backgroundColor: 'var(--color-charcoal)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ padding: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', m: 0 }}>Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--color-white)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
              {cart.length === 0 ? (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'var(--color-muted-grey)' }}>
                  <p>Your cart is empty.</p>
                  <Button style={{ marginTop: '32px', padding: '16px 32px' }} onClick={() => setIsCartOpen(false)}>Continue Browsing</Button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ 
                        width: '80px', 
                        height: '100px', 
                        backgroundImage: `url(${item.imageUrl || item.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: 'var(--color-black)',
                        borderRadius: '4px'
                      }} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{item.name}</h4>
                          <p style={{ margin: '4px 0 0 0', color: 'var(--color-warm-glow)' }}>${item.price}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Minus size={14} /></button>
                            <span style={{ fontSize: '0.9rem' }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Plus size={14} /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: 'var(--color-muted-grey)', cursor: 'pointer' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'var(--color-black)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '1.2rem' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--color-warm-glow)' }}>${getCartTotal()}</span>
                </div>
                <Button style={{ width: '100%', marginBottom: '12px', padding: '16px' }} onClick={handleCheckout}>Proceed to Checkout</Button>
                <button 
                  onClick={handleGoToCart}
                  style={{ width: '100%', padding: '16px', background: 'var(--color-charcoal)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', borderRadius: '4px' }}
                >
                  View Full Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
