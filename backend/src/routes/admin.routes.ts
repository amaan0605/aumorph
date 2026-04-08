import { Router } from 'express';
import prisma from '../utils/prisma';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

const requireAdmin = (req: AuthRequest, res: any, next: any) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

router.use(requireAuth, requireAdmin);

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true }});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get all orders across the entire platform
router.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } },
        orderItems: { include: { product: { select: { name: true } } } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update order status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Note: Product creation is protected in product.routes.ts.
// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    // Delete related order items first, or cascade relying on setup (we lack cascade, so manual delete/ignore based on architecture)
    // For safety, we will just delete the product. If it's in orders, sqlite will reject. Thus, we should mark as out of stock instead ideally.
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Cannot delete product currently in orders. Try changing stock to 0 instead.' });
  }
});

export default router;
