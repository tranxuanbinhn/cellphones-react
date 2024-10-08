import React, { useEffect } from 'react';
import './Detail.css'
import DetailInfo from './DetailInfo'
import RateStar from './RateStar';
import {
    useParams
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getproductById,getReviewProduct ,getRateProduct} from '../../actions/ProductAction';
import CommentProduct from './CommentProduct';
import BlogContent from './BlogContent';

function Detail(props) {
    const dispatch = useDispatch()
    const { id } = useParams();
    const detailProduct = useSelector(state => state.getProductById.product);
     
   


    useEffect(() => {
        dispatch(getproductById(id));
       
        
    }, [dispatch,id])
   

    return (
        <section id="detail">
            {
                detailProduct ? (
            <div className="detail">
                <div className="detail-title">
                    <h2>{detailProduct.productName}</h2>
                </div>
                <div className="detail-info">
                    <div className="detail-info-slide">
                        <div className="detail-info-slide-image">
                            <img src={detailProduct.image}></img>
                        </div>
                    </div>
                    <DetailInfo  product={detailProduct}></DetailInfo>
                </div>
                
                <div>
                    <RateStar></RateStar>
                </div>
             {/*<div>
                    <CommentProduct></CommentProduct>
                </div>
                */}
            </div>
            ) : ''
            }
        </section>
    );
}

export default Detail;