import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useState } from 'react';

export const Navbar = () => {
  const { cart, setIsCartOpen, user } = useShop();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
    <motion.nav 
      className="nav-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '24px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <button className="mobile-only" style={{ display: 'none', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => setIsMobileMenuOpen(true)}>
           <Menu size={24} />
        </button>
        <Link to="/" style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '1.5rem', 
          fontWeight: '600',
          color: 'var(--color-white)',
          letterSpacing: '0.1em'
        }}>
          AUMORPH
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '32px', fontSize: '0.9rem', alignItems: 'center' }}>
        <div className="nav-desktop-links" style={{ display: 'flex', gap: '32px' }}>
          <Link to="/products">Collection</Link>
          <Link to="/about">About</Link>
        </div>
        
        <div style={{ display: 'flex', gap: '20px', marginLeft: window.innerWidth > 768 ? '20px' : '0', borderLeft: window.innerWidth > 768 ? '1px solid rgba(255,255,255,0.1)' : 'none', paddingLeft: window.innerWidth > 768 ? '20px' : '0' }}>
          <Link to="/wishlist" aria-label="Wishlist">
            <Heart size={20} color="var(--color-white)" />
          </Link>
          <Link to={user ? "/account" : "/auth"} aria-label="Account">
            <User size={20} color="var(--color-white)" />
          </Link>
          <button 
            onClick={() => setIsCartOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}
            aria-label="Cart"
          >
            <ShoppingBag size={20} color="var(--color-white)" />
            {cartItemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: 'var(--color-warm-glow)',
                color: 'var(--color-black)',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.nav>

    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '80%',
            height: '100vh',
            backgroundColor: 'var(--color-charcoal)',
            zIndex: 200,
            padding: '40px 24px',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', letterSpacing: '0.1em', color: 'white' }}>AUMORPH</span>
            <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'white' }}><X size={24} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '1.2rem', marginTop: '40px' }}>
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Collection</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link to={user ? "/account" : "/auth"} onClick={() => setIsMobileMenuOpen(false)}>Account</Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};
