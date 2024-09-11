import './App.css';
import { BrowserRouter as Router, Route ,Redirect } from 'react-router-dom';
import { isAdmin } from './untils';

 const  PrivateRoute = ({ component: Component, roles, ...rest }) => (<Route
  {...rest}
  render={(props) => {
     
     
     
    if ( !isAdmin()) {
       
      return <Redirect to="/" />;
    }
    
    return <Component {...props} />;
  }}
/>)
export default PrivateRoute ;
