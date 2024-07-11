import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  editCurrentPage,
  SaveUser,
} from "../../../../actions/UserAction";
import { useHistory } from "react-router-dom";
import { getAllSelectList } from "../../../../actions/SelectListAction";
import { getAllTypeProduct } from "../../../../actions/ListTypeProductAction";

function AdminUserCreate(props) {
  const { register, handleSubmit } = useForm({ defaultValues: {} });
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [activeTypeProduct, setActiveTypeproduct] = useState("");
  const SelectList = useSelector(state => state.selectList.List)
  const Brands = useSelector(state => state.selectList.Brand)

  const { List } = useSelector((state) => state.allTypeProduct);
  let pages = useSelector((state)=> state.users.currentPage);
  const  roles  = useSelector((state) => state.users.roles);
  const  userdetail  = useSelector((state) => state.users.userdetail);

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
    await dispatch(SaveUser(data));
    await dispatch(editCurrentPage(pages));
    history.push("/admin/customer");
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
      <img src={item.img}></img>
    </div>
  );

  const HandleFilterProductByType = (name) => {
    setActiveTypeproduct(name);
  };

  return (
    <div className="admin-create">
    <span>Create Product</span>
    {userdetail ? (
      <form
        className="admin-create-product"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
          <input
          {...register("username")}
          placeholder="User Name"
          
          
        ></input>
        <input
          {...register("email")}
          placeholder="Email"
          
        ></input>
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          
        ></input>
       
        <input
          {...register("phonenumber")}
          placeholder="Phone Number"
        
          
        ></input>
  
     
        
       

        {roles && roles.length > 0
          ? 
              <div className="select-type">
                <select
                  {...register('role')}
                  defaultValue={roles[0]?.name}
                >
                  {roles.map((item) => (
                 <option value={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>
            
          : ""}
           

     
        <button type="submit">Create Product</button>
      </form>
    ) : (
      ""
    )}
  </div>
  );
}

export default AdminUserCreate;
