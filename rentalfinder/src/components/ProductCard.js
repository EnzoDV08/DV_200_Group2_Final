import React, { useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiMapPin } from 'react-icons/fi';
import { GiGearStickPattern } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../css/productCard.css';

const ProductCard = ({ product, onFavoriteToggle }) => {
  const { user, updateUserFavorites } = useContext(AuthContext);
  const navigate = useNavigate();

  const isFavorite = user?.favorites?.includes(product._id);

  const toggleFavorite = async () => {
    if (!user) {
      alert('Please sign in to add favorites');
      return;
    }

    try {
      if (isFavorite) {
        await axios.post('http://localhost:5000/favorites/remove', { userId: user._id, productId: product._id });
        updateUserFavorites(user.favorites.filter(fav => fav !== product._id));
        onFavoriteToggle && onFavoriteToggle(product._id); // Call the callback function if provided
      } else {
        await axios.post('http://localhost:5000/favorites/add', { userId: user._id, productId: product._id });
        updateUserFavorites([...user.favorites, product._id]);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      alert('Error updating favorites');
    }
  };

  const handleDetailsClick = () => {
    navigate(`/details/${product._id}`);
  };

  return (
    <div className="product-card">
      <div className="card-header">
        <div className="rating">
          <FaStar color="gold" />
          <FaStar color="gold" />
          <FaStar color="gold" />
          <FaStar color="gold" />
          <FaStar color="gold" />
          <p>{product.reviews} Reviews</p>
        </div>
        {isFavorite ? (
          <AiFillHeart className="heart-icon favorite" onClick={toggleFavorite} />
        ) : (
          <AiOutlineHeart className="heart-icon" onClick={toggleFavorite} />
        )}
      </div>
      <img src={product.images[0]} alt={product.name} className="product-image" />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.year}</p>
        <hr className="divider" />
        <div className="location">
          <FiMapPin />
          <p>{product.location}</p>
        </div>
        <div className="product-icons">
          <GiGearStickPattern />
          <p>{product.transmission}</p>
          <p className="price">{product.price}/day</p>
        </div>
        <button onClick={handleDetailsClick}>Details</button>
      </div>
    </div>
  );
};

export default ProductCard;













































