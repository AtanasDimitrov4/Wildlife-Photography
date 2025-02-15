import Poster from "../models/Poster.js";


export default {
    create (posterData, userId) {
        return Poster.create({ ...posterData, author: userId });

    },
};