import { Router } from "express";
const router = Router();
import { getAllJobs, createJob, getSingleJob, editAndUpdateJob, deleteAndRemove, showStats } from "../controllers/jobController.js";
//import { validateJobInput } from '../middleware/validationMiddleware.js';
import { validateJobInput, validateIdParam } from "../middleware/validationMiddleware.js";

router.route('/').get(getAllJobs).post(validateJobInput, createJob);

router.route('/stats').get(showStats);

router.route('/:id').get(validateIdParam, getSingleJob).patch( validateJobInput, validateIdParam, editAndUpdateJob).delete(validateIdParam, deleteAndRemove);

export default router;