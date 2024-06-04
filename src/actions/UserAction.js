import axios from 'axios'

export const login = (user) => async (dispatch) => {
    try {
      const {data} = await axios.post('http://localhost:8080/api/auth/signin', user);
      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
      console.log('user', data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('typeToken', data.typeToken);
      console.log(localStorage);



    } catch (error) {
      dispatch({ type: 'USER_LOGIN_FAIL', payload:'Error login' });
    }
};


export const SignupUser = (user) => async (dispatch) => {
 
  try {
   const response = await axios.post('http://localhost:8080/api/auth/signup', user)  
   
     console.log('data', response);
     console.log('typeofdata', typeof(response.status));

  

      if(response.status==200)
      {
      dispatch({ type: 'USER_SIGNUP_SUCCESS', payload: response.data.message });

      }
      else{
      dispatch({ type: 'USER_SIGNUP_FAIL', payload: response.data.message });

      }
      document.location.href = '/login';
      console.log('Thanh cong')
    } catch (error) {
      dispatch({ type: 'USER_SIGNUP_FAIL', payload: 'Error Register' });

      console.log('Loi dang ki')
    }
};

export const SignoutUser = (user) => async (dispatch) => {
  localStorage.clear();
  dispatch({type: 'USER_SIGNOUT_SUCCESS', payload: {} })
  console.log('Delete is actving');
  dispatch({type:'DELETE_WHEN_LOGOUT'})
  document.location.href = '/';
};

export const getAllUser = () => async (dispatch, getState) => {
  const {
    userSignin: {userInfo}
  } = getState()
  try {
    const {data} = await  axios.get('http://localhost:4000/user')
    dispatch({type: 'GET_ALL_USER', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
  }
}

export const deleteUser = (userId) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.delete(`http://localhost:4000/user/delete/${userId}`)
    dispatch({type: 'DELETE_USER', payload: data})
  } catch (error) {
    dispatch({type: 'DELETE_USER_FAIL', error: error.message})
  }
}