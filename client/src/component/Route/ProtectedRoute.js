import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"

const ProtectedRoute = ({stripeApiKey}) => {
  
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return !loading && (<Elements stripe={loadStripe(stripeApiKey)}> <Outlet /> </Elements>);

};

export default ProtectedRoute;
