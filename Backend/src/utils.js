import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt";


export const verifyToken = (req, res, next) =>{
     const authHeader = req.headers.authorization;
     if(!authHeader) return res.status(401).send({error: "Not authenticated"});

     const token = authHeader.split(' ')[1];
     jwt.verify(token, PRIVATE_KEY, (error, credentials)=> {
        if (error) return res.status(403).send({ error: "Not authorized" });
        req.user = credentials.user;
        next();
     })
}


export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;; 