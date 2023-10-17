
const User=require('../user/model')
const {connect,mongoose}=require('mongoose')
const{hash,compare}=require('bcryptjs')
const {sign}=require('jsonwebtoken')
const user = require('../user/model')
const getuserfrofile=async(req, res) => {
  await connect(process.env.MONGO_URL)
  try {
    const getalluser=await User.find()
    res.json({
      getalluser
    })
  } 
  catch (err) {
    res.json({
      message:err.message
    })
    
  }
}
  
  const signup=async(req,res)=>{
    const {username,password,email}=req.body;
    try {
      await connect(process.env.MONGO_URL)
      console.log('DataBase Connected')
      // const existingUser = userr.collection('users').findOne({ email: email });
      const existanceuser = await User.exists({email : email})
        if (existanceuser)
        {
          res.json({
            message:"User Already Exist"
          })
        }
          else{
            await User.create({username,email,password:await hash(password,12)})
           
          }  
    } 
    catch (err) {
   
      res.json({
        message:err.message,

      })
    }
   

  }
  const login=async(req, res) => {
    const {email,password}=req.body;
    try {
      await connect(process.env.MONGO_URL)
      console.log('DataBase Connected')
      // const existingUser = userr.collection('users').findOne({ email: email });
      const checkexistanceuser = await User.findOne({email : email})
      
        if (!checkexistanceuser)
        {
          res.json({
            message:"User Already Exist"
          })
        }
          else{
            const decryptpass=await compare(password,checkexistanceuser.password)
           if(email==checkexistanceuser.email && decryptpass)
           {
            const token =sign({
             username:checkexistanceuser.username,
             password:checkexistanceuser.password,
             email:checkexistanceuser.email,
             id:checkexistanceuser._id

            }
            ,
            process.env.JWT_SECRET
            )
            res.json({
            message:"Succesfully Logged In",
            token:token
            })
           }
           else{
            res.json({
              message:"LogIn Failed"
            })
           }
          }
        }
        catch(err){
          res.json({
            message:err.message
          })

        }

    // res.json({
    //   username:" Banoqabil " + req.body.name
    // })
    
  }
    module.exports={ getuserfrofile ,login,signup }
