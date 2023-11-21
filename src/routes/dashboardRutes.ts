import express from 'express';

export const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: Data for dashboard
 *     responses:
 *       200:
 *         description: success
 */
router.get('/', (req, res) => {
  return res.status(200).json({ message: 'success' });
});
