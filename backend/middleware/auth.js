import jwt from "jsonwebtoken";
const Sec="Aryan";
const auth=async(req,res,next)=>{
    const token=req.header.authorization.split(" ")[1];
    try{
        if(!token){
            res.json({message:"NO TOkeN FOUND"});
        }
        const x=  jwt.verify(token,Sec,(err,data)=>{
            if(err){
                res.json("INVALID TOKEN");
            }
            req.user=user;
            next();

        })
    }
    catch(err){
        res.json({message:"INVALID TOKEN"});
    }
}
export {Sec, auth};
