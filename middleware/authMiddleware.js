import { UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  //console.log('auth m', req)
  const {token} = req.cookies;
  if(!token) throw new UnauthenticatedError('authentication invalid');

  try {
    const {userId, role} = verifyJWT(token);
    req.user = {userId, role};
    //console.log(req);
    next();
  }catch (error){
      throw new UnauthenticatedError('authentication invalid');
  }
};

export const authorizePermissions = (...roles) => {
   return (req, res, next) => {
     if(!roles.includes(req.user.role)){
      throw new UnauthorizedError('Unauthorized to access this route')
     }
     next();
   };
};

