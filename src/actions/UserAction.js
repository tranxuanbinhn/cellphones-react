import axios from 'axios'

export const login = (user) => async (dispatch) => {
    try {
      console.log('user',user)

      const {data} = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/auth/signin`, user);
      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
    
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('typeToken', data.typeToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      if(data.roles[0]==="ROLE_ADMIN")
      {
      localStorage.setItem('role', "admin");
       }
       else if(data.roles[0]==="ROLE_USER")
        {
        localStorage.setItem('role', "user");
         }
         else if(data.roles[0]==="ROLE_MODERATOR")
          {
          localStorage.setItem('role', "moderator");
           }




    } catch (error) {
      dispatch({ type: 'USER_LOGIN_FAIL', payload:'Error login' });
    }
};
export const GetUserDetail = (id) => async(dispatch) =>{
  const token = localStorage.getItem('accessToken');
  console.log('id', id)
  try
  {
  
      const {data} = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/admin/user/detail/${id}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      console.log('user detail ', data);
      dispatch({type:"GET_USER_DETAIL", payload:data})
  }
  catch(error)
  {
    console.log(error);
    ;
  }
}
export const GetAllRole = () => async(dispatch)=>
  {
      const token = localStorage.getItem('accessToken');
      try
      {
          const {data} = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/admin/user/getall/role`, {
            headers:{
              Authorization:`Bearer ${token}`
            }
          });
          console.log('data role ', data);
          dispatch({type:"GET_ALL_ROLE", payload:data})
      }
      catch(error)
      {
        console.log(error);
        ;
      }
     
  }
export const SaveUser = (user) => async(dispatch)=>{
  const token = localStorage.getItem('accessToken');
  try{
    console.log('user in', user)
      if(user.id === undefined)
      {
        console.log('user rrr', user)
        const option = {
          url:`${process.env.REACT_APP_API_ENDPOINT}/api/admin/user`,
          headers:{
            Authorization:`Bearer ${token}`
          },
          data:user,
          method:'post'
        }
        console.log('option add', option)
        const {data} = await axios(option)
        console.log('data add',data);
        dispatch({type:"ADD_USER", payload:data})
      
      }
      else{
        console.log('user rrr', user)
        const option = {
          url:`${process.env.REACT_APP_API_ENDPOINT}/api/admin/user/update/${user.id}`,
          headers:{
            Authorization:`Bearer ${token}`
          },
          data:user,
          method:'put'
        }
        console.log('option', option)
        const data = await axios(option)
        console.log('data update',data);
        dispatch({type:"UPDATE_USER", payload:data})
      }
  }
  catch(error)
  {
      console.log(error)
  }
}
export const CheckTokenExp = () => async(dispatch)=>
  {
      const token = localStorage.getItem('accessToken');
      const config = {
          headers:{
            Authorization:`Bearer ${token}`,
            'Content-type':'Apllication/json'
          }
      }
       
  }
export const SignupUser = (user) => async (dispatch) => {
 
  axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/auth/signup`, user).then(res=>{
    console.log('res',res);
    dispatch({type:"MESSAGE_SUCCESS",payload:"SUCCESS"})
    window.location.href='/login';
  }).catch(error=>{
    dispatch({type:"MESSAGE_ERROR",payload:"Có lỗi xảy ra"})
    window.location.href='/register';
  })
   
  
    
};

export const SignoutUser = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("typeToken");
  localStorage.removeItem("refreshToken");

  dispatch({type: 'USER_LOGOUT'})
  console.log('Delete is actving');
  dispatch({type:'DELETE_WHEN_LOGOUT'})
  document.location.href = '/login';
};

export const getAllUser = (page) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('accessToken');
    const {data} = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/admin/user?page=${page}&limit=2`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Error fetching data:', data);
    dispatch({type: 'GET_ALL_USER',payload:data});
  
    // Thêm dòng throw nếu cần
    if (!data) {
      throw new Error('No data received from API');
    }
  } catch (error) {
    console.log('Error fetching data:', error.message);
    // Xử lý lỗi tại đây nếu cần
  }
 
}
export const editCurrentPage = (page) => async (dispatch) => {
  dispatch({ type: "USER_CURRENT_PAGE", payload: page });
}
export const resetPasswordUser = (user) => async (dispatch) => {
  const token = localStorage.getItem('accessToken');
  console.log('user', user);
  try {
    const option = {
      url:`${process.env.REACT_APP_API_ENDPOINT}/api/admin/user/resetpassword`,
      headers:{
        Authorization: `Bearer ${token}`
      },
      data:{
        username:user.username
      },
      method:'put'
    }
    const data  = await axios(option);
    console.log('data',data);
  }
    catch(error)
    {
      console.log(error)
    }
}
export const deleteUser = (userId) => async (dispatch, getState) => {
  const token = localStorage.getItem('accessToken');
  try {
  
    const data  = await axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/api/admin/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
   
    console.log('response',data);
    dispatch({type: 'DELETE_USER', payload:data});
  } catch (error) {
    console.log('errrorr',error)
    dispatch({type: 'DELETE_USER_FAIL', error: error.message})
  }
}