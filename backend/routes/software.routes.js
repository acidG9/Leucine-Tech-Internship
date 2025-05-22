import express from 'express';
import Software from '../models/Software.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth(['Admin']), async (req, res) => {
  const { name, description, accessLevels } = req.body;
  const software = new Software({ name, description, accessLevels });
  await software.save();
  res.status(201).json(software);
});

router.get('/', auth(), async (req, res) => {
  const all = await Software.find();
  res.json(all);
});

export default router;
