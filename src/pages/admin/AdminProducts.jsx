import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', stock: '', imageUrl: '' });

  const fetchProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock, 10)
      })
    });
    setNewProduct({ name: '', price: '', description: '', stock: '', imageUrl: '' });
    setShowAdd(false);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.error) alert(data.error);
      fetchProducts();
    }
  };

  if (loading) return <div style={{ color: 'var(--color-muted-grey)' }}>Loading products...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem' }}>Product Catalog</h1>
        <Button onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? 'Close Dialog' : 'Add New Product'}
        </Button>
      </div>

      {showAdd && (
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Add Product</h2>
          <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input type="text" placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} style={{ padding: '16px', background: 'var(--color-charcoal)', border: 'none', color: 'white' }} required />
            <input type="number" step="0.01" placeholder="Price (e.g. 240.00)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} style={{ padding: '16px', background: 'var(--color-charcoal)', border: 'none', color: 'white' }} required />
            <textarea placeholder="Story / Description" rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} style={{ padding: '16px', background: 'var(--color-charcoal)', border: 'none', color: 'white' }} required />
            
            <textarea placeholder="Experience (e.g. A gentle glow...)" rows={2} value={newProduct.experience || ''} onChange={e => setNewProduct({...newProduct, experience: e.target.value})} style={{ padding: '16px', background: 'var(--color-charcoal)', border: 'none', color: 'white' }} />
            <textarea placeholder='Specs JSON (e.g. {"Material": "Polymer"})' rows={2} value={newProduct.specs || ''} onChange={e => setNewProduct({...newProduct, specs: e.target.value})} style={{ padding: '16px', background: 'var(--color-charcoal)', border: 'none', color: 'white' }} />
            <textarea placeholder='In The Box Array (e.g. ["Cable", "Bulb"])' rows={2} value={newProduct.inTheBox || ''} onChange={e => setNewProduct({...newProduct, inTheBox: e.target.value})} style={{ padding: '16px', background: 'var(--color-charcoal)', border: 'none', color: 'white' }} />

            <input type="number" placeholder="Initial Stock Quantity" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} style={{ padding: '16px', background: 'var(--color-charcoal)', border: 'none', color: 'white' }} required />
            <input type="text" placeholder="Image URL (e.g. /torii_light.png)" value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} style={{ padding: '16px', background: 'var(--color-charcoal)', border: 'none', color: 'white' }} required />
            <Button type="submit" style={{ alignSelf: 'flex-start' }}>Save Product</Button>
          </form>
        </div>
      )}

      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '16px 24px', color: 'var(--color-soft-grey)', fontWeight: 'normal' }}>Item</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-soft-grey)', fontWeight: 'normal' }}>Price</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-soft-grey)', fontWeight: 'normal' }}>Stock</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-soft-grey)', fontWeight: 'normal' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={p.imageUrl} alt={p.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', background: 'var(--color-charcoal)' }} />
                  {p.name}
                </td>
                <td style={{ padding: '16px 24px', color: 'var(--color-warm-glow)' }}>${p.price}</td>
                <td style={{ padding: '16px 24px', color: p.stock > 0 ? 'var(--color-soft-grey)' : '#ff4444' }}>{p.stock}</td>
                <td style={{ padding: '16px 24px' }}>
                  <button onClick={() => deleteProduct(p.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '0.9rem' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
