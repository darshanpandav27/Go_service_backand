import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const profileSchema = new Schema({ 
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address:{ type: String, required: true},
    Gender: { type: String, required: true },
    image: { type: String, required: true}
}, { timestamps: true });

export default mongoose.model('profile', profileSchema, 'profile');
    