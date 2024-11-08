import React from 'react'
import App from '../App'
import { AuthContextProvider } from '../contexts/AuthContext'

const MainLayout = () => {

  return (
    <AuthContextProvider>
        <App/>
    </AuthContextProvider>
  )
}

export default MainLayout
