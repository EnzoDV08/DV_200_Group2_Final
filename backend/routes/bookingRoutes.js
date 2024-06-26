// backend/routes/bookingRoutes.js
import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { carId, userId, startDate, endDate, totalPrice, checkoutDetails } = req.body;

  console.log('Received Booking Data:', req.body); // Log the received data

  if (!carId || !userId || !startDate || !endDate || !totalPrice || !checkoutDetails) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the dates are already booked
    const existingBookings = await Booking.find({
      car: carId,
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
      ],
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({ message: 'The selected dates are already booked' });
    }

    const newBooking = new Booking({ car: carId, user: userId, startDate, endDate, totalPrice, checkoutDetails });
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('car');
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/unavailable-dates/:carId', async (req, res) => {
  const { carId } = req.params;
  try {
    const bookings = await Booking.find({ car: carId });
    const unavailableDates = bookings.map(booking => ({
      startDate: booking.startDate,
      endDate: booking.endDate,
    }));
    res.status(200).json(unavailableDates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching unavailable dates', error: err.message });
  }
});

export default router;


















