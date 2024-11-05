import React, { useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

const ForLoggedInUser = ({Component}) => {
    const {user} = useAuth();
    let navigate = useNavigate();
    useEffect(()=>{
        if(!user){
            navigate('login');
        }
    },[])
  return (
    <Component/>
  )
}

export default ForLoggedInUser
