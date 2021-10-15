import jwt from "jsonwebtoken";

const secret = process.env.TOKEN

// const auth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const isCustomAuth = token.length < 500;

//     let decodedData;

//     if (token && isCustomAuth) {      
//       decodedData = jwt.verify(token, secret);

//       req.userId = decodedData?.id;
//     } else {
//       decodedData = jwt.decode(token);

//       req.userId = decodedData?.sub;
//     }    

//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };


const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
    
        if(!token) return res.status(400).json({msg: "Invalid Authentication"})

        jwt.verify(token, process.env.TOKEN, (err, user) =>{
            if(err) return res.status(400).json({msg: "Invalid Authentication"})

            req.userId = user.id
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    } 
}

export default auth;