import { useState, useEffect } from 'react';

export const AdminWaitlist = () => {
  const [waitlist, setWaitlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const fetchWaitlist = async () => {
    try {
      const res = await fetch('/api/admin/waitlist');
      if (!res.ok) throw new Error('Failed to fetch waitlist');
      const data = await res.json();
      setWaitlist(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    const emails = waitlist.map(w => w.email).join(', ');
    navigator.clipboard.writeText(emails);
    alert('Emails copied to clipboard!');
  };

  if (isLoading) return <div style={{ color: 'var(--color-soft-grey)' }}>Loading waitlist...</div>;
  if (error) return <div style={{ color: '#ff4444' }}>{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--color-white)' }}>Waitlist Users</h1>
        <button 
          onClick={copyToClipboard}
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-black)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Copy All Emails
        </button>
      </div>

      <div style={{ background: 'var(--color-soft-black)', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--color-muted-grey)' }}>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Email Address</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Date Joined</th>
            </tr>
          </thead>
          <tbody>
            {waitlist.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-muted-grey)' }}>
                  No users on the waitlist yet.
                </td>
              </tr>
            ) : (
              waitlist.map((user) => (
                <tr key={user.id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '16px 24px', color: 'white' }}>{user.email}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--color-soft-grey)' }}>
                    {new Date(user.createdAt).toLocaleDateString()} at {new Date(user.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
