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

function AdminProductDetail(props) {
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
  console.log('detailProduct',detailProduct);
  console.log('SelectList',SelectList);
  console.log('Brand',Brands);


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
   
    data.image = image;
    console.log('image', image)
    await dispatch(saveProduct(data));
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
      <span>Product Detail</span>
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
           <span style={{maxWidth:'100px'}}>
           <img style={{width:'100%'}} src={detailProduct.image}></img>
           </span>
          <input
            {...register("productName")}
            placeholder="Name"
            defaultValue={detailProduct.productName}
          readOnly
          >
            
          </input>
         
          <input
            {...register("size")}
            placeholder="Size"
          
            defaultValue={detailProduct.size}
          readOnly
          >
            
          </input>
          <input
            {...register("price")}
            placeholder="Price"
            type="number"
            defaultValue={detailProduct.price}
          readOnly
          >
            
          </input>
          <input
            {...register("color")}
            placeholder="Color"
         
            defaultValue={detailProduct.color}
          readOnly
          >
            
          </input>
          <input
            {...register("description")}
            placeholder="description"
         
            defaultValue={detailProduct.description}
          readOnly
          >
            
          </input>
          <input
            {...register("height")}
            placeholder="height"
         
            defaultValue={detailProduct.height}
          readOnly
          >
            
          </input>
          <input
            {...register("internalmemory")}
            placeholder="internalmemory"
         
            defaultValue={detailProduct.internalmemory}
          readOnly
          >
            
          </input>
          <input
            {...register("ramstorage")}
            placeholder="ramstorage"
         
            defaultValue={detailProduct.ramstorage}
          readOnly
          >
            
          </input>
          <input
            {...register("screensize")}
            placeholder="screensize"
         
            defaultValue={detailProduct.screensize}
          readOnly
          >
            
          </input>
          <input
            {...register("screentech")}
            placeholder="screentech"
         
            defaultValue={detailProduct.screentech}
          readOnly
          >
            
          </input>
          <input
            {...register("weight")}
            placeholder="weight"
         
            defaultValue={detailProduct.weight}
          readOnly
          >
            
          </input>
          <input
            {...register("size")}
            placeholder="size"
         
            defaultValue={detailProduct.size}
          readOnly
          >
            
          </input>
           <input
            {...register("width")}
            placeholder="width"
         
            defaultValue={detailProduct.width}
          readOnly
          >
            
          </input>
          
         

          {SelectList && SelectList.length > 0
            ? SelectList.map((item) => (
                <div className="select-type">
                  <select
                    {...register('categoryName')}
                    defaultValue={SelectList[0]?.categoryName}
                  >
                   <option>{SelectList[0]?.categoryName}</option>
                  </select>
                </div>
              ))
            : ""}
              {Brands && Brands.length > 0
            ? Brands.map((item) => (
                <div className="select-type">
                  <select
                    {...register('brandName')}
                    defaultValue={Brands[0]?.brandName}
                  >
                   <option>{Brands[0]?.brandName}</option>
                  </select>
                </div>
              ))
            : ""}

         
         
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminProductDetail;
