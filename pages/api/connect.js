import connectDB from './mongodb';

const handler = async (req, res) => {
  await connectDB();

  res.status(200).json({ message: 'Connected to MongoDB' });
};

export default handler;