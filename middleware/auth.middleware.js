import 'dotenv/config'
import jwt from "jsonwebtoken";


const secret = process.env.SECRET;
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decode = jwt.verify(token, secret);
            console.log(decode.id);
            req.body.userId = decode.id;
            next();
        } catch (error) {
            res.send("Invalid token");
        }
    } else {
        res.send("No token found, please login");
    }
};

export default auth;
