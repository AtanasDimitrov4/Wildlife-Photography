import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/auth-utils.js';

export default {
    async register(userData) {
      if(userData.password !== userData.confirmPassword) {
        throw new Error('Confirm password is different from password!');
        
      }
      
        const user = await User.findOne({email: userData.email}).select({_id: true });
      if (user > 0) {
        throw new Error('User already exists!');
      }
      
      const createdUser = await User.create(userData);

      const token = generateToken(createdUser);

      return token;
    },

   async login(email, password) {
    const user = await User.findOne({ email });
    if(!user) {
      throw new Error('Invalid user or email!');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) {
      throw new Error('Invalid user or email!');
    }
    
   const token = generateToken(user);
   
   return token;

   },

  
};
