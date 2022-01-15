import React from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import request from "../../Api/request";
import { toast } from 'react-toastify';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
}).required();

export default function Login() {
  const [load, setLoad] = React.useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async data => {
    setLoad(true)
    try {
      const res = await request({
        method: 'POST',
        url: '/auth/register',
        data: data
      })

      const profile = await request({
        method: 'POST',
        url: '/profile',
        data: {
          userId: res.data._id,
          slugUsername: res.data.username
        }
      })

      const follew = await request({
        method: 'POST',
        url: '/follows/create',
        data: { userId: res.data._id }
      })

      setLoad(false)
      toast.success('Register success !')
      navigate('/login')
    } catch (error) {
      toast.error('Register error !')
    }
  }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className='col-6'>
        <img src={require('../../img/anh.png')} className="w-75" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="col-md-4 col-6">
        <h2 className="text-center">Create new account</h2>
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">Username</label>
          <input
            type="name"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            id="inputName"
            {...register('username', { required: true })} />
          {errors.username && <div className="invalid-feedback">{errors.username?.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="inputEmail"
            {...register('email', { required: true })} />
          {errors.email && <div className="invalid-feedback">{errors.email?.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="inputPassword"
            {...register('password', { minLength: 6, required: true })} />
          {errors.password && <div className="invalid-feedback">{errors.password?.message}</div>}
        </div>
        {
          load ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Loading...</span>
            </Button>
          ) : (
            <button type="submit" className="btn btn-primary">Register</button>
          )
        }
        <div>
          <span>Have an account ?</span> <Link className="btn btn-link" to='/login'>Login</Link>
        </div>
      </form>
    </div>
  );
}