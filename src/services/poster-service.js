import Poster from "../models/Poster.js";


export default {
    create (posterData, userId) {
        return Poster.create({ ...posterData, author: userId });

    },
    
    getAll(filter = {}) {
        let query = Poster.find({});
  
        if (filter.author) {
          query = query.find({author: filter.author});
        }
  
        if(filter.votes) {
          query = query.find({votes: filter.votes});
        }
  
        return query;
      },

    getOne(posterId) {
        return Poster.findById(posterId).populate('author', 'firstname lastname').populate('votes', 'email');;
    },

    update(posterId, posterData) {
      return Poster.findByIdAndUpdate(posterId, posterData, { runValidators: true });
    },

    delete(posterId) {
      return Poster.findByIdAndDelete(posterId);
    },

   async vote(posterId, userId, value) {
    const poster = await Poster.findById(posterId);

    if(poster.votes.includes(userId)) {
      throw new Error('User already voted!');
    }

    poster.votes.push(userId);
    poster.rating += value;
    await poster.save();
   }
};