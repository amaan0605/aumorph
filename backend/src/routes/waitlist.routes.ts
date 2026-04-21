import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req: any, res: any) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if email already exists
    const existing = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({ error: 'Email is already on the waitlist' });
    }

    // Save to waitlist
    await prisma.waitlist.create({
      data: { email },
    });

    return res.status(201).json({ message: 'Successfully joined waitlist' });
  } catch (error) {
    console.error('Waitlist error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
