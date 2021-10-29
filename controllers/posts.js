 // bring in the postMessage model to use here 
import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose'

 // these controllers are connected to the route file which handles the routing @ ../routes/posts.js
 export const getPosts = async(req, res) => {
   const { page } = req.query;

    try {
        const LIMIT = 6
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({}); // get the total number of documents on post 
      
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({message: error.message})
    }
 }

 export const createPost = async(req, res) => {
    const post = req.body
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})
   try {
       await newPost.save()
       res.status(200).json(newPost)
   } catch (error) {
       res.status(404).json({message: error.message})
   }
 }

 export const getPost = async(req, res)=> {
  const { id } = req.params;
   try {
     const post = await PostMessage.findById(id);
     res.status(200).json(post)
   } catch (error) {
     res.status(404).json({ message: error.message })
   }
 }



 export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost); 
 }

 export const deletePost = async(req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
 }

 export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id != String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}

export const getPostBySearch = async(req, res) => {
  const { searchQuery } = req.query;
  try {
    const query = new RegExp(searchQuery, 'i')
    // find post by title or tags
     const posts = await PostMessage.find({ title: query})
     res.json({data: posts})
  } catch (error) {
   res.status(404).json({ message: error.message });
  }
}

