import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_KEY) {
      throw new Error('MONGODB_KEY not set in environment variables');
    }

    await mongoose.connect(process.env.MONGODB_KEY);
    console.log('DB Okay');
  } catch (error: any) {
    console.error('Error connecting to DB:', error.message);
  }
};

export default connectDB;