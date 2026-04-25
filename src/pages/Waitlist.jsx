import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Instagram } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

export const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      let data;
      try {
        data = await res.json();
      } catch (parseError) {
        throw new Error('Backend is restarting or unavailable. Please make sure you ran the Prisma commands and restarted the server.');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'var(--color-black)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Background */}
      <div style={{
        position: 'absolute',
        inset: -50,
        backgroundImage: 'url(/abstract_shadow.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.6,
        zIndex: 0,
        filter: 'contrast(1.2) brightness(0.8)',
        animation: 'slowPan 30s infinite alternate ease-in-out'
      }} />
      <style>
        {`
          @keyframes slowPan {
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.05) translate(-1%, -1%); }
          }
        `}
      </style>

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 0%, var(--color-black) 90%)',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)',
        zIndex: 1
      }} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '800px',
          width: '100%',
          padding: '0 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <motion.div variants={fadeIn} style={{ marginBottom: '60px' }}>
          <img
            src="/logo.svg"
            alt="AUMORPH"
            style={{ height: '36px', filter: 'invert(1)', opacity: 0.9 }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {!document.querySelector('img[src="/logo.svg"]') && (
            <h1 style={{ fontSize: '1.2rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 300 }}>AUMORPH</h1>
          )}
        </motion.div>

        <motion.h1 variants={fadeIn} style={{
          fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          marginBottom: '24px',
          lineHeight: 1.05,
          color: 'var(--color-white)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          textShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          A study in light and form.
        </motion.h1>

        <motion.p variants={fadeIn} style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          marginBottom: '48px',
          color: 'var(--color-soft-grey)',
          lineHeight: 1.6,
          maxWidth: '500px',
          fontWeight: 300
        }}>
          The first AUMORPH edition is limited.
        </motion.p>

        <motion.div variants={fadeIn} style={{ width: '100%', maxWidth: '420px', marginBottom: '60px' }}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                padding: '32px 24px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '2px', // sharper edges for modern feel
                backgroundColor: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h3 style={{ marginBottom: '12px', color: 'var(--color-white)', fontSize: '1.4rem', fontWeight: 400 }}>You are on the list.</h3>
              <p style={{ color: 'var(--color-soft-grey)', fontSize: '1rem', fontWeight: 300 }}>We will summon you when the light shifts.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '2px',
                    color: 'var(--color-white)',
                    fontSize: '1.05rem',
                    outline: 'none',
                    transition: 'all 0.4s ease',
                    backdropFilter: 'blur(5px)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.5)';
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.08)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.03)';
                  }}
                />
              </div>
              {error && <p style={{ color: '#ff4444', fontSize: '0.9rem', textAlign: 'left' }}>{error}</p>}
              <Button type="submit" disabled={isLoading} style={{
                width: '100%',
                padding: '18px',
                fontSize: '1.1rem',
                letterSpacing: '0.05em',
                borderRadius: '2px',
                textTransform: 'uppercase',
                opacity: isLoading ? 0.7 : 1
              }}>
                {isLoading ? 'Requesting...' : 'Request Access'}
              </Button>
            </form>
          )}
        </motion.div>

        <motion.div variants={fadeIn}>
          <a
            href="https://www.instagram.com/3dthekedaar?igsh=MXZ3c2lzcDN0Y214bA=="
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              color: 'var(--color-soft-grey)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              padding: '12px 24px',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '30px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-white)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-soft-grey)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Instagram size={22} strokeWidth={1.5} />
            <span style={{ fontSize: '0.95rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Witness the process</span>
          </a>
        </motion.div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '0',
          right: '0',
          textAlign: 'center',
          zIndex: 2
        }}
      >
        <p style={{ color: 'var(--color-muted-grey)', fontSize: '0.75rem', letterSpacing: '0.15em', opacity: 0.6 }}>
          © {new Date().getFullYear()} AUMORPH. DESIGNED IN SILENCE.
        </p>
      </motion.div>
    </div>
  );
};
