import  mongoose, {Schema, model, models} from 'mongoose'
const ContactSchema = new Schema({
    firstName:  { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber:  { type: String, required: true },
    address:  { type: String, required: true },
    email:  { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
  });
  
  
export const Contact = models.Contact || model('Contact', ContactSchema);