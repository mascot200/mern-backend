import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
   firstName: {
       type: 'string',
       required: true
   },

   lastName: {
       type: 'string',
       required: true
   },
   name: {
        type: 'string',
        required: true
   },

   email: {
       type: 'string',
       required: true
   },

   password: {
       type: 'string',
       required: true
   }
});

const user = mongoose.model('user', userSchema);
export default user;