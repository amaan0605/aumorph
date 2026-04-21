import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Auth = () => {
  const { login, register } = useShop();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isRegistering) {
        if (!name) return setError('Name is required');
        await register(email, password, name);
      } else {
        await login(email, password);
      }
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '80px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '32px' }}>{isRegistering ? 'Create Account' : 'Sign In'}</h1>
        {error && <p style={{ color: '#ff4444', marginBottom: '16px' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {isRegistering && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-soft-grey)', fontSize: '0.9rem' }}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}
                placeholder="Jane Doe"
                required={isRegistering}
              />
            </div>
          )}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-soft-grey)', fontSize: '0.9rem' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-soft-grey)', fontSize: '0.9rem' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" style={{ width: '100%', padding: '16px' }}>
            {isRegistering ? 'Create Account' : 'Sign In'}
          </Button>

          <p style={{ marginTop: '16px', color: 'var(--color-soft-grey)', fontSize: '0.9rem', textAlign: 'center' }}>
            {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError(null);
              }}
              style={{ background: 'none', border: 'none', color: 'var(--color-white)', textDecoration: 'underline', cursor: 'pointer' }}
            >
              {isRegistering ? 'Sign In' : 'Sign Up'}
            </button>
          </p>

          {!isRegistering && (
            <p style={{ marginTop: '16px', color: 'var(--color-muted-grey)', fontSize: '0.9rem', textAlign: 'center' }}>
              Hint: Use admin@aumorph.com / admin123
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
