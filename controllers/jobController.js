import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';

// Get All Job
export const getAllJobs = async (req, res) => {
     //console.log(req.user);
      //const jobs = await Job.find({createdBy: req.user.userId});

      // Search
      const {search, jobStatus, jobType, sort} = req.query;
      const queryObject = {createdBy: req.user.userId,};

      if(search){
        queryObject.$or =[
          {position: {$regex: search, $options: 'i'}},
          {company: {$regex: search, $options: 'i'}}
        ];
      };

      if(jobStatus && jobStatus !== 'all'){
        queryObject.jobStatus = jobStatus;
      }
      if(jobType && jobType !== 'all'){
        queryObject.jobType = jobType;
      }

      const sortOptions = {
         newest: '-createdAt',
         oldest: 'createdAt',
         'a-z': 'position',
         'z-a': '-position',
      };

      const sortKey = sortOptions[sort] || sortOptions.newest;

      // setup pagination
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1 ) * limit;

      const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);
        // total job
      const totalJobs  = await Job.countDocuments(queryObject);
       // Page Number
      const numOfPages = Math.ceil(totalJobs / limit)


      res.status(StatusCodes.OK).json({totalJobs, numOfPages, currentPage: page, jobs});
};

// Create Job
export const createJob = async (req, res) => {
  //   const {company, position} = req.body;
  //   if(!company || !position) {
  //      return res.status(400).json({msg: 'Please provide company and position'});
  //     }
  //  // const id = nanoid(10);
  //  // const job = {id, company, position};
  //  const job = await Job.create({company, position})
  //   //jobs.push(job);
  //   res.status(StatusCodes.CREATED).json({msg:'New Job Added', job});
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// Get Single Job
export const getSingleJob = async (req, res) => {
    const {id} = req.params;
    const job = await Job.findById(id);
    if(!job){
      return res.status(404).json({msg: `no job with id ${id}`});
    }
    res.status(StatusCodes.CREATED).json({job});
};

// Edit And Update Job
export const editAndUpdateJob = async (req, res) => {
    const {company, position} = req.body;
    if(!company || !position) {
     return res.status(400).json({msg: 'Please provide company and position'});
    }
    const {id} = req.params;
    const updateJob = await Job.findByIdAndUpdate(id, req.body, {new: true});
    if(!updateJob){
     return res.status(404).json({msg: `no job with id ${id}`});
    }
 
    // job.company = company;
    // job.position = position; 

    res.status(StatusCodes.OK).json({msg: 'job modified', job: updateJob});
};

// Delete Job
export const deleteAndRemove = async (req, res) => {
    const { id } = req.params;
    const removedJob = await Job.findByIdAndRemove(id)
    if (!removedJob) {
      return res.status(404).json({ msg: `no job with id ${id}` });
    }
    // const newJobs = jobs.filter((job) => job.id !== id);
    // jobs = newJobs;
  
    res.status(StatusCodes.CREATED).json({ msg: 'job deleted', job: removedJob});
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
    { $group: {_id: '$jobStatus', count: {$sum: 1}}},
  ]);
  stats = stats.reduce((acc, curr) => {
      const {_id: title, count} = curr;
      acc[title] = count;
      return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
    working: stats.working || 0,
  };

  // let monthlyApplications = [
  //   {
  //     date: 'May 24',
  //     count: 12,
  //   },
  //   {
  //     date: 'Jun 24',
  //     count: 9,
  //   },
  //   {
  //     date: 'Jul 24',
  //     count: 3,
  //   },
  // ]
let monthlyApplications = await Job.aggregate([
  {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
  {
    $group:{
      _id: {year: {$year: '$createdAt'}, month: {$month: '$createdAt'}},
      count: {$sum: 1},
    },
  },
  {$sort: {'_id.year': -1, '_id.month': -1}},
  {$limit: 6},
]);

monthlyApplications = monthlyApplications.map((item) =>{
  const {_id: {year, month}, count} = item;
  const date = day().month(month - 1 ).year(year).format('MMM YY');
  return {date, count};
}).reverse();

  res.status(StatusCodes.OK).json({defaultStats, monthlyApplications});
}


