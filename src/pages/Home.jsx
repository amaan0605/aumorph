import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
};

export const Home = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        height: '100vh',
        width: '100%',
        backgroundImage: 'url(/hero_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))'
        }} />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          style={{ position: 'relative', zIndex: 1, maxWidth: '800px', padding: '0 24px' }}
        >
          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            marginBottom: '24px',
            lineHeight: 1.1
          }}>
            Light, shaped by silence.
          </h1>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '40px',
            color: 'var(--color-soft-grey)',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Inspired by Japanese architecture. Designed to transform your space into a moment of calm.
          </p>
          <Link to="/products">
            <Button>Explore Collection</Button>
          </Link>
        </motion.div>
      </section>

      {/* Featured Products Intro */}
      <section className="section-padding container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 80px' }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Not just objects.</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-soft-grey)' }}>A presence in your space.</p>
        </motion.div>

        {/* Featured Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '120px'
        }}>
          {[
            { id: '1', name: 'Torii Light', img: '/torii_light.png' },
            { id: '2', name: 'Kyoto Glow', img: '/kyoto_glow.png' }
          ].map(product => (
            <Link key={product.id} to={`/product/${product.id}`} style={{ display: 'block' }}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                style={{ transition: 'transform 0.4s ease' }}
              >
                <div style={{
                  aspectRatio: '4/5',
                  backgroundImage: `url(${product.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  marginBottom: '24px',
                  borderRadius: '4px'
                }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{product.name}</h3>
                <p style={{ color: 'var(--color-muted-grey)' }}>Designed for stillness.</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section style={{ backgroundColor: 'var(--color-charcoal)' }}>
        <div className="section-padding container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
          >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>The Philosophy of Light</h2>
            <div style={{ fontSize: '1.1rem', color: 'var(--color-soft-grey)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p>In the quiet corners of Kyoto, light is not loud.<br />It does not demand attention. It simply exists — soft, warm, and intentional.</p>
              <p>AUMORPH draws from this philosophy.<br />Each piece is inspired by architectural forms that have stood for centuries, carrying a sense of stillness and balance.</p>
              <p style={{ color: 'var(--color-white)', fontSize: '1.3rem', marginTop: '24px', fontStyle: 'italic' }}>We do not create products.<br />We shape atmosphere.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}
        >
          <div style={{ marginTop: '32px', marginBottom: '40px', borderRadius: '4px', overflow: 'hidden', aspectRatio: '16/9' }}>
            <img src="/process_art.png" alt="Abstract architectural light" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Precision meets art</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-soft-grey)', maxWidth: '500px', margin: '0 auto' }}>
            Modern precision. Timeless inspiration.<br />Brought to life out of darkness.
          </p>
        </motion.div>
      </section>
    </div>
  );
};
