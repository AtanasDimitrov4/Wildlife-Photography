import { Schema, model, Types } from "mongoose"


const postSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    keyword: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: [{
         type: Types.ObjectId,
         ref: 'User',
    }],
    votes: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    rating: {
        type: Number,
        default: 0,
    },
    
});

const Post = model('Post', postSchema);

export default Post;
