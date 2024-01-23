// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema)
    
export default User;
