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
        return Poster.findById(posterId);
    }
};