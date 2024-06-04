import React, { useState } from 'react';
import './Signup.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {SignupUser} from '../../actions/UserAction';

function Login(props) {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
   const message = useSelector(state => state.userSignup);
    const {userInfo,error} = message;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
      //console.log(data);
      dispatch(SignupUser(data));
      //console.log('message',message);
      //console.log('userInfo',userInfo);
      //console.log('userInfo',error);


    };
    return (
      <div className="signup-page" >
        {userInfo && <h1 className='success'>{userInfo}</h1>}
        {error && <h1 className='error'>{error}</h1>}
 
        <h2>ĐĂNG KÍ</h2>
        <form className="form-signup" onSubmit={handleSubmit(onSubmit)}>
        
          <input {...register("username")} placeholder="username" required />
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            required
          />
          <input
            {...register("phonenumber")}
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