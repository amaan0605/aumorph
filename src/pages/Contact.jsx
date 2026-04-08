import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
};

export const Contact = () => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '160px' }}>
      
      {/* Header section */}
      <section className="container" style={{ maxWidth: '800px', marginBottom: '80px', textAlign: 'center' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px', letterSpacing: '0.02em', fontWeight: 400 }}>
            Connect
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-soft-grey)', lineHeight: 1.8 }}>
            For inquiries, collaborations, or custom commissions.
          </p>
        </motion.div>
      </section>

      {/* Grid Section */}
      <section className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'start', paddingBottom: '160px' }}>
        
        {/* Abstract Image Left Column */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}>
          <div style={{ 
            aspectRatio: '3/4', 
            backgroundImage: 'url(/contact_ambient.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '2px',
            position: 'sticky',
            top: '120px'
          }} />
        </motion.div>

        {/* Form Right Column */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.3 }} style={{ paddingTop: '20px' }}>
          
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', fontWeight: 400 }}>Direct Contact</h3>
            <p style={{ color: 'var(--color-muted-grey)', lineHeight: 1.8 }}>
              We typically respond to all correspondence within 24–48 hours.<br/>
              Let us know how we can shape your space.
            </p>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-muted-grey)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email Address</label>
              <input 
                type="email" 
                placeholder="Ex. hello@example.com"
                style={{
                  width: '100%',
                  padding: '16px 0',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  outline: 'none',
                  fontFamily: 'inherit',
                  fontSize: '1.1rem',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderBottom = '1px solid var(--color-warm-glow)'}
                onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(255,255,255,0.2)'}
              />
            </div>
            
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-muted-grey)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Message</label>
              <textarea 
                rows={4}
                placeholder="Your inquiry..."
                style={{
                  width: '100%',
                  padding: '16px 0',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  outline: 'none',
                  fontFamily: 'inherit',
                  fontSize: '1.1rem',
                  resize: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderBottom = '1px solid var(--color-warm-glow)'}
                onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(255,255,255,0.2)'}
              />
            </div>

            <Button type="button" style={{ marginTop: '24px', padding: '20px', letterSpacing: '0.05em' }}>Submit Inquiry</Button>
          </form>

          {/* Additional details */}
          <div style={{ marginTop: '120px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--color-muted-grey)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Studio</h4>
              <p style={{ color: 'var(--color-soft-grey)', fontSize: '1rem' }}>Tokyo, Japan</p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--color-muted-grey)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Social</h4>
              <a href="#" style={{ color: 'var(--color-soft-grey)', fontSize: '1rem', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseOver={e => e.target.style.color = 'var(--color-warm-glow)'} onMouseOut={e => e.target.style.color = 'var(--color-soft-grey)'}>Instagram</a>
            </div>
          </div>
          
        </motion.div>
      </section>

    </div>
  );
};
