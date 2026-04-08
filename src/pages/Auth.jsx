import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Auth = () => {
  const { login } = useShop();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (email && password) {
        await login(email, password);
        navigate('/account');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '80px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '32px' }}>Sign In</h1>
        {error && <p style={{ color: '#ff4444', marginBottom: '16px' }}>{error}</p>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
          <Button type="submit" style={{ width: '100%', padding: '16px' }}>Sign In</Button>
          <p style={{ marginTop: '16px', color: 'var(--color-muted-grey)', fontSize: '0.9rem', textAlign: 'center' }}>
            Hint: Use admin@aumorph.com / admin123
          </p>
        </form>
      </div>
    </div>
  );
};
