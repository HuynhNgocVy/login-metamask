import connectDB from './mongodb';
import User from '../models/User';

const handler = async (req, res) => {
    await connectDB();
    if (req.method !== 'POST') {
        return res.status(405).end(); // Phương thức không được hỗ trợ
    }

    const { address } = req.body;
    try {
        // Kiểm tra xem địa chỉ đã được đăng ký trước đó hay chưa
        const existingUser = await User.findOne({ address });
        if (!existingUser) {
            return res.status(401).json({ message: 'Chưa có tài khoản' });
        }

        return res.status(200).json({ address: existingUser.address });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handler;
