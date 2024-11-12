import React, { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoutes = () => {
  let {user} = useContext(AuthContext);
  return true ? <Outlet/> : <Navigate to={'/'}/>
}

export default PrivateRoutes
