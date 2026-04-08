import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
};

export const About = () => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '160px' }}>
      
      {/* Hero Header */}
      <section className="container" style={{ maxWidth: '800px', marginBottom: '160px', textAlign: 'center' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '32px', letterSpacing: '0.02em', fontWeight: 400 }}>
            Designing Stillness
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-soft-grey)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
            Objects should not just exist.<br/>They should alter the frequency of the room.
          </p>
        </motion.div>
      </section>

      {/* Grid Section 1 */}
      <section className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center', marginBottom: '160px' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <div style={{ 
            aspectRatio: '4/5', 
            backgroundImage: 'url(/abstract_shadow.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '2px'
          }} />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ padding: '0 20px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '32px', fontWeight: 400 }}>
            More Than Utility
          </h2>
          <div style={{ fontSize: '1.1rem', color: 'var(--color-soft-grey)', display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: 1.8 }}>
            <p>
              Technology is merely our chisel. While precision manufacturing allows for microscopic detail, our focus is never on the machine.
            </p>
            <p>
              Drawing inspiration from Japanese architecture and wabi-sabi, our pieces anchor chaotic spaces back to a state of calm.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Grid Section 2 */}
      <section className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center', marginBottom: '160px' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ padding: '0 20px', order: 2 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '32px', fontWeight: 400 }}>
            The Material Truth
          </h2>
          <div style={{ fontSize: '1.1rem', color: 'var(--color-soft-grey)', display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: 1.8 }}>
            <p>
              True luxury lies in the texture.
            </p>
            <p>
              Our bespoke botanical polymer diffuses light identically to traditional Japanese washi paper. It blends digital perfection with an organic, tactile warmth that feels undeniably human.
            </p>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ order: 1 }}>
          <div style={{ 
            aspectRatio: '1/1', 
            backgroundImage: 'url(/material_spool.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '2px'
          }} />
        </motion.div>
      </section>

      {/* Concluding Statement */}
      <section className="container" style={{ paddingBottom: '120px', textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h2 style={{ fontSize: '1.8rem', letterSpacing: '0.05em', fontWeight: 400, color: 'var(--color-warm-glow)' }}>
            A presence, not just a product.
          </h2>
        </motion.div>
      </section>

    </div>
  );
};
