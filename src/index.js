import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import { store, persistor } from './store'
import "antd/dist/antd.css";
import "leaflet/dist/leaflet.css";
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </PersistGate>
  </Provider>,
  document.getElementById('root')
);

