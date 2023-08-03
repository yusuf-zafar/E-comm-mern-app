import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import webFont from 'webfontloader';
import { useEffect, useState } from 'react';
import Home from './component/Home/Home.js'
import ProductDetails from './component/Product/ProductDetails.js'
import Products from './component/Product/Products.js'
import Search from './component/Product/Search.js'
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js"
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from './component/Cart/ConfirmOrder.js'
import axios from 'axios';
import Payment from './component/Cart/Payment.js';
import OrderSuccess from './component/Cart/OrderSuccess.js'

function App() {

  const {isAuthenticated, user} = useSelector(state=>state.user)

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey(){
      const { data } = await axios.get('/api/v1/stripeapikey');

      setStripeApiKey(data.stripeApiKey)
  }

  useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto","Droid Sans", "Chilanka"]
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  },[])
  
  return (
    <Router>
   <Header/>
   {isAuthenticated && <UserOptions user={user}/>}

   <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/product/:id' element={<ProductDetails/>}/>
   <Route path='/products' element={<Products/>}/>
   <Route path='/products/:keyword' element={<Products/>}/>
   <Route path='/search' element={<Search/>}/>
   <Route path='/login' element={<LoginSignUp/>}/>

   <Route element={<ProtectedRoute stripeApiKey={stripeApiKey}  />}>
   <Route path='/account' element={<Profile/>}/>
   <Route path='/me/update' element={<UpdateProfile/>}/>
   <Route path='/password/update' element={<UpdatePassword/>}/>
   <Route path='/shipping' element={<Shipping/>}/>
   <Route path='/order/confirm' element={<ConfirmOrder/>}/>
   {stripeApiKey && <Route path='/process/payment' element={<Payment/>}/>}
   <Route path='/success' element={<OrderSuccess/>}/>
   </Route>
   
   <Route path='/password/forgot' element={<ForgotPassword/>}/>
   <Route path='/password/reset/:token' element={<ResetPassword/>}/>
   <Route path='/cart' element={<Cart/>}/>
   
   </Routes>

 
   <Footer/>
   </Router>
  );
}

export default App;
