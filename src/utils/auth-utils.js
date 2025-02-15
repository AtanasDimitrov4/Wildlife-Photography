import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';


export const generateToken = (user) => {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
  
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
  
    return token;
   }