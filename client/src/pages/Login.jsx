import React from "react";
import { Logo, FormRow, SubmitBtn} from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = (queryClient) => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    queryClient.invalidateQueries();
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
    return (
      <Wrapper>
        <Form method='post' className='form'>
          <Logo />
          <h4>Login</h4>
          <FormRow type='email' name='email'/>
          <FormRow type='password' name='password'/>
          <SubmitBtn/>
          <p>
            Not a member yet?
            <Link to='/register' className='member-btn'>
              Register
            </Link>
          </p>
        </Form>
      </Wrapper>
    );
  };
  export default Login;