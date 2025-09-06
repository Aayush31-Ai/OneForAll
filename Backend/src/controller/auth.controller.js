import user from "../model/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
export const registerController=async(req,res)=>{
    const {fullName:{firstName,lastName},email,password}=req.body;
    const isUserExist=await user.findOne({email});
    if(isUserExist){
        return res.status(400).json({
            success:false,
            message:"User already exist"
        })
    }
    const hashPassword=await bcrypt.hash(password,10);
   const newUser=await user.create({
           fullName:{firstName,lastName},
           email,
           password:hashPassword
   })
   const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
   res.cookie("token",token)

   res.status(201).json({
       success:true,
       user:newUser,
   })

}

export const loginController = async (req, res) => {
  try {
    console.log(req.body);
    
    const { email, password } = req.body;

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, existingUser.password);
    if (!isCorrectPassword) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      user:{
        email:existingUser.email,
        id:existingUser._id
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
