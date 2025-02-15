import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// TODO: Modify user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
    },
    firstName: {
        type: String,
        required: [true, 'First name is required!'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    },
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;