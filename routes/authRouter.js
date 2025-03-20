import { Router } from "express";
const router = Router();
import { register, login, logout } from "../controllers/authController.js";
import { validateRegisterInput, validateLoginInput } from "../middleware/validationMiddleware.js";
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15,
    message: {msg: 'IP rate limit exceede, retry in 15 minutes.'}
})

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);

export default router;


