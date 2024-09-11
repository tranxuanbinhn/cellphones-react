import React, { useEffect, useState } from 'react';
import './Signup.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {SignupUser} from '../../actions/UserAction';

function Login(props) {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState();
   const message = useSelector(state => state.message);
    //const {success,error} = message;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
     
    useEffect(()=>{
      if(message?.success!= undefined)
      {
        setAlert(message?.success)
      }
      else if(message?.error!= undefined){
        setAlert(message?.error)
      }
      return setAlert()
    },[])
    const onSubmit = (data) => {
      // 
      dispatch(SignupUser(data));

      // 


    };
    return (
      <div className="signup-page" >
        {alert && <h1 className='success'>{alert}</h1>}
       
 
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