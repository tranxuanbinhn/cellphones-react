import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { getAllUserReducer, UserSigninReducer, UserSignupReducer} from './reducers/UserReducer'
import {getProductByTypeReducer, getAllProductReducer, getProductByIdReducer, paginationProductReducer, ascendingProductReducer, descendingProductReducer, searchProductReducer, reviewProductReducer} from './reducers/ProductReducer'
import { CartReducer} from './reducers/CartReducer'
import { addressReducer, getAllOrderReducer, getOrderByUserReducer, OrderInfoReducer, orderPayReducer } from './reducers/OrderReducer'
import { ChatReducer } from './reducers/ChatReducer'
import { SelectListReducer, UpdateSelectListReducer } from "./reducers/SelectListReducer";
import { ListTypeProductReducer, TypeProductReducer } from './reducers/ListTypeProductReducer';
import { TokenReducer } from './reducers/TokenReducer'
import { InfoGhnReducer } from './reducers/GhnReducer'
import { Message } from './reducers/MessageReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 



const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : undefined,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  //   shippingAddress: localStorage.getItem('shippingAddress')
  //   ? JSON.parse(localStorage.getItem('shippingAddress'))
  //   : {},
};
const reducer = combineReducers({
  users: getAllUserReducer,
  userSignin: UserSigninReducer,
  userSignup: UserSignupReducer,
  allProduct: getAllProductReducer,
  getProductById: getProductByIdReducer,
  searchProduct: searchProductReducer,
  cart: CartReducer, 
  allOrder: getAllOrderReducer,
  address: addressReducer,
  orderByUser: getOrderByUserReducer,
  orderInfo: OrderInfoReducer,
  payOrder: orderPayReducer,
  orderGhn: InfoGhnReducer,
  chat: ChatReducer,
  selectList: SelectListReducer,
  updateSelect: UpdateSelectListReducer,
  allTypeProduct: ListTypeProductReducer,
  detailType: TypeProductReducer,
  message:Message,
  token:TokenReducer
});
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer ,initialState, composeEnhancer(applyMiddleware(thunk)));
const persistor = persistStore(store);

export { store, persistor };