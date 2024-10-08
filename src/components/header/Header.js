import React, { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { SignoutUser } from "../../actions/UserAction";
import { useHistory } from "react-router";
import { searchProduct,clearSearchProduct } from "../../actions/ProductAction";
import { Link } from "react-router-dom";
import {GetAllProductInCart} from '../../actions/CartAction';
import { isAdmin } from "../../untils";

import {
  DownOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();

   

  const [showAccount, setShowAccount] = useState(false);
  const [showAccount2, setShowAccount2] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const tokenvalue = useSelector((state) => state.token);
  const { userInfo, error } = userSignin;
  
  const [search, setSearch] = useState("");
  const checkUser = () =>{
     
    if(userInfo?.roles[0]==='ROLE_ADMIN')
      {
       history.push('/admin');
      }
  }
  useEffect(()=>
    {
       
      dispatch(GetAllProductInCart());
    },[])
    //useEffect(()=>{
    //  if(tokenvalue === false)
    //    {
    //      dispatch(SignoutUser());
    //      history.push('/login')
    //    }
    //}, [])
  const cartItems = useSelector((state) => state.cart.cartItems);

  const amount = cartItems? cartItems.reduce((a, b) => a + b.quantity, 0):0;


  const [menu, setMenu] = useState(true);

  const handleSignout = () => { 
    dispatch(SignoutUser());
  };

  const SearchProduct = async (e) => {
    e.preventDefault()
    await history.push("/search");
    dispatch(clearSearchProduct());
    dispatch(searchProduct(search,1));
    setSearch('')
  };

  
  return (
    
    <div className="header">
      <section id="menu">
        <div className="logo">
          <span>
            <Link to="/"> CELLPHONES </Link>
          </span>
        </div>
        <div className="search">
          <form onSubmit={(e) => SearchProduct(e)}>
            <input
              type="text"
              name="search"
              placeholder="Tìm kiếm ..."
              defaultValue={setSearch}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <SearchOutlined onClick={(e) => SearchProduct(e)}></SearchOutlined>
            {/* <button type="submit" onClick={(e) => SearchProduct(e)}>Search</button> */}
          </form>
        </div>
        <ul className="menu-list" id={menu ? "hidden" : ""}>
          <li className="active">
            <Link to="/"> Trang Chủ </Link>
          </li>
          <li>
        
          </li>
          {userInfo ? (
            <li onClick={() => setShowAccount2(!showAccount2)}>
              <Link>
                {userInfo.username}
                <DownOutlined style={{ fontSize: "14px" }} />
              </Link>
              {showAccount2 ? (
                <div className="menu-drop">
                  {userInfo.isAdmin ? <Link to="/admin">Admin</Link> : ""}
                  <Link to="/myOrder">Đơn hàng</Link>
                  <Link onClick={() => handleSignout()}>Đăng xuất</Link>
                </div>
              ) : (
                ""
              )}
            </li>
          ) : (
            <li onClick={() => setShowAccount(!showAccount)}>
              <Link>
                Tài khoản
                <DownOutlined style={{ fontSize: "14px" }} />
              </Link>

              {showAccount ? (
                <div className="menu-drop">
                  <Link to="register">Đăng kí</Link>
                  <Link to="login">Đăng nhập</Link>
                </div>
              ) : (
                ""
              )}
            </li>
          )}
          <li className="shop-cart">
            <Link to="/cart" className="shop-cart">
              <ShoppingCartOutlined
                style={{ fontSize: "30px" }}
              ></ShoppingCartOutlined>
              <span className="count"> {amount} </span>
            </Link>
          </li>
        </ul>
        <div className="bar" onClick={() => setMenu(!menu)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </section>
    </div>
  );
}

export default Header;
