import React from "react";
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import request from "../../Api/request";
import { useDispatch } from "react-redux";
import { login } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Spinner } from 'react-bootstrap';


const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
}).required();

export default function Register() {
  const [load, setLoad] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    setLoad(true)
    const { email, password } = data
    try {
      await dispatch(login({ email, password })).unwrap()
      toast.success('Login success!')
      setLoad(false)
      navigate('/')
    } catch (error) {
      toast.error('Login error!')
    }
  }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center" >
      <div className='col-6'>
        <img src={require('../../img/anh.png')} className="w-75" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="col-md-4 col-6">
        <h2 className="text-center">Login</h2>
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
            <button type="submit" className="btn btn-primary">Login</button>
          )
        }
        <div>
          <span>Don't have an account ?</span> <Link className="btn-link" to='/register'>Register</Link>
        </div>
      </form>
    </div >
  );
}