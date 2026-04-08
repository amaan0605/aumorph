import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
};

export const Policies = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '80px', minHeight: '100vh', maxWidth: '800px' }}>
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <h1 style={{ fontSize: '3rem', marginBottom: '64px' }}>Policies</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          <section id="shipping">
            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Shipping</h2>
            <p style={{ color: 'var(--color-soft-grey)', lineHeight: 1.8 }}>
              Each piece is crafted with care.<br/>
              Please allow a few days for production and dispatch.
            </p>
          </section>

          <section id="returns">
            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Returns</h2>
            <p style={{ color: 'var(--color-soft-grey)', lineHeight: 1.8 }}>
              If something isn't right, we're here to help.<br/>
              Reach out and we'll make it right.
            </p>
          </section>

          <section id="privacy">
            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Privacy</h2>
            <p style={{ color: 'var(--color-soft-grey)', lineHeight: 1.8 }}>
              We respect your privacy. Any information you provide is used strictly to process orders and improve your experience. We do not sell or share your data with third parties.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};
