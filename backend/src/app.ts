// app.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { DB_URI } from './config';
import userRoutes from './routes/user.routes';
import pokemonRoutes from './routes/pokemon.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS
app.use(cors());

console.log(DB_URI, PORT)
// MongoDB
mongoose.connect(DB_URI).then(()=> {
    console.log("connected")
},
error => {
    console.error("mongodb", error)
}).catch(err=>  console.error("t", err));

// Middlewares
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(pokemonRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
