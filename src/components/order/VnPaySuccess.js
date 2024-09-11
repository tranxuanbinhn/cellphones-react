import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { CheckOutlined } from '@ant-design/icons';
import { useSelector , useDispatch} from "react-redux";
import { createOrder, payOrder } from "../../actions/OrderAction";



export default function VnPaySuccess() {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderInfo);

  const location = useLocation();
  const [result,setResult] = useState(false);
  useEffect(() => {
    const getResultVNPay = async () => {
      const query = location.search;
    const token = localStorage.getItem('accessToken');

      const options = {
        method:'get',
        url:`http://localhost:8080/api/vnpay/result${query}`,

        headers:{
          Authorization:`Bearer ${token}`,
              'Content-Type':'application/json'
        }
      }
       
      
      const object = await axios(options);
      if(object.status === 200)
        {
          const OrderPaid = {
            ...order,
            status: "paid",
            paymentMethod: "VNPAY"
         
          };
           

           
          await dispatch(createOrder(OrderPaid));
        }
        else{
          setResult(false)
        }
      const data = object.data;
       

       
      if(data.vnp_ResponseCode === "00")
        {
          setResult(true)
        }
        else{
          setResult(false)
        }
    };
    

    getResultVNPay();
  }, []);
   
  return (
    <section id="order-success">
      <div className="order-success">
        
        <div> <span><CheckOutlined></CheckOutlined></span> <p>Đặt hàng thành công</p></div>
        {/* <Link to="">OK</Link> */}
        <div className="links">
          <Link to="/myOrder">Xem lại đơn hàng</Link>
          <Link to="/">Trang chủ</Link>
        </div>

      </div>
    </section>
  );
}
