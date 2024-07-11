import React, { useEffect, useState } from 'react';
import './Order.css'
import { useDispatch, useSelector } from 'react-redux';
import {formatPrice} from '../../untils/index'
import { useForm } from "react-hook-form";
import {
  GetAllDistrict,
  GetAllProvince,
  GetAllWard,
  OrderInfo,
  GetShippingPayment
} from "../../actions/OrderAction";
import { useHistory } from "react-router-dom";
import Payment from "./Payment";

function Order(props) {

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const allProvince = useSelector((state) => state.address.province);
  const allDistrict = useSelector((state) => state.address.district);
  const shippm = useSelector((state) => state.address.fee);
  console.log('shippm',shippm?.data.total);

  const allWard = useSelector((state) => state.address.ward);
  const productCart = useSelector((state) => state.cart.cartBuy);
  console.log('product cart', productCart);

  const [listProvince, setListProvince] = useState(false);
  const [listDistrict, setListDistrict] = useState(false);
  const [listWard, setListWard] = useState(false);

  const [chooseProvince, setChooseProvince] = useState({name: "Hồ Chí Minh"});
  const [chooseDistrict, setChooseDistrict] = useState({name: "Quận / Huyện"});
  const [chooseWard, setChooseWard] = useState({name: "Phường / Xã"});


  const handleListProvince = (e) => {
    e.preventDefault();
    setListProvince(!listProvince);
  };
  const handleListDistrict = (e) => {
    e.preventDefault();
    setListDistrict(!listDistrict);
  };
  const handleListWard = (e) => {
    e.preventDefault();
    setListWard(!listWard);
  };

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = productCart?.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  console.log('totalPrice', totalPrice);
  const userInfo = useSelector((state) => state.userSignin.userInfo);
  const getCartProductId = productCart.map((product)=> {
    return product.cartProductId;
  })

  const onSubmit = async (data) => {
    if (!data) {
      alert("Bạn hãy nhập đầy đủ thông tin");
      return;
    }
 
    const Order = {
      address: chooseProvince.name +' '+ chooseDistrict.name + ' '+chooseWard.name,
      cartproductIds:getCartProductId,
      shipPayment:shippm?.data.total,
      totalProductShip:totalPrice+shippm?.data.total
    
     
    };

    await dispatch(OrderInfo(Order));
  };



  useEffect(()=>{
    const Shippayment = {
      service_id:53321,
      insurance_value:totalPrice,
      coupon: null,
      from_district_id:1542,
      to_district_id:chooseDistrict.id,
      to_ward_code:chooseWard.id,
      height:15,
      length:15,
      weight:3000,
      width:15

  }
    dispatch(GetShippingPayment(Shippayment))
  },[chooseWard])
     
  useEffect(() => {
    dispatch(GetAllProvince());
  }, []);
  useEffect(() => {
    dispatch(GetAllDistrict(202));
  }, []);

  const handleSelectProvince = (name, id) => {
    setChooseProvince({name, id});
    setListProvince(!listProvince);
    dispatch(GetAllDistrict(id));
  };

  const handleSelectDistrict = (name, id) => {
    setChooseDistrict({name, id});
    setListDistrict(!listDistrict);
    dispatch(GetAllWard(id));
  };

  const handleSelectWard = (name, id) => {
    setChooseWard({name, id});
    setListWard(!listWard);
  };
  console.log('a', totalPrice+shippm?.data.total)
  return (
    <section id="order">
       <div className='list-product'>
       {
      
       productCart?.map((product, index)=>{
        return (
          <div className='product-detail'>
          <div className='img-product'>

          </div>
          <div className='product_infor'>
            <h3>{product.productName
            }</h3>
            <span className='price_red'>{formatPrice(product.price)} đ</span>
          </div>
          <div className='product_number'>
            <span>Quantity: {product.quantity
            }</span>
          </div>
        </div>)
       })}
      
      </div>
      <div className="order-content">
     
      
        <form className="order-page" onSubmit={handleSubmit(onSubmit)}>
          <div className="customer">
            <h4>THÔNG TIN KHÁCH HÀNG </h4>
            <div className="form-customer">
              <input
                placeholder="Họ và tên"
                {...register("name")}
                required
              ></input>
              <input
                placeholder="Số điện thoại"
                {...register("phone")}
                required
              ></input>
            </div>
          </div>

          <div className="address">
            <h4>CHỌN ĐỊA CHỈ</h4>
            <div className="address-form">
              <div className="province">
                {allProvince ? (
                  <button className="" onClick={(e) => handleListProvince(e)}>
                    {chooseProvince.name}
                  </button>
                ) : (
                  <button className="" onClick={(e) => handleListProvince(e)}>
                    {chooseProvince.name}
                  </button>
                )}
                {listProvince ? (
                  <div className="select">
                    <div className="select-list">
                      <aside>
                        {allProvince
                          ? allProvince.data.map((item) => (
                              <span
                                onClick={() =>
                                  handleSelectProvince(
                                    item. ProvinceName,
                                    item.ProvinceID
                                  )
                                }
                              >
                                {item. ProvinceName}
                              </span>
                            ))
                          : ""}
                      </aside>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="province">
                {chooseProvince ? (
                  <button className="" onClick={(e) => handleListDistrict(e)}>
                    {chooseDistrict.name}
                  </button>
                ) : (
                  <button
                    className=""
                    onClick={(e) => handleListProvince(e)}
                    disabled="disabled"
                  >
                    {chooseDistrict.name}
                  </button>
                )}
                {listDistrict ? (
                  <div className="select">
                    <div className="select-list">
                      <aside>
                        {allDistrict
                          ? allDistrict.data.map((item) => (
                              <span
                                onClick={() =>
                                  handleSelectDistrict(
                                    item.DistrictName,
                                    item.DistrictID
                                  )
                                }
                              >
                                {item.DistrictName}
                              </span>
                            ))
                          : ""}
                      </aside>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="province">
                {chooseWard ? (
                  <button className="" onClick={(e) => handleListWard(e)}>
                    {chooseWard.name}
                  </button>
                ) : (
                  <button
                    className=""
                    onClick={(e) => handleListWard(e)}
                    disabled
                  >
                    {chooseWard.name}
                  </button>
                )}
                {listWard ? (
                  <div className="select">
                    <div className="select-list">
                      <aside>
                        {allWard && allWard.data !== null
                          ? allWard.data.map((item) => (
                              <span
                                onClick={() =>
                                  handleSelectWard(item. WardName, item.WardCode)
                                }
                              >
                                {item. WardName}
                              </span>
                            ))
                          : ""}
                      </aside>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="province">
                <input
                  placeholder="Số nhà, đường ..."
                  {...register("more")}
                  required
                ></input>
              </div>
            </div>
          </div>
       
          <Payment></Payment>
        </form>
        <div className='TotalPayment'>
            <ul className='ul_total'>
             
              <li className='total_price_li'><span className='color-black'>Tổng tiền cần thanh toán</span ><span className='pricetotal'>{(Number.isNaN(totalPrice+shippm?.data.total))?0:formatPrice(totalPrice+shippm?.data.total)} đ</span></li>
              <li> <span>Giá sản phẩm: </span><span>{formatPrice(totalPrice)} đ</span></li>
              <li><span>Phí ship: </span><span>{(shippm?.data.total===undefined)?0:formatPrice(shippm?.data.total)} đ</span></li>

            </ul>
          </div>
      </div>
    </section>
  );
}

export default Order;