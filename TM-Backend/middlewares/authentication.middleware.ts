import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import {UserData} from "../interfaces/auth.Interface";
import { User } from "../models/User";


async function authMiddleware(req:Request, res:Response, next:NextFunction) {
  
    const token = req.headers["authorization"]

    if(token){
        try{
            const authToken = token.split("Bearer ")[1]
            const verified = jwt.verify(
                authToken,
                process.env.JWT_KEY as string
            ) as UserData

            const user = await User.findOne({ 
                where: {
                     id: verified.id 
                    } 
                });

                if(!user) {
                     res.status(401).json({message:"User not found"})
                }

            req.user = verified
            next()
        } catch(err){
                    res.status(401).json({messsage:"Wrong authentication token"})

        }
    } else {
        res.status(401).json({messsage:"Token is missing"})
    }
    
}


export default authMiddleware;