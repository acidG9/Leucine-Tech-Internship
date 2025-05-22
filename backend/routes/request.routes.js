import express from 'express';
import Request from '../models/Request.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth(['Employee']), async (req, res) => {
  const { software, accessType, reason } = req.body;
  const request = new Request({
    user: req.user.id,
    software,
    accessType,
    reason
  });
  await request.save();
  res.status(201).json(request);
});

router.get('/', auth(['Manager']), async (req, res) => {
  const all = await Request.find().populate('user').populate('software');
  res.json(all);
});

router.patch('/:id', auth(['Manager']), async (req, res) => {
  const { status } = req.body;
  const updated = await Request.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(updated);
});

export default router;
