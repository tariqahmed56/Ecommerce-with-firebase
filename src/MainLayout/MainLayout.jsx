import React from 'react'
import App from '../App'
import { AuthContextProvider } from '../contexts/AuthContext'
import  ProductDataProvider  from '../contexts/ProductDataContext'

const MainLayout = () => {

  return (
    <AuthContextProvider>
      <ProductDataProvider>
        <App/>
      </ProductDataProvider>
    </AuthContextProvider>
  )
}

export default MainLayout
