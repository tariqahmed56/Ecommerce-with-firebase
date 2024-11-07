import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const ForLoggedInUser = ({Component}) => {
    const {user} = useAuth();

    return user ? <Outlet/> : <Navigate to='login'/> 
}

export default ForLoggedInUser
