import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteProduct,
  paginationProduct,
} from "../../../../actions/ProductAction";
import { useHistory, Link } from "react-router-dom";
import { formatPrice } from "../../../../untils/index";
import { DeleteOutlined, EditOutlined, FormOutlined,InfoCircleOutlined } from "@ant-design/icons";


function Product(props) {
  const { product, number } = props;
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.allProduct.currentPage);

  const handleDeleteProduct = async (product) => {
    await dispatch(DeleteProduct(product.id));
    dispatch(paginationProduct(currentPage));
  };

  return (
    <tr>
      <td>{number + 1}</td>
      <td>
        <img src={product.image}></img>
      </td>
      <td>{product.productName}</td>
      <td>{formatPrice(product.price)}</td>
      <td>{product.categoryName}</td>
      <td
        className="delete-product"
        onClick={(e) => handleDeleteProduct(product)}
      >
        <DeleteOutlined />
      </td>
      <td className="update-product">
        <Link to={`/admin/product/update/${product.id}`}>
          <EditOutlined></EditOutlined>
        </Link>
      </td>
      <td className="review-product">
        <Link to={`/admin/product/reviewProduct/${product.id}`} >
          <FormOutlined></FormOutlined>
        </Link>
      </td>
      <td className="review-product">
        <Link to={`/admin/product/detail/${product.id}`} >
          <InfoCircleOutlined></InfoCircleOutlined>
        </Link>
      </td>
    </tr>
  );
}

export default Product;
