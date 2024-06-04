import React from 'react';
import { useDispatch } from 'react-redux';
import {AddToCart} from '../../actions/CartAction'
import {Link} from 'react-router-dom'
import {formatPrice} from '../../untils/index'

function DetailInfo(props) {
    const dispatch = useDispatch()
    const { product } = props;
    
    function handleAddProduct(product) {
        const action = AddToCart(product)
        dispatch(action)
    }

    return (
        <div className="detail-info-right">
            <div className="detail-info-right-price">
                <p className="price-box">
                 
                    <span className="">Giá niêm yết : <strong className="saleprice price">{formatPrice(product.price)}đ</strong> </span>
                </p>
                <p className="detail-info-sale">
                    Sản phẩm thuộc chương trình HOT SALE CUỐI TUẦN - Nhanh tay thanh toán!
                            </p>
            </div>

            <div className="detail-info-right-buy">
                <div className="detail-info-right-buy-now">
                    <Link to="/cart" onClick={() => handleAddProduct(product)}>
                        <strong>MUA NGAY</strong>
                        <br></br>
                        <span>(Giao tận nơi hoặc lấy tại cửa hàng)</span>
                    </Link>
                </div>
                {/*<div className="detail-info-right-buy-installment">
                    <a href="">
                        <strong>TRẢ GÓP 0%</strong>
                        <br></br>
                        <span>(Xét duyệt qua điện thoại)</span>
                    </a>
                    <a href="">
                        <strong>TRẢ GÓP QUA THẺ</strong>
                        <br></br>
                        <span>(Visa, Master, JCB)</span>
                    </a>
                </div>*/}
            </div>
            <div className='information'>
                <h2>Thông tin sản phẩm</h2>
                <div className='information-inner'> 
                <li className='information-inner-tech'><p>Description: </p> <div>{product.description}</div></li>
                <li className='information-inner-tech'><p>Color: </p> <div>{product.color}</div></li>
                <li className='information-inner-tech'><p>Number stock: </p> <div>{product.numberStock}</div></li>
                <li className='information-inner-tech'><p>Brand name: </p> <div>{product.brandName}</div></li>
                <li className='information-inner-tech'><p>Screen size: </p> <div>{product.screensize}</div></li>
                <li className='information-inner-tech'><p>Screen technology: </p> <div>{product.screentech}</div></li>
                <li className='information-inner-tech'><p>Ram: </p> <div>{product.ramstorage}</div></li>
                <li className='information-inner-tech'><p>Internal memory: </p> <div>{product.internalmemory}</div></li>
                <li className='information-inner-tech'><p>OS: </p> <div>{product.os}</div></li>



                </div>
            </div>
        </div>
    );
}

export default DetailInfo;