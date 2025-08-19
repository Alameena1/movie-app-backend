import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  savedMovies: Array<{
    title: string;
    year: string;
    poster: string;
    imdbID: string;
  }>;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedMovies: [{
    title: { type: String },
    year: { type: String },
    poster: { type: String },
    imdbID: { type: String }
  }]
});

export default mongoose.model<IUser>('User', userSchema);