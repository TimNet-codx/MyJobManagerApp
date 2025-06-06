import React from "react";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import {Form, useNavigation, redirect} from 'react-router-dom';
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

//Using React Query to Job Data
const singleJobQuery = (id) => {
  return {
   queryKey: ['job', id],
   queryFn: async () => {
    const {data} = await customFetch.get(`/jobs/${id}`);
    return data;
   }
  };
};

export const loader = (queryClient) => async ({params}) => {
    try {
        //const {data} = await customFetch.get(`/jobs/${params.id}`);
        //console.log(data);
        //return data;
        await queryClient.ensureQueryData(singleJobQuery(params.id));
        return params.id;
    } catch (error) {
        toast.error(error.response?.data?.msg || "Error fetching job");
        return redirect('/dashboard/all-jobs');
    }
}
export const action = (queryClient) =>  async ({request, params}) => {
   const formData = await request.formData();
   const data = Object.fromEntries(formData);

    try {
        await customFetch.patch(`/jobs/${params.id}`, data);
        queryClient.invalidateQueries(['jobs']);
        toast.success("Job Edited Successfully");
        return redirect('/dashboard/all-jobs');
    } catch (error) {
        toast.error(error.response?.data?.msg || "Error editing job");
        return error;
    }
}

const EditJob = () => {
    //const params = useParams();
   // console.log(params);
    //const {job} = useLoaderData();
    const id = useLoaderData();
      //console.log(job);

    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const {data: {job}} = useQuery(singleJobQuery(id));
    return (
     <Wrapper>
        <Form method='post' className='form'>
           <h4 className='form-title'>Edit job</h4>
           <div className='form-center'>
            <FormRow type='text' name='position' defaultValue={job.position}/>
            <FormRow type='text' name='company' defaultValue={job.company}/>
            <FormRow type='text' labelText='job location' name='jobLocation' defaultValue={job.jobLocation}/>
            <FormRowSelect name='jobStatus' lableText='job status' defaultValue={job.jobStatus} list={Object.values(JOB_STATUS)}/>
            <FormRowSelect name='jobType' lableText='job type' defaultValue={job.jobType} list={Object.values(JOB_TYPE)}/>
            {/* <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>{isSubmitting ? 'submitting' : 'submit'}</button> */}
              <SubmitBtn formBtn/>
           </div>   
        </Form>
     </Wrapper>
    );
};

export default EditJob;


