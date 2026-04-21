import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Package, Users, ShoppingBag, LogOut, ClipboardList } from 'lucide-react';
import { useEffect } from 'react';

export const AdminLayout = () => {
  const { user, isAuthLoading, logout } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading) {
      if (!user || user.role !== 'ADMIN') {
        navigate('/auth');
      }
    }
  }, [user, isAuthLoading, navigate]);

  if (isAuthLoading) return <div style={{ minHeight: '100vh', background: 'var(--color-black)', color: 'var(--color-muted-grey)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Verifying admin credentials...</div>;
  if (!user || user.role !== 'ADMIN') return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-black)' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '280px', 
        borderRight: '1px solid rgba(255,255,255,0.05)',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'white', letterSpacing: '2px' }}>AUMORPH</h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-warm-glow)' }}>Core Dashboard</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '4px', textDecoration: 'none', color: 'var(--color-soft-grey)', transition: 'background 0.3s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            <Users size={20} /> Users & Overview
          </Link>
          <Link to="/admin/orders" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '4px', textDecoration: 'none', color: 'var(--color-soft-grey)', transition: 'background 0.3s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            <ShoppingBag size={20} /> Orders
          </Link>
          <Link to="/admin/products" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '4px', textDecoration: 'none', color: 'var(--color-soft-grey)', transition: 'background 0.3s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            <Package size={20} /> Products
          </Link>
          <Link to="/admin/waitlist" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '4px', textDecoration: 'none', color: 'var(--color-soft-grey)', transition: 'background 0.3s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            <ClipboardList size={20} /> Waitlist
          </Link>
        </nav>

        <button 
          onClick={logout}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', 
            background: 'transparent', border: 'none', color: '#ff4444', 
            cursor: 'pointer', textAlign: 'left', borderRadius: '4px' 
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,68,68,0.1)'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
        >
          <LogOut size={20} /> Sign Out Admin
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
};
