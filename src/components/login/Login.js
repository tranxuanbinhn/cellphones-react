import React, { useEffect } from 'react';
import './Login.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import {login} from '../../actions/UserAction'
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom'

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.userSignin);
  const { userInfo, error } = user;

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (userInfo && localStorage.getItem('role')==="user") {
     
      history.push("/");
    }
    else if(userInfo && localStorage.getItem('role')==="admin")
    {
      history.push("/admin");
    }
  });

  return (
    <div class="login-page">
      {error && <h1 className='error'>{error}</h1>}
      <h2> ĐĂNG NHẬP </h2>
      <form onSubmit={handleSubmit(onSubmit)} class="form-login">
        <input {...register("email")} placeholder="Email"  type="email" required></input>
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          required
        ></input>

        <input type="submit" value="Đăng Nhập"></input>

        <Link to="/register">Tạo tài khoản?</Link>
      </form>
    </div>
  );
}

export default Login;