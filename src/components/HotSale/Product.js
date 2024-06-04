import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AddToCart} from '../../actions/CartAction'
import {Link, useHistory} from 'react-router-dom'
import {formatPrice} from '../../untils/index'
import { message} from 'antd';

function Product(props) {
    const user = useSelector((state)=>state.userSignin.userInfo);
    const { product } = props;
    const dispatch = useDispatch();

    const success = () => {
        message.success({
            content: 'Thêm vào giỏ hàng thành công',
            duration: 1,
            className: 'custom-class',
            style: {
                position: 'absolute',
                right: '2rem',
                top: '2rem',
                margin: '1rem 0'
            },
          });
      };
      const history = useHistory();
    const  AddProductToCart = async (product) => {
        if(user)
            {
        const action = AddToCart(product,true);
        await dispatch(action);
        success()
            }
        else{
          alert("ban can dang nhap");
          history.push('/login');
            }
        
    }


    return (
        <div className="hotsale-listproduct-product">
            <Link to={"/detail/" + product.id}>
                <img src={product.image}></img>
                <p className="hotsale-listproduct-product-name">{product.productName}</p>
                <div className="price">
                    <span className="price">{formatPrice(product.price)}đ</span>
                </div>
            </Link>
            {
                product.percentDiscount >= 5 ? (<div className="discount">
                <p>{product.percentDiscount}%</p>
            </div>) : ''
            }
            <div className="buy">
                <Link  onClick={(e) => {AddProductToCart(product)}}> Mua Ngay</Link>
            </div>
    
        </div>
    );
}

export default Product;