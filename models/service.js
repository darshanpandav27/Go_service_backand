import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const serviceSchema = new Schema({ 

    sevice_type: { type: String, required: true },
    sevice_type_name: { type: String, required: true },
    price: { type: String, required: true},
    gst: { type: String, required: true},
   
}, { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model('service', serviceSchema, 'service');
    