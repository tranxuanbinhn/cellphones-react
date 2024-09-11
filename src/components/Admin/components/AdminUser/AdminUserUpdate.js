import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { GetAllRole, GetUserDetail,editCurrentPage,SaveUser } from "../../../../actions/UserAction";


function AdminUserUpdate(props) {
  const { register, handleSubmit } = useForm({ defaultValues: {} });
  const dispatch = useDispatch();
  const history = useHistory();
  const  {id}  = useParams();

  const [image, setImage] = useState("");
  const [activeTypeProduct, setActiveTypeproduct] = useState("");
  const SelectList = useSelector(state => state.selectList.List)
  const Brands = useSelector(state => state.selectList.Brand)
  let pages = useSelector((state)=> state.users.currentPage);
  const  roles  = useSelector((state) => state.users.roles);
  const  userdetail  = useSelector((state) => state.users.userdetail);
   

  const { List } = useSelector((state) => state.allTypeProduct);

  useEffect(() => {
    dispatch(GetAllRole());
    dispatch(GetUserDetail(id))
  }, []);



  const handleFileImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
  
    data.id = id;


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
    <span>Update Product</span>
    {userdetail ? (
      <form
        className="admin-create-product"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
          <input
          {...register("username")}
          placeholder="User Name"
          defaultValue={userdetail.username}
          
        ></input>
        <input
          {...register("email")}
          placeholder="Email"
          defaultValue={userdetail.email}
        ></input>
       
        <input
          {...register("phonenumber")}
          placeholder="Phone Number"
        
          defaultValue={userdetail.phonenumber}
        ></input>
  
     
        
       

        {roles && roles.length > 0
          ? 
              <div className="select-type">
                <select
                  {...register('role')}
                  defaultValue={userdetail.role}
                >
                  {roles.map((item) => (
                 <option value={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>
            
          : ""}
           

     
        <button type="submit">Update Product</button>
      </form>
    ) : (
      ""
    )}
  </div>
  );
}

export default AdminUserUpdate;
