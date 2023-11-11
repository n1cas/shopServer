import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import User from "../mongoose/user.schema";

export default class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      if (!(email && password && role)) {
        res.status(400).send("All input is required");
      }

      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        id: uuidv4(),
        email: email.toLowerCase(),
        password: encryptedPassword,
        role
      });

      res.status(201).send('User successfully registered');
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {

        const token = jwt.sign(
          { id: user.id, email, role: user.role },
          process.env.TOKEN_KEY!,
          {
            expiresIn: "2h",
          }
        );
        return res.status(200).json({
          token
        });
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }
}