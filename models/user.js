
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import {APP_URL} from '../config'; 

const userSchema = new Schema({ 
    name: { type: String},
    email: { type: String, unique: true },
    phone_number:{ type: String,},
    password: { type: String},
    address:{ type: String,},
    Gender: { type: String},
    image: {
        type: String,
        get: (image) => {
            // http://localhost:5000/uploads/1616443169266-52350494.png
            return `${APP_URL}${image}`;
        },
    },
    role: { type: String, default: 'customer' },
    otp: { type: String }
}, { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model('User', userSchema, 'users');