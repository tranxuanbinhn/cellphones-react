import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import './AdminCreate.css'

import {
  editCurrentPage,
  saveProduct,
} from "../../../../actions/ProductAction";
import { useHistory } from "react-router-dom";
import { getAllSelectList } from "../../../../actions/SelectListAction";
import { getAllTypeProduct } from "../../../../actions/ListTypeProductAction";

function AdminCreate(props) {
  const { register, handleSubmit } = useForm({ defaultValues: {} });
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState("");
  const [activeTypeProduct, setActiveTypeproduct] = useState("");
  const SelectList = useSelector(state => state.selectList.List)
  const Brands = useSelector(state => state.selectList.Brand)

  let  pages  = useSelector((state) => state.allProduct.currentPage);
  const { List } = useSelector((state) => state.allTypeProduct);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTypeProduct());
  }, [dispatch]);

  const handleFileImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    
    data.image = image;
    pages = 1;
    const formData = new FormData();
    formData.append('productName', data.productName);
    formData.append('description', data.description);
    formData.append('size',data.size);
    formData.append('color',data.color);
    formData.append('price',data.price);
    formData.append('weight',data.weight);
    formData.append('height',data.height);
    formData.append('length',data.length);
    formData.append('width',data.width);
    formData.append('file',image);
    formData.append('screensize',data.screensize);
    formData.append('screentech',data.screentech);
    formData.append('ramstorage',data.ramstorage);
    formData.append('internalmemory',data.internalmemory);
    formData.append('os',data.os);
    formData.append('brandName',data.brandName);
    formData.append('categoryName',data.categoryName);

    await dispatch(saveProduct(formData));
    await dispatch(editCurrentPage(pages));
    history.push("/admin/product");
  };

  const MenuFirmProduct = (item) => (
    <div
      className={
        activeTypeProduct === item.name
          ? `filter-menu-firm-item active`
          : "filter-menu-firm-item"
      }
      onClick={() => HandleFilterProductByType(item.name)}
    >
      <img src={item.image}></img>
    </div>
  );

  const HandleFilterProductByType = (name) => {
    setActiveTypeproduct(name);
  };

  return (
    <div className="admin-create">
      <span>Add Product</span>
      
        <form
          className="admin-create-product"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
           
          <input
            {...register("productName")}
            placeholder="Name"
           
          ></input>
         
          <input
            {...register("size")}
            placeholder="Size"
          
           
          ></input>
          <input
            {...register("price")}
            placeholder="Price"
            type="number"
            defaultValue={0}
          ></input>
          <input
            {...register("color")}
            placeholder="Color"
         
           
          ></input>
          <input
            {...register("description")}
            placeholder="description"
         
           
          ></input>
          <input
            {...register("height")}
            placeholder="height"
            defaultValue={0}
           
          ></input>
              <input
            {...register("length")}
            placeholder="length"
            defaultValue={0}
           
          ></input>
          <input
            {...register("internalmemory")}
            placeholder="internalmemory"
         
           
          ></input>
          <input
            {...register("ramstorage")}
            placeholder="ramstorage"
         
           
          ></input>
          <input
            {...register("screensize")}
            placeholder="screensize"
            defaultValue={0}
           
          ></input>
          <input
            {...register("screentech")}
            placeholder="screentech"
         
           
          ></input>
          <input
            {...register("weight")}
            placeholder="weight"
            defaultValue={0}
           
          ></input>
         
           <input
            {...register("width")}
            placeholder="width"
            defaultValue={0}
           
          ></input>
          
         
          <div className="select-type">
  {SelectList && SelectList.length > 0 ? (
    <select {...register('categoryName')} defaultValue={SelectList[0]?.categoryName}>
      {SelectList.map((item) => (
        <option key={item.categoryName} value={item.categoryName}>
          {item.categoryName}
        </option>
      ))}
    </select>
  ) : (
    <option disabled>No categories available</option>
  )}
</div>

              {Brands && Brands.length > 0
            ? Brands.map((item) => (
                <div className="select-type">
                  <select
                    {...register('brandName')}
                    defaultValue={Brands[0]?.brandName}
                  >
                   <option value={item.brandName}>{item.brandName}</option>
                  </select>
                </div>
              ))
            : ""}

          <input
            type="file"
            {...register("image")}
            onChange={handleFileImageChange}
          ></input>
          <button type="submit">Add Product</button>
        </form>
       
    </div>
  );
}

export default AdminCreate;
