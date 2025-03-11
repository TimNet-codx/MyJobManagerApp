import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const JobSchema = new mongoose.Schema({
        company: String,
        position: String,
        jobStatus: {
            type: String,
           // enum: ['interview', 'working', 'delined', 'pending' ],
           enum: Object.values(JOB_STATUS),
           default: JOB_STATUS.WORKING,
        },
        jobType:{
            type: String,
            //enum: ['full-time', 'part-time', 'internship'],
            enum: Object.values(JOB_TYPE),
           // default: 'full-time',
           default: JOB_TYPE.FULL_TIME,
        },
        jobLocation: {
           type: String,
           default: 'Lagos'
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    {timestamps: true}
);

export default mongoose.model('Job', JobSchema);