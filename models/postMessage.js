import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema =  new Schema({
    title: String,
    message: String,
    name: String,
    tags: [String],
    selectedFile: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    likes:{
        type: [String],
        default: []
    },
    comments:{
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
})

const postMessage = mongoose.model('postMessage', postSchema)
export default postMessage;

