import express from "express";
import { userModel } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validator } from "../validation/validator.js";
import dotenv from "dotenv";
dotenv.config();

const userRouter = express.Router();
userRouter.use(validator);

userRouter.get("/", async (req, res) => {
  try {
    let users = await userModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      let user = new userModel({
        email,
        password: hash,
      });
      await user.save();
      res.status(200).send({ msg: "A new user registered" });
    });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.find({ email });
    if (user.length > 0) {
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (passwordMatch) {
        const token = jwt.sign(
          {
            userID: user[0]._id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          },
          "bruce"
        );
        res.status(200).send({ msg: "Login Succesfull", token: token });
      } else {
        res.status(404).send({ msg: "Wrong Credential" });
      }
    } else {
      res.status(404).send({ msg: "Wrong Credential" });
    }
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

export { userRouter };
