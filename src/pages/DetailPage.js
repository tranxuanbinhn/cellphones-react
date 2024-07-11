import React from "react";
import Header from "../components/header/Header";
import Detail from "../components/detail/Detail";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import AppChat from "../components/AppChat/AppChat";
import { useSelector } from "react-redux";
import Footer from '../components/footer/Footer'

function DetailPage(props) {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <div>
      <Header></Header>
      <Detail></Detail>
      {userInfo ? <AppChat></AppChat> : ""}
      <ScrollToTop></ScrollToTop>
      <Footer></Footer>
    </div>
  );
}

export default DetailPage;
