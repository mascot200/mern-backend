import express from 'express';
import auth from '../middleware/auth.js'
import { getPosts, getPost, getPostBySearch, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'

const router = express.Router();


router.get('/', getPosts)
router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.get('/search', getPostBySearch)
router.get('/:id', getPost)



      


export default router;