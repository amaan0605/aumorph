import { Router } from 'express';
import prisma from '../utils/prisma';
import { requireAuth, AuthRequest } from '../middleware/auth';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { validate } from '../middleware/validate';
import { z } from 'zod';

const router = Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

const orderSchema = z.object({
  body: z.object({
    items: z.array(z.object({
      productId: z.string(),
      quantity: z.number().int().positive('Quantity must be positive')
    })).min(1, 'Order must contain at least one item')
  })
});

const verifySchema = z.object({
  body: z.object({
    razorpay_order_id: z.string(),
    razorpay_payment_id: z.string(),
    razorpay_signature: z.string()
  })
});

// Create an order
router.post('/', requireAuth, validate(orderSchema), async (req: AuthRequest, res) => {
  try {
    const { items } = req.body; 
    
    let total = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) return res.status(404).json({ error: `Product ${item.productId} not found` });
      if (product.stock < item.quantity) return res.status(400).json({ error: `Not enough stock for ${product.name}` });

      total += product.price * item.quantity;
      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        priceAtPurchase: product.price
      });
    }

    const order = await prisma.order.create({
      data: {
        userId: req.user!.userId,
        totalAmount: total,
        status: 'PENDING',
        orderItems: { create: orderItemsData }
      }
    });

    const rzpOrder = await razorpay.orders.create({
      amount: total * 100,
      currency: "INR",
      receipt: order.id
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { razorpayId: rzpOrder.id }
    });

    res.status(201).json({ order, rzpOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Verify cryptographic webhook/signature from Razorpay
router.post('/verify', requireAuth, validate(verifySchema), async (req: AuthRequest, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // In dev environment with dummy keys, we elegantly bypass signature check since dummy keys can't sign cryptographically
    if ((process.env.RAZORPAY_KEY_SECRET || 'dummy_secret') === 'dummy_secret') {
      const order = await prisma.order.findFirst({ where: { razorpayId: razorpay_order_id } });
      if (!order) return res.status(404).json({ error: 'Order not found' });
      
      // Deplete stock dynamically
      const fullOrder = await prisma.order.findUnique({ where: { id: order.id }, include: { orderItems: true } });
      if (fullOrder) {
        for (const item of fullOrder.orderItems) {
          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } }
          });
        }
      }

      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'PAID' }
      });
      return res.json({ success: true, message: 'Payment simulated successfully' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      const order = await prisma.order.findFirst({ where: { razorpayId: razorpay_order_id } });
      if (!order) return res.status(404).json({ error: 'Order not found' });

      // Only deplete stock when cryptographically matched
      const fullOrder = await prisma.order.findUnique({ where: { id: order.id }, include: { orderItems: true } });
      if (fullOrder) {
        for (const item of fullOrder.orderItems) {
          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } }
          });
        }
      }

      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'PAID' }
      });
      return res.json({ success: true, message: 'Payment verified successfully.' });
    } else {
      return res.status(400).json({ error: 'Invalid Payment Signature' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// Get user's orders
router.get('/my-orders', requireAuth, async (req: AuthRequest, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.userId },
      include: { orderItems: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
