import 'dotenv/config'
import jwt from "jsonwebtoken";
const secret = process.env.SECRET;

const adminMiddleware = (req, res, next) => {
  const { authorization: token } = req.headers;
  console.log("token=>", token);
  console.log("token ?", !!token);

  try {
    if (token) {
      const decode = jwt.verify(token, secret);
      console.log(decode);
      if (decode.role === "Admin") {
        req.body.userId = decode.id;
        next();
      } else {
        res.send("You are not Authorized to perform this function");
      }
    } else {
      res.send("invalid token");
    }
  } catch (e) {
    res.send("No token found please login");
  }
};

export default adminMiddleware;