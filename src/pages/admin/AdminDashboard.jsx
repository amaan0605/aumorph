import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: 'var(--color-muted-grey)' }}>Loading overview...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '32px' }}>System Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ color: 'var(--color-muted-grey)', marginBottom: '8px' }}>Total Registered Users</p>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--color-warm-glow)' }}>{users.length}</h2>
        </div>
      </div>

      <h2 style={{ fontSize: '1.4rem', marginBottom: '24px' }}>User Directory</h2>
      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '16px 24px', color: 'var(--color-soft-grey)', fontWeight: 'normal' }}>Name</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-soft-grey)', fontWeight: 'normal' }}>Email</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-soft-grey)', fontWeight: 'normal' }}>Role</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-soft-grey)', fontWeight: 'normal' }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '16px 24px' }}>{u.name || 'N/A'}</td>
                <td style={{ padding: '16px 24px', color: 'var(--color-muted-grey)' }}>{u.email}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem',
                    background: u.role === 'ADMIN' ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.05)',
                    color: u.role === 'ADMIN' ? 'var(--color-warm-glow)' : 'var(--color-soft-grey)'
                  }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', color: 'var(--color-muted-grey)' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
