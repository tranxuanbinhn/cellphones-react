import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {
  filterProductByPrice,
} from "../../actions/ProductAction";
import { formatPrice } from "../../untils/index";
import FilterMenu from "./FilterMenu/FilterMenu";


function FilterProduct(props) {
  const dispatch = useDispatch();
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);
  const page = props.page;
  const filter = props.filter;
  const FilterProductByPrice =  (a, b, page) => {
    
    let startPrice = parseInt(a);
    let endPrice = parseInt(b);
    dispatch(filterProductByPrice(startPrice, endPrice, page));
  };

  

  return (
    <div className="filter">
      <FilterMenu></FilterMenu>
      
      <div className="options-price">
        <input
          type="number"
          id="priceStart"
          placeholder="đ TỪ"
          onChange={(e) => setStartPrice(e.target.value)}
        ></input>
        <input
          type="number"
          id="priceEnd"
          placeholder="đ ĐẾN"
          onChange={(e) => setEndPrice(e.target.value)}
        ></input>
        <button onClick={() => FilterProductByPrice(startPrice, endPrice,page)}>
          Tìm
        </button>
      </div>
    </div>
  );
}

export default FilterProduct;