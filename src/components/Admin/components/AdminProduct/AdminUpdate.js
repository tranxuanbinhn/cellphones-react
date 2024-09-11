import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  getproductById,
  removeProductById,
  saveProduct,
} from "../../../../actions/ProductAction";
import { useHistory, useParams } from "react-router-dom";
import { getAllBrand, getAllSelectList } from "../../../../actions/SelectListAction";

function AdminUpdate(props) {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState("");
  const detailProduct = useSelector((state) => state.getProductById.product);
  const SelectList = useSelector((state) => state.selectList.List);
  const Brands = useSelector((state) => state.selectList.Brand);
  const [activeTypeProduct, setActiveTypeproduct] = useState(undefined);
  const { List } = useSelector((state) => state.allTypeProduct);
   
   
   


  useEffect(() => {
    dispatch(getproductById(id));

    return () => {
      dispatch(removeProductById());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllSelectList());
    dispatch(getAllBrand());
  
  }, []);



  const handleFileImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    
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
    formData.append('id',data.id);
    formData.append('brandName',data.brandName);
    formData.append('categoryName',data.categoryName);
    formData.forEach((value, key) => {
       
    });
    await dispatch(saveProduct(formData));
    history.push("/admin/product");
  };

  const MenuFirmProduct = (item) => (
    <div
      className={
        activeTypeProduct
          ? activeTypeProduct === item.name
            ? `filter-menu-firm-item active`
            : "filter-menu-firm-item"
          : detailProduct.type === item.name
          ? `filter-menu-firm-item active`
          : "filter-menu-firm-item"
      }
      onClick={() => HandleFilterProductByType(item.name)}
    >
      <img src={item.img}></img>
    </div>
  );

  const HandleFilterProductByType = (name) => {
    setActiveTypeproduct(name);
  };

  return (
    <div className="admin-create">
      <span>Update Product</span>
      {detailProduct ? (
        <form
        className="admin-create-product"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        >
            <input
            {...register("id")}
            placeholder="ID"
            defaultValue={detailProduct.id}
            readOnly
          ></input>
          <input
            {...register("productName")}
            placeholder="Name"
            defaultValue={detailProduct.productName}
          ></input>
         
          <input
            {...register("size")}
            placeholder="Size"
          
            defaultValue={detailProduct.size}
          ></input>
          <input
            {...register("price")}
            placeholder="Price"
            type="number"
            defaultValue={detailProduct.price}
          ></input>
          <input
            {...register("color")}
            placeholder="Color"
         
            defaultValue={detailProduct.color}
          ></input>
          <input
            {...register("description")}
            placeholder="description"
         
            defaultValue={detailProduct.description}
          ></input>
          <input
            {...register("height")}
            placeholder="height"
         
            defaultValue={detailProduct.height}
          ></input>
          <input
            {...register("length")}
            placeholder="length"
         
            defaultValue={detailProduct.length}
          ></input>
          <input
            {...register("internalmemory")}
            placeholder="internalmemory"
         
            defaultValue={detailProduct.internalmemory}
          ></input>
          <input
            {...register("ramstorage")}
            placeholder="ramstorage"
         
            defaultValue={detailProduct.ramstorage}
          ></input>
          <input
            {...register("screensize")}
            placeholder="screensize"
         
            defaultValue={detailProduct.screensize}
          ></input>
          <input
            {...register("screentech")}
            placeholder="screentech"
         
            defaultValue={detailProduct.screentech}
          ></input>
          <input
            {...register("weight")}
            placeholder="weight"
         
            defaultValue={detailProduct.weight}
          ></input>
          <input
            {...register("size")}
            placeholder="size"
         
            defaultValue={detailProduct.size}
          ></input>
           <input
            {...register("width")}
            placeholder="width"
         
            defaultValue={detailProduct.width}
          ></input>
          
         

          {SelectList && SelectList.length > 0
            ? SelectList.map((item) => (
                <div className="select-type">
                  <select
                    {...register('categoryName')}
                    defaultValue={detailProduct.categoryName}
                  >
                   <option value={item.categoryName}>{item.categoryName}</option>
                  </select>
                </div>
              ))
            : ""}
              {Brands && Brands.length > 0
            ? Brands.map((item) => (
                <div className="select-type">
                  <select
                    {...register('brandName')}
                    defaultValue={detailProduct.brandName}
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
          <button type="submit">Update Product</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminUpdate;
