import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import { Form } from 'react-router-dom'; 
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import {Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { useState } from "react";

day.extend(advancedFormat);

const Job = ({_id, position, company, jobLocation, jobType, createdAt, jobStatus}) => {
   const date = day(createdAt).format('MMM Do, YYYY');
   const [open, setOpen] = useState(false);

    return(
     <Wrapper>
        <header>
            <div className='main-icon'>{company.charAt(0)}</div>
            <div className='info'>
                <h5>{position}</h5>
                <p>{company}</p>
            </div>
        </header>
        <div className='content'>
            <div className='content-center'>
                <JobInfo icon={<FaLocationArrow/>} text={jobLocation}/>
                <JobInfo icon={<FaCalendarAlt/>} text={date}/>
                <JobInfo icon={<FaBriefcase/>} text={jobType}/>
                <div className={`status ${jobStatus}`}>{jobStatus}</div>
            </div>
            <footer className='actions'>
                {/* <Link className='btn edit-btn edit-btns'>Edit</Link> */}
                <Link to={`../edit-job/${_id}`} className='btn edit-btn edit-btns'>Edit</Link>
                {/* <Form method='post' action={`../delete-job/${_id}`}>
                    <button type='submit' className='btn delete-btn'>Delete</button>
                </Form> */}
                {/* <Button className="button" onClick={() => setOpen(true)}>
                    Show modal
                </Button> */}
                <button type='button' className='btn delete-btn' onClick={() => setOpen(true)}>Delete</button>
            </footer>
        </div>

           {/* Delete Dialog model  */}
        <div className="wrapper">
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              getPersistentElements={() => document.querySelectorAll(".Toastify")}
              backdrop={<div className="backdrop" />}
              className="dialog"
            >
              <DialogHeading className="heading">Delete Box</DialogHeading>
               <hr/>
              <p className="description">
                Are you sure you want to delete this Job?
              </p>
              <div className="buttons">

                 <Form method='post' action={`../delete-job/${_id}`}>
                    <button type='submit' className='btn delete-btn'>Yes</button>
                </Form>
                <DialogDismiss className="btn secondary">Cancel</DialogDismiss>
              </div>
            </Dialog>
          </div>
     </Wrapper>
     
      
 
    );
};

export default Job;