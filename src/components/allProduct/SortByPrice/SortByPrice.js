import React from "react";
import "./SortByPrice.css";
import { useDispatch } from "react-redux";
import {
  getAllProductByCategoryCode,
  descendingProduct,
} from "../../../actions/ProductAction";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function SortByPrice(props) {
  const dispatch = useDispatch();

  const menuShow = () => (
    <div className="sort-price-list">
      <div className="sort-price-list-item" onClick={ThapDenCao}>
        <span>Thấp đến cao</span>
      </div>
      <div className="sort-price-list-item" onClick={CaoDenThap}>
        <span>Cao đến thấp</span>
      </div>
    </div>
  );
  const page = props.page;
  const ThapDenCao = () => {

    const queryParams = new URLSearchParams(window.location.search);
              queryParams.set('sort', 'desc');
                // Lấy URL hiện tại và thêm chuỗi query parameter mới vào
      const newUrl = window.location.pathname + '?' + queryParams.toString();
  
      // Truy cập URL mới
      window.location.href = newUrl;
    dispatch(getAllProductByCategoryCode(page));
  };

  const CaoDenThap = () => {
   const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('sort', 'asc');
      // Lấy URL hiện tại và thêm chuỗi query parameter mới vào
const newUrl = window.location.pathname + '?' + queryParams.toString();

// Truy cập URL mới
window.location.href = newUrl;
    dispatch(getAllProductByCategoryCode(page));
  };

  return (
    <div className="sort-price">
      <Dropdown overlay={menuShow} trigger={["click"]}>
        <span className="sort-price-title" onClick={(e) => e.preventDefault()}>
          Sắp xếp theo giá <DownOutlined />
        </span>
      </Dropdown>
    </div>
  );
}
