import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import {APP_URL} from '../config'; 

const profileSchema = new Schema({ 
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address:{ type: String, required: true},
    Gender: { type: String, required: true },
    image: {
        type: String,
        required: true,
        get: (image) => {
            // http://localhost:5000/uploads/1616443169266-52350494.png
            if (process.env.ON_HEROKU == 'true') {
                return `${image}`;
            }
            return `${APP_URL}/${image}`;
        },
    },
}, { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model('profile', profileSchema, 'profile');
    