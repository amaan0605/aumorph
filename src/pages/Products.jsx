import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
};

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container" style={{ paddingTop: '160px', color: 'var(--color-muted-grey)' }}>Loading the collection...</div>;

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '80px', minHeight: '100vh' }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        style={{ marginBottom: '80px' }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Collection</h1>
        <p style={{ color: 'var(--color-muted-grey)', fontSize: '1.1rem' }}>Designed for stillness.</p>
      </motion.div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '60px'
      }}>
        {products.map((product, index) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: index * 0.2 }}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ 
                aspectRatio: '4/5', 
                backgroundImage: `url(${product.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '24px',
                borderRadius: '4px',
                backgroundColor: 'var(--color-charcoal)'
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.4rem' }}>{product.name}</h3>
                <span style={{ color: 'var(--color-muted-grey)' }}>${product.price}</span>
              </div>
              <p style={{ color: 'var(--color-muted-grey)', marginTop: '8px', fontSize: '0.9rem' }}>A presence, not just an object.</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};
