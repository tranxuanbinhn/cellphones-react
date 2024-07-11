import './App.css';
import { BrowserRouter as Router, Route ,Redirect } from 'react-router-dom';
import { isAdmin } from './untils';

 const  PrivateRoute = ({ component: Component, roles, ...rest }) => (<Route
  {...rest}
  render={(props) => {
    console.log('Inside render function');
    console.log('roles:', roles);
    console.log('isAdmin:', isAdmin());
    if ( !isAdmin()) {
      console.log('Redirecting to home');
      return <Redirect to="/" />;
    }
    
    return <Component {...props} />;
  }}
/>)
export default PrivateRoute ;
