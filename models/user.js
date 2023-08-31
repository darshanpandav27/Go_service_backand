import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    name: { type: String},
    email: { type: String, unique: true },
    phone_number:{ type: String,},
    password: { type: String},
    address:{ type: String,},
    Gender: { type: String},
    image: { type: String},
    role: { type: String, default: 'customer' },
}, { timestamps: true });

export default mongoose.model('User', userSchema, 'users');