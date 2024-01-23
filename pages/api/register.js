import connectDB from './mongodb';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    await connectDB();
    if (req.method !== 'POST') {
        return res.status(405).end(); 
    }

    const { token } = req.body;
    const secretKey = 'jwtSecretKey'; 
    const { walletAddress } = jwt.verify(token, secretKey);

    try {
        const existingUser = await User.findOne({ address: walletAddress });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ address });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handler;
