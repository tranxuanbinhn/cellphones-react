import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductPage from './pages/ProductPage';
import DetailPage from './pages/DetailPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import SearchPage from './pages/SearchPage';
import AdminPage from './pages/AdminPage';
import ResetScroll from './components/ResetScroll/ResetScroll';
import MyOrderPage from './pages/MyOrderPage';
import ChatPage from './pages/ChatPage';
import PaymentPage from './pages/PaymentPage';
import ResultPage from './pages/ResultPage';
import PrivateRoute from './privateRoute'

import OrderSuccessPage from './pages/OrderSuccessPage'

function App() {
  return (
    <div className="App">
  
      <Router>
        
        <ResetScroll></ResetScroll>

        <PrivateRoute path="/" exact>
          <HomePage></HomePage>
        </PrivateRoute>

        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/register">
          <SignupPage></SignupPage>
        </Route>

        <Route path="/product/:category">
          <ProductPage></ProductPage>
        </Route>
        <Route path="/detail/:id">
          <DetailPage></DetailPage>
        </Route>

        <Route path='/cart'>
          <CartPage></CartPage>
        </Route>

        <Route path='/order'>
          <OrderPage></OrderPage>
        </Route>
        <Route path='/resultorder'>
          <ResultPage></ResultPage>
        </Route>
        <Route path='/orderSuccess'>
          <OrderSuccessPage></OrderSuccessPage>
        </Route>
        <Route path='/payment'>
          <PaymentPage></PaymentPage>
        </Route>
        <Route path='/MyOrder'>
          <MyOrderPage></MyOrderPage>
        </Route>

        <Route path='/search'>
          <SearchPage></SearchPage>
        </Route>

        <Route path='/chat'>
          <ChatPage></ChatPage>
        </Route>

        <PrivateRoute path='/admin' roles={['admin']} component={AdminPage} />
       

        {/* <Route path='*'>
          <HomePage></HomePage>
        </Route> */}

      </Router>
    </div>
  );
}

export default App;
