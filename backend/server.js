import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'; // Make sure the path is correct


dotenv.config();


const app = express();
const PORT = process.env.PORT || 6000;
 

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Import and use user routes
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});




