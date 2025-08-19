import { Request, Response } from 'express';
import axios from 'axios';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: { userId: string };
}

export const searchMovies = async (req: AuthRequest, res: Response) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ message: 'Title query parameter is required' });
  }

  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${title}&apikey=${process.env.OMDB_API_KEY}`);
    if (response.data.Response === 'False') {
      return res.status(404).json({ message: response.data.Error });
    }

    const movies = response.data.Search.map((movie: any) => ({
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbID: movie.imdbID,
    }));
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies from OMDb', error });
  }
};

export const saveMovie = async (req: AuthRequest, res: Response) => {
  const { title, year, poster, imdbID } = req.body;
  if (!title || !year || !poster || !imdbID) {
    return res.status(400).json({ message: 'All movie fields are required' });
  }

  try {
    const user = await User.findById(req.user?.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if movie already saved
    const exists = user.savedMovies.some(m => m.imdbID === imdbID);
    if (exists) {
      return res.status(400).json({ message: 'Movie already saved' });
    }

    user.savedMovies.push({ title, year, poster, imdbID });
    await user.save();
    res.status(201).json({ message: 'Movie saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving movie', error });
  }
};

export const listMovies = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select('savedMovies');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.savedMovies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved movies', error });
  }
};