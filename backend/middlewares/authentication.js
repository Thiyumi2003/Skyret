import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
export default function authenticateUser(req, res, next){
        
        const header = req.header("Authorization")

        if(header !=null){            
            const token = header.replace("Bearer ","")

            jwt.verify(token, process.env.JWT_SECRET , 
                (error, decoded)=>{   
                    if(error == null && decoded != null){
                        req.user = decoded
                    }

                    next()
                }
            )

        }else{
            next()
        }
    }