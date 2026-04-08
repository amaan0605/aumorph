import { useShop } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const Checkout = () => {
  const { cart, getCartTotal } = useShop();
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();
    navigate('/payment');
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '80px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>Checkout</h1>
        <p style={{ color: 'var(--color-muted-grey)', fontSize: '1.2rem', marginBottom: '32px' }}>Your cart is empty.</p>
        <Link to="/products"><Button>Return to Collection</Button></Link>
      </div>
    );
  }

  const inputStyle = {
    width: '100%',
    padding: '16px',
    backgroundColor: 'transparent',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--color-white)',
    fontFamily: 'var(--font-sans)',
    borderRadius: '4px',
    fontSize: '1rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: 'var(--color-soft-grey)',
    fontSize: '0.9rem'
  };

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '80px' }}>
      <motion.h1 
        initial="hidden" animate="visible" variants={fadeIn}
        style={{ fontSize: '3rem', marginBottom: '40px' }}
      >
        Checkout
      </motion.h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '80px', alignItems: 'start' }}>
        
        {/* Shipping Form */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '32px' }}>Shipping Address</h2>
          <form onSubmit={handleContinue} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input type="email" style={inputStyle} required defaultValue="" />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input type="text" style={inputStyle} required defaultValue="" />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input type="text" style={inputStyle} required defaultValue="" />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Address</label>
              <input type="text" style={inputStyle} required defaultValue="" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label style={labelStyle}>City</label>
                <input type="text" style={inputStyle} required defaultValue="" />
              </div>
              <div>
                <label style={labelStyle}>Postal Code</label>
                <input type="text" style={inputStyle} required defaultValue="" />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Country</label>
              <select style={{ ...inputStyle, appearance: 'none' }} required>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="EU">European Union</option>
                <option value="JP">Japan</option>
                <option value="AU">Australia</option>
              </select>
            </div>

            <Button type="submit" style={{ width: '100%', padding: '20px', fontSize: '1.1rem', marginTop: '16px' }}>Continue to Payment</Button>
          </form>
        </motion.div>

        {/* Order Summary Sidebar */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.4 }}>
          <div style={{ backgroundColor: 'var(--color-charcoal)', padding: '32px', borderRadius: '4px', position: 'sticky', top: '120px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '24px' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ 
                    width: '60px', 
                    aspectRatio: '4/5', 
                    backgroundImage: `url(${item.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'var(--color-black)',
                    borderRadius: '2px'
                  }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>{item.name}</h4>
                    <p style={{ margin: 0, color: 'var(--color-muted-grey)', fontSize: '0.9rem' }}>Qty: {item.quantity}</p>
                  </div>
                  <span style={{ color: 'var(--color-white)' }}>{item.price}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--color-soft-grey)' }}>
              <span>Subtotal</span>
              <span>${getCartTotal()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: 'var(--color-soft-grey)' }}>
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
              <span>Total</span>
              <span style={{ color: 'var(--color-warm-glow)' }}>${getCartTotal()}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
