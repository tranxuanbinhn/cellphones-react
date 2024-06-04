import React, { useState} from 'react';
import { useDispatch,useSelector  } from 'react-redux';
import {
    Link,
    useHistory
} from "react-router-dom";


import {formatPrice} from '../../untils/index'

import {AddToCart,AddToCart2, DeleteToCart, DeleteQtyProduct} from '../../actions/CartAction'


function ListProduct(props) {
    var userInfo = useSelector((state) => state.userSignin.userInfo);
    console.log('user infor',userInfo);
    const history = useHistory()
    const Order = () => {
        if (userInfo) {
          history.push("/order");
        } else {
          alert("ban can dang nhap");
          history.push("/login");
        }
      };
    const [checklistbox, setChecklistbox] = useState({});
    const handleCheckBoxChange = (productId)=>{
       
        setChecklistbox((prevState)=>({
        ...prevState,
        [productId]:!prevState[productId]
        }));

    }
    const dispatch = useDispatch()



function handleAddProduct(product,check) {
    const action = AddToCart2(product,check)
    dispatch(action);
    window.location.reload();
}
function handleAddProduct2(product,check) {
    if(product.quantity===1)
        {
            const action =  DeleteQtyProduct(product)
            dispatch(action);
        }
        else{
            const action = AddToCart2(product,check)
    dispatch(action);
        }
    
    window.location.reload();
}

function handleProductOut(product) {
    const action =  DeleteQtyProduct(product)
    dispatch(action);
    window.location.reload();
}
const getAllCheckItems=()=>{
    return Object.keys(checklistbox).filter((key)=>checklistbox[key]);
}
const { products } = props;
console.log('product is', products);
const totalPrice = products.reduce(
    (total, item) => {
        if(checklistbox[item.productId])
            {
                return total+item.quantity*item.price;

            }
            return total;
    },
    0
  );
console.log('list box',products.filter(product=>checklistbox[product.productId]));

   

    return (
        <div>
        <div className="shopping-cart-list">
            {
                products.map((product, index) => (
                    <div className="shopping-cart-list-product">
                    
                    <div className="shopping-cart-list-product-block">
                    <div className='checkbox'>
                    <input type='checkbox'
                  
                    name={product.productId}
                    checked={!!checklistbox[product.productId]||false}
                    onChange={()=>handleCheckBoxChange(product.productId)}
                    />
                    </div>
                        <div className="shopping-cart-list-product-block-left">
                            <img src={product.image}></img>
                        </div>
                        <div className="shopping-cart-list-product-block-right">
                            <p className="product-name">
                                {product.productName}
                            </p>
                            <p className="product-price">
                                {formatPrice(product.price)}
                            </p>
                        </div>
                        
                        <div className="shopping-cart-list-product-bottom">
                            <ul className="button-event">
                                <li onClick={() => handleAddProduct2(product, false)}>-</li>
                                <li>{product.quantity}</li>
                                <li onClick={() => handleAddProduct(product,true)}>+</li>
                            </ul>
                            <button className="delete-product" onClick={() => handleProductOut(product)}> Xóa khỏi giỏ hàng </button>
                        </div>
                    </div>
                   
                </div>

                ))
            }

            
        </div>
        <div className="total-price">
            <span className="left">Tổng tiền</span>
            <span className="right">{formatPrice(totalPrice)} đ</span>
          </div>
          {totalPrice <= 0 ? (
            ""
          ) : (
            <div className="order">
               <Link onClick={() => Order()}> Đặt Hàng </Link>
            </div>
          )}
        </div>
    );
}

export default ListProduct;