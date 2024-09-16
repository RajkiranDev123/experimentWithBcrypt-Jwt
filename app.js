import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//npm install --save-dev nodemon
dotenv.config({ path: "./.env" });
const app = express();
app.use(cookieParser());

app.get("/bcrypt/:pass", (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    console.log("salty", salt);
    bcrypt.hash(req.params.pass, salt, (err, hash) => {
      console.log("hash", hash);
      console.log("salt", salt);

      console.log("pass", req.params.pass);
      res.cookie("name", hash);//attach & send hash in cookies
      res.send("done");
    });
  });
});

app.get("/compare/:pass", (req, res) => {

  console.log("req.cookies :", req.cookies);
  console.log("req.params  :", req.params);

var result
///////////////////////////////// compare sent pass with hash sent from cookies
  bcrypt.compare(req.params["pass"], req.cookies.name, (err, result) => {
/////////////////////////////////////load hash from db
    result=result
    console.log("result inside", result);
  });
  console.log("result outside",result)
  res.send("done");
//If your argument is not a JSON object or array (null, undefined, boolean, string), and you want to ensure it is sent as JSON, use res.json.
})

//////////////////////////// jwt ./////////////////////////////////////////////
app.get("/jwt/:payload", (req, res) => {
       console.log("req.params",req.params.payload)
       let token=jwt.sign({email:req.params.payload},"secret123")
       console.log("token",token)
       res.cookie("token",token)
       res.send("done")

})

app.get("/verify", (req, res) => {
/////////////////// jwt token + secretKey = data
  let data=jwt.verify(req.cookies.token,"secret123")
  console.log("data",data)
  res.send("done")

})

app.listen(process.env.PORT, () => {
  console.log("server is listening at ", process.env.PORT || 3001);
});
