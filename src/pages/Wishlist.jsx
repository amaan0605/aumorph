import { useShop } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartOff } from 'lucide-react';
import { Button } from '../components/ui/Button';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export const Wishlist = () => {
  const { wishlist, toggleWishlist } = useShop();

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '80px' }}>
      <motion.div initial="hidden" animate="visible" variants={fadeIn} style={{ marginBottom: '80px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Wishlist</h1>
        <p style={{ color: 'var(--color-muted-grey)', fontSize: '1.1rem' }}>Your saved pieces.</p>
      </motion.div>

      {wishlist.length === 0 ? (
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}>
          <p style={{ color: 'var(--color-muted-grey)', fontSize: '1.2rem', marginBottom: '32px' }}>Your wishlist is empty.</p>
          <Link to="/products"><Button>Explore Collection</Button></Link>
        </motion.div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product, index) => (
            <motion.div 
              key={product.id}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              style={{ position: 'relative' }}
            >
              <Link to={`/product/${product.id}`}>
                <div className="wishlist-img" style={{ 
                  backgroundImage: `url(${product.imageUrl || product.img})`,
                  marginBottom: '24px',
                  backgroundColor: 'var(--color-charcoal)'
                }} />
              </Link>
              
              <button 
                onClick={(e) => toggleWishlist(product)}
                style={{ 
                  position: 'absolute', 
                  top: '16px', 
                  right: '16px', 
                  background: 'rgba(0,0,0,0.5)', 
                  border: 'none', 
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <HeartOff size={20} color="var(--color-white)" />
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.4rem' }}>{product.name}</h3>
                <span style={{ color: 'var(--color-muted-grey)' }}>${product.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
