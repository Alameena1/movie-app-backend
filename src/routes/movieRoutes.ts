import express from 'express';
import { searchMovies, saveMovie, listMovies } from '../controllers/movieController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/search', authMiddleware, searchMovies);
router.post('/save', authMiddleware, saveMovie);
router.get('/list', authMiddleware, listMovies);

export default router;