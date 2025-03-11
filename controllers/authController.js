import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
// import bcrypt from 'bcryptjs';
// import { hashPassword } from "../utils/passwordUtils.js";
//import { hashPassword } from "../utils/passwordUtils.js";
import {comparePassword, hashPassword} from '../utils/passwordUtils.js';
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
    
    // first registered user is an Admin
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
    
      //import hashPassword
     const hashedPassword = await hashPassword(req.body.password);
     req.body.password = hashedPassword;
     
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({msg: 'User Created', user});
};

// export const login = async (req, res) => {
// //    res.send('login');
//   // check if user exists
//   const user = await User.findOne({email: req.body.email});
//     if(!user) throw new UnauthenticatedError('invalid credentials')
  
//     // check if password is correct
//   const isPasswordCorrect = await comparePassword(
//     req.body.password,
//     user.password,
//   )
//    if(!isPasswordCorrect) throw new UnauthenticatedError('invalid credentials');

//     // const isValidUser = user && (await comparePassword(req.body.password, user.password));
//     // if(!isValidUser) throw new UnauthenticatedError('invalid credentials');

//     // const isValidUser = user && (await comparePassword(req.body.password, user.password));
//     // if(!isValidUser) throw new UnauthenticatedError('invalid credentials');

// const token = createJWT({userId: user._id, role: user.role});
//      //console.log(token);
//     // Expires day
//     const oneDay = 1000 * 60 * 60 * 24;
//     res.cookie('token', token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + oneDay),
//         secure: process.env.NODE_ENV === 'production',
//     });
//     //res.send('login route');
//     res.status(StatusCodes.CREATED).json({msg: 'User Logged in'});

// };

export const login = async (req, res, next) => {
  try {
    //const { email, password } = req.body;

    // Check if user exists
    // const user = await User.findOne({ email });
    // if (!user) {
    //   throw new UnauthenticatedError('Invalid credentials');
    // }
    const user = await User.findOne({email: req.body.email});
    // Compare password
    // const isValidUser = await comparePassword(password, user.password);
    // if (!isValidUser) {
    //   throw new UnauthenticatedError('Invalid credentials');
    // }
    const isValidUser = user && (await comparePassword(req.body.password, user.password));
    if(!isValidUser) throw new UnauthenticatedError('invalid credentials');

    // Generate JWT token
    const token = createJWT({ userId: user._id, role: user.role });
   // console.log(token);

    // Set cookie expiration (1 day)
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(StatusCodes.OK).json({ msg: 'User logged in' });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

export const logout = (req, res) => {
   res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
   });
   res.status(StatusCodes.OK).json({msg: 'user logged out!'});
};

