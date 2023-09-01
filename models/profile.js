import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import {APP_URL} from '../config'; 

const profileSchema = new Schema({ 
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address:{ type: String, required: true},
    Gender: { type: String, required: true },
    
}, { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model('profile', profileSchema, 'profile');
    