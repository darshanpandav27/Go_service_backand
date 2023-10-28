import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const addserviceSchema = new Schema({ 
    
    name:{type:String},
    sevice_type: { type: String, required: true },
    sevice_type_name: { type: String, required: true },
    price: { type: String, required: true},
    author:{type: mongoose.Types.ObjectId, ref:'users'}
   
}, { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model('addsevice', addserviceSchema, 'addsevice');
    