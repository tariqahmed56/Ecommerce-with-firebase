import React, { useContext, useEffect } from 'react'
import { AuthContext, useAuth } from '../../contexts/AuthContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Login from '../../Pages/Auth/Login';

const ForLoggedInUser = ({Component}) => {
    const {user} = useContext(AuthContext);

    return user ? <Outlet/> : <Login />
}

export default ForLoggedInUser
