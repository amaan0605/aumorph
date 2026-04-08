import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Truck, ShieldCheck, SunDim, Leaf, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useState, useEffect } from 'react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
};

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          // Parse stringified JSON fields from Prisma if they exist
          let parsedSpecs = {};
          let parsedInTheBox = [];
          try {
            if (data.specs) parsedSpecs = JSON.parse(data.specs);
          } catch (e) { console.error('Failed to parse specs', e); }
          
          try {
            if (data.inTheBox) parsedInTheBox = JSON.parse(data.inTheBox);
          } catch (e) {
            // fallback if it's stored as plain string separated by commas
            if (typeof data.inTheBox === 'string') parsedInTheBox = data.inTheBox.split(',');
          }

          setProduct({
            ...data,
            experience: data.experience || 'A gentle glow that transforms your surroundings into something more intimate, more intentional.',
            specs: Object.keys(parsedSpecs).length > 0 ? parsedSpecs : {
              Material: 'Matte Biodegradable Polymer',
              Light: 'Warm LED (2700K)'
            },
            inTheBox: parsedInTheBox.length > 0 ? parsedInTheBox : [`${data.name} Fixture`, 'Care Guide']
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container section-padding" style={{ paddingTop: '160px', color: 'var(--color-muted-grey)' }}>Loading details...</div>;
  if (!product) return <div className="container section-padding" style={{ paddingTop: '160px', color: 'var(--color-muted-grey)' }}>Product not found.</div>;

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px' }}>
      {/* Hero Section */}
      <section className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'start', marginBottom: '120px' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div style={{
            aspectRatio: '4/5',
            backgroundImage: `url(${product.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '4px',
            position: 'sticky',
            top: '120px'
          }} />
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} style={{ paddingTop: '20px' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '8px' }}>{product.name}</h1>
          <p style={{ fontSize: '1.6rem', color: 'var(--color-warm-glow)', marginBottom: '32px' }}>${product.price}</p>

          <div style={{ fontSize: '1.1rem', color: 'var(--color-soft-grey)', marginBottom: '48px', lineHeight: 1.8 }}>
            <p style={{ marginBottom: '16px' }}>{product.experience.split('.')[0]}.</p>
            <p>Designed for stillness. Crafted layer by layer with precision.</p>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <Button onClick={() => addToCart({ id, ...product })} style={{ flex: 1, padding: '20px', fontSize: '1.1rem' }}>Add to Cart</Button>
            <button
              onClick={() => toggleWishlist({ id, ...product })}
              style={{
                width: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                color: isInWishlist(id) ? 'var(--color-warm-glow)' : 'white',
                borderRadius: '4px'
              }}
            >
              <Heart fill={isInWishlist(id) ? 'var(--color-warm-glow)' : 'none'} size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '0.85rem', color: 'var(--color-muted-grey)', marginBottom: '48px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Truck size={16} /> Free global shipping</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} /> 1 Year Warranty</span>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <Leaf size={24} style={{ color: 'var(--color-warm-glow)', marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'white' }}>Sustainable</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted-grey)' }}>Crafted from biodegradable polymer.</p>
            </div>
            <div>
              <SunDim size={24} style={{ color: 'var(--color-warm-glow)', marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'white' }}>Ambient Warmth</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted-grey)' }}>2700K soft LED to reduce eye strain.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section style={{ backgroundColor: 'var(--color-charcoal)', padding: '120px 0' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', color: 'var(--color-warm-glow)' }}>The Origin</h2>
            <div style={{ fontSize: '1.3rem', color: 'var(--color-soft-grey)', whiteSpace: 'pre-line', lineHeight: 1.8 }}>
              {product.story}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deep Dive & Experience */}
      <section className="container section-padding" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', marginTop: '40px' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '32px' }}>The Experience</h3>
          <div style={{ fontSize: '1.1rem', color: 'var(--color-muted-grey)', whiteSpace: 'pre-line', lineHeight: 1.8 }}>
            {product.experience}
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '32px' }}>Specifications</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {Object.entries(product.specs).map(([key, value]) => (
              <li key={key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                color: 'var(--color-soft-grey)'
              }}>
                <span style={{ color: 'var(--color-muted-grey)' }}>{key}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '32px' }}>In the Box</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {product.inTheBox.map((item, index) => (
              <li key={index} style={{
                padding: '16px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                color: 'var(--color-soft-grey)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-warm-glow)', borderRadius: '50%' }} />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
    </div>
  );
};
