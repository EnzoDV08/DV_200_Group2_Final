// backend/models/Favorite.js
import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
