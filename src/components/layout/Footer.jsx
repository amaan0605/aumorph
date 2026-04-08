import { Link, useLocation } from 'react-router-dom';

export const Footer = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer style={{
      backgroundColor: '#050505',
      padding: '80px 40px 40px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '40px'
    }}>
      <div style={{ 
        fontFamily: 'var(--font-heading)', 
        fontSize: '1.5rem', 
        color: 'var(--color-white)',
        letterSpacing: '0.1em'
      }}>
        AUMORPH
      </div>

      <div style={{ display: 'flex', gap: '40px', fontSize: '0.9rem', color: 'var(--color-muted-grey)' }}>
        <Link to="/policies#shipping">Shipping</Link>
        <Link to="/policies#returns">Returns</Link>
        <Link to="/policies#privacy">Privacy</Link>
      </div>
      
      <div style={{ fontSize: '0.8rem', color: 'var(--color-muted-grey)' }}>
        © {new Date().getFullYear()} AUMORPH. Designed for stillness.
      </div>
    </footer>
  );
};
