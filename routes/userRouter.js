import { Router } from "express";
const router = Router();
import {getAllUsers, getCurrentUser, getApplicationStats, updateUser } from "../controllers/userController.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import  upload from '../middleware/multerMiddleware.js';
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [authorizePermissions('admin'), getApplicationStats]);
router.get('/admin/users',[authorizePermissions('admin'), getAllUsers]);
router.patch('/update-user', upload.single('avatar'), validateUpdateUserInput, updateUser);

export default router;