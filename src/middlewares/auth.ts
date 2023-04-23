import { verifyJWT } from "../auth/jwt";
import { NextFunction, Request, Response } from "express";

export const validJWTNeeded = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send('invalid request'); //invalid request
            } else {
                let jwt = verifyJWT(authorization[1]);
                if(jwt){
                   next();
                }
                else{
                    return res.status(401).send('invalid user'); //invalid user
                }
            }
        } catch (err) {
            return res.status(403).send(); //invalid token
        }
    } else {
        return res.status(401).send('invalid request');
    }
}