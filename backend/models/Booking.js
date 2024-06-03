import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  checkoutDetails: {
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true }
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;












