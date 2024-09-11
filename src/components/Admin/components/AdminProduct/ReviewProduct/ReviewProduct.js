import React, { useEffect, useRef } from "react";
import "./ReviewProduct.css";
import { DeleteOutlined, EditOutlined,InfoCircleOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import {
  BlogProduct,
  getallreviewProduct,
  deleteReview
} from "../../../../../actions/ProductAction";
import { useParams } from "react-router-dom";
import {Rate, Row, Col, Divider, Progress} from 'antd'
import { Link } from "react-scroll";
export default function ReviewProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const reviews = useSelector((state) => state.allProduct.allreviews);
   
   
  const handleDeleteProduct = (id) => {
    dispatch(deleteReview(id));
    window.location.reload();
  }
  const log = () => {
    if (editorRef.current) {
      const blogContent = String(editorRef.current.getContent());
      dispatch(BlogProduct(id, { blogContent }, () => {
        alert('Add review product success');
      }));
    }
  };

  useEffect(() => {
    dispatch(getallreviewProduct(id));
  }, [dispatch, id]);

  return (
    <section id="review">
      <div className="review">
        <span className="review-title">Review </span>

        <div className="review-content">
  {reviews?.listResult ? (
    <div className="allReview">
      {reviews.listResult.map((item) => (
        <div key={item.id} className="danhgia">
           <p className="name" style={{ fontWeight: 'bold', textAlign:'right', fontSize: '15px' }}>
            <p className="delete-product"
        onClick={(e) => handleDeleteProduct(item.id)}
      > <DeleteOutlined></DeleteOutlined></p>
          </p>
          <p className="name" style={{ fontWeight: 'bold', textAlign:'left', fontSize: '15px' }}>
            {item.userName}
          </p>
          <div className="cmt" style={{ display: 'flex' }}>
            <Rate style={{ color: 'orange', fontSize: '14px' }} value={item.rate} disabled={true} />
            <p className="cmt" style={{ marginLeft: '1rem' }}>{item.comment}</p>
            
          </div>
          <Divider />
        
        </div>
      ))}
    </div>
  ) : (
    ""
  )}
</div>

      </div>
    </section>
  );
}
