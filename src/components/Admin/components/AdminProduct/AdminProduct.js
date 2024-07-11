import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  paginationProduct,
} from "../../../../actions/ProductAction";
import { Link } from "react-router-dom";
import ListProduct from "./ListProduct";
import "./AdminProduct.css";
import { AppstoreAddOutlined, ToolOutlined } from "@ant-design/icons";

function AdminProduct(props) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.allProduct.currentPage);
  const  product  = useSelector((state) => state.allProduct.product);
  

  useEffect(() => {
    const page = currentPage===undefined?1:currentPage;
    dispatch(paginationProduct(page));
  }, [dispatch, currentPage]);

  return (
    <div className="admin-product">
      <div className="admin-product-link">
        <Link to="/admin/product/create" className="add-product">
          <AppstoreAddOutlined />
        </Link>
        
      </div>

      {product?.listResult ? (
        <ListProduct listProducts={product}></ListProduct>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default AdminProduct;
