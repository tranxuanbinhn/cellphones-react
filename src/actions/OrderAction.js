import axios from "axios";
let config = {
  headers: {
    "Content-Type": "application/json",
    'Token': "f0ad61a5-e456-11ee-aebc-56bc015a6b03",
  },
};

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('accessToken');

    const dataorder = {
      method: order.method,
      cartproductIds:order.cartProductId,
      address:order.address

    }
    const options = {
      method:'post',
      url:`${process.env.REACT_APP_API_ENDPOINT}/api/user/order/buy`,
      data:order,
      headers:{
        Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
      }
    }
     
    const { data } = await axios(options);
     
   const data2 = {
    method:order.method,
    status:order.status,
    orderID:data.id
   }
   const option2 = {
    method:'post',
    url:`${process.env.REACT_APP_API_ENDPOINT}/api/user/payment`,
    data:data2,
    headers:{
      Authorization:`Bearer ${token}`,
          'Content-Type':'application/json'
    }
  }
   

  const result2 = await axios(option2);
   

  //Delete order in cart


    const config = {
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    }
    try{
        const respone = axios.request({
            url:`${process.env.REACT_APP_API_ENDPOINT}/api/user/cart/delete`
            ,method:'DELETE',
            header:config.headers,
            data:order.cartproductIds
        });
         
    }
    catch(error)
    {
         
    }


    dispatch({ type: "ORDER_CREATE-SUCCESS", payload: data });
    dispatch({ type: "CART_EMTY" });
    localStorage.removeItem("cartItems");
  } catch (error) {
  }
};

export const updateOrder = (orderId, order) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    
    const { data } = await axios.post(
      `http://localhost:4000/order/update/${orderId}`,
      order,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: "ORDER_UPDATE-SUCCESS", payload: data });
  } catch (error) {
  }
};

export const cancelOrder = (orderId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/user/order/cancel/${orderId}`,
     
    );
    dispatch({ type: "CANCEL_ORDER", payload: data });
  } catch (error) {
  }
};

export const getAllOrder = () => async (dispatch, getState) => {
  try {
  const token = localStorage.getItem('accessToken');
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/admin/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
     
    dispatch({ type: "GET_ALL_ORDER", payload: data });
  } catch (error) {
  }
};

export const RemoveAllOrder = () => async (dispatch, getState) => {
  dispatch({ type: "REMOVE_ALL_ORDER" });
};

// export const GetAllOrderPaypal = () => async (dispatch, getState) => {
//   try {
//     const {
//       userSignin: { userInfo },
//     } = getState();
//     const { data } = await axios.get(`http://localhost:4000/order/orderPaypal`, {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     });
//     dispatch({ type: "GET_ALL_ORDER_PAYPAL", payload: data });
//   } catch (error) {
//   }
// };

export const GetAllOrderPendding = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(
      `http://localhost:4000/order/orderPendding`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: "GET_ALL_ORDER_PENDDING", payload: data });
  } catch (error) {
  }
};

export const GetAllOrderShipping = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(
      `http://localhost:4000/order/orderShipping`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: "GET_ALL_ORDER_SHIPPING", payload: data });
  } catch (error) {
  }
};

export const GetAllOrderPaid = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(`http://localhost:4000/order/orderPaid`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: "GET_ALL_ORDER_PAID", payload: data });
  } catch (error) {
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.delete(
      `http://localhost:4000/order/delete/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: "DELETE_ORDER", payload: data });
  } catch (error) {
  }
};

export const ShippingOrder = (orderId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.put(
      `http://localhost:4000/order/shipping/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: "SHIPPING_ORDER", payload: data });
  } catch (error) {
  }
};

export const PaidOrder = (orderId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.put(
      `http://localhost:4000/order/paid/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: "PAID_ORDER", payload: data });
  } catch (error) {
  }
};

export const GetAllProvince = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
      config
    );
     
    dispatch({ type: "GET_ALL_PROVINCE", payload: data });
  } catch (error) {
  }
};
export const GetShippingPayment = (shippayment) => async (dispatch) =>{
  const options = {
    method:'post',
    url:`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
    data:shippayment,
    headers:{"Content-Type": "application/json",
        'Token': "f0ad61a5-e456-11ee-aebc-56bc015a6b03"}
  }
  try{
    const {data} = await axios(options);

    dispatch({type:'GET_ALL_FEE', payload: data});

  }
  catch(error)
  {

  }
}

export const GetAllDistrict = (provinceId) => async (dispatch, getState) => {
  const newConfig = {
    headers: {
      Token: "f0ad61a5-e456-11ee-aebc-56bc015a6b03"
    }
   
  }
  const province ={
    province_id: provinceId
  }
  try {
     
    const options = {
      method:'post',
      url: `https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
      data:province,
      headers:{ "Content-Type": "application/json",
        'Token': "f0ad61a5-e456-11ee-aebc-56bc015a6b03",}
    }
    const { data } = await axios(options);
     
    dispatch({ type: "GET_ALL_DISTRICT", payload: data });
  } catch (error) {
  }
};

export const GetAllWard = (districtId) => async (dispatch, getState) => {
   
  const newConfig = {
    headers: {
      Token: "f0ad61a5-e456-11ee-aebc-56bc015a6b03"
    }
  }
  const district={
    district_id:districtId
  }
  const options = {
    method:'post',
    url:`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
    data:district,
    headers:{
       "Content-Type": "application/json",
        'Token': "f0ad61a5-e456-11ee-aebc-56bc015a6b03"
    }
  }
  try {

    const { data } = await axios(options)
     
    dispatch({ type: "GET_ALL_WARD", payload: data });
  } catch (error) {
  }
};

//-----------------------  user

export const getOrderByUser = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('accessToken');
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/user/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
         'Content-Type':'application/json'
      },
    });
    dispatch({ type: "GET_ORDER_BY_USER", payload: data });
  } catch (error) {
  }
};



export const getOrderPenddingByUser = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem("accessToken")
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/user/order/pendding`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "GET_ORDER_PENDDING_BY_USER", payload: data });
  } catch (error) {
  }
};

export const getOrderShippingByUser = (idUser) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(`http://localhost:4000/order/orderShipping/${idUser}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: "GET_ORDER_SHIPPING_BY_USER", payload: data });
  } catch (error) {
  }
};

export const getOrderPaidByUser = (idUser) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(`http://localhost:4000/order/orderPaid/${idUser}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: "GET_ORDER_PAID_BY_USER", payload: data });
  } catch (error) {
  }
};

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = axios.put(
        `http://localhost:4000/order/pay/${order._id}`,
        paymentResult,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'ORDER_PAY_SUCCESS', payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: 'ORDER_PAY_FAIL', payload: message });
    }
};

export const OrderInfo = (orderInfo) => async (dispatch, getState) => {
   
  dispatch({ type: "ORDER_INFO", payload: orderInfo });
};