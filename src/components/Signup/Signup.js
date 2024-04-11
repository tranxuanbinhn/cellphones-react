import React, { useState } from 'react';
import './Signup.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {SignupUser} from '../../actions/UserAction';

function Login(props) {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
   

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
      console.log(data);
      dispatch(SignupUser(data));

    };
    return (
      <div className="signup-page" >
        <h2>ĐĂNG KÍ</h2>
        <form className="form-signup" onSubmit={()=>handleSubmit(onSubmit)}>
          <input {...register("fullName")} placeholder="Full name" required />
          <input {...register("username")} placeholder="username" required />
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            required
          />
          <input
            {...register("phoneNumber")}
            placeholder="Phone number"
            required
          />
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          <input type="submit" value="Đăng Kí" />
        </form>
      </div>
    );
}

export default Login;