const jwt=require("jsonwebtoken")
const User=require("../models/User")
require('dotenv').config()

const checkAuth=async (req,res,next)=>{
    let header=req.get("Authorization")
    console.log("header",header)
    if(header!=undefined)
    {

        let token=header.split(" ")[1]
        console.log(token)
        if(token.length==0)
        {
            return res.json("Please login")
        }
        else
        {
            try
            {
                let _id=jwt.verify(token,process.env.JWT_SECRET)
                let user=await User.findOne({
                    _id:_id
                })
                if(user)
                {
                    req.user=user
                    next()
                }
                else
                {
                     res.json("Please login")
                }
            }
            catch(err)
            {
                return res.json("Please login")
            }
        }
    }
    else
    {
        res.json("Please login")
    }

}
module.exports={checkAuth}