import React, { useContext, useEffect } from 'react'
import { AuthContext, useAuth } from '../../contexts/AuthContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const ForLoggedInUser = ({Component}) => {
    const {user} = useContext(AuthContext);

    return user ? <Outlet/> : <Navigate to='login'/> 
}

export default ForLoggedInUser
