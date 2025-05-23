
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import {APP_URL} from '../config/index.js'; 

const userSchema = new Schema({ 
    sevice_id: [{type: mongoose.Schema.Types.ObjectId,ref:'addsevice'}],
    name: { type: String},
    email: { type: String},
    phone_number:{ type: String,},
    password: { type: String},
    address:{ type: String,},
    Lat:{ type: String,},
    Log:{ type: String,},
    Compny_name:{ type: String,},
    Gender: { type: String},
    image: {
        type: String,
        get: (image) => {
            // http://localhost:5000/uploads/1616443169266-52350494.png
            return `${APP_URL}${image}`;
        },
    },
    role: { type: String, default: 'user' },
    otp: { type: String }
}, { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model('User', userSchema, 'users');