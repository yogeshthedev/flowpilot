import bcrypt from "bcryptjs";
import { User } from "../model/user.model";
import { Request, Response } from "express";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // user send data
    const { name, email, password } = req.body;

    // find user

    const exitingUser = await User.findOne({ email });

    //existing user

    if (exitingUser) {
      return res.status(400).json({
        message: "Already user exist",
      });
    }

    // hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // create user

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // generate token

    const token = generateToken(user._id.toString());

    res.cookie("token", token);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: hashedPassword,
      token,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    //user data
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // check password

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({
        message: "Password is incorrect",
      });
    }

    //genearte token

    const token = generateToken(user._id.toString());
    res.cookie("token", token);

    res.status(201).json({
      _id: user._id,
      email,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    
    const decodedUser = typeof req.user === "string" ? undefined : req.user;
    const userId = decodedUser?.id || decodedUser?._id;
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  }

    catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};