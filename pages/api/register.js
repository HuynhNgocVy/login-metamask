import connectDB from './mongodb';
import User from '../models/User';

const handler = async (req, res) => {
    await connectDB();
    if (req.method !== 'POST') {
        return res.status(405).end(); // Phương thức không được hỗ trợ
    }

    const { address, token } = req.body;
    console.log(address, token)
    try {
        // Kiểm tra xem địa chỉ đã được đăng ký trước đó hay chưa
        const existingUser = await User.findOne({ address });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Nếu không tồn tại, tạo một bản ghi mới trong MongoDB
        const newUser = new User({ address, token });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handler;
