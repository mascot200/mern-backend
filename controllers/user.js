 // bring in the user model to use here 
 import User from '../models/User.js'
 import bcrypt from 'bcryptjs'
 import jwt from 'jsonwebtoken'

 export const signIn = async (req, res) => {
    const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.TOKEN, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: err });
  }
 }


 export const registerUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const name = firstName + ' ' + lastName

    try {
      const oldUser = await User.findOne({ email });
  
      if (oldUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await User.create({ email, password: hashedPassword, lastName, firstName, name: name  });
  
      const token = jwt.sign( { email: result.email, id: result._id }, process.env.TOKEN, { expiresIn: "1h" } );
  
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
 }

