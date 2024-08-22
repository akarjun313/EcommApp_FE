import React from 'react'
import { Outlet } from 'react-router-dom'
import SellerNavbar from '../components/seller/SellerNavbar'
import Footer from '../components/users/Footer'

export default function SellerLayout() {
  return (
    <>
        <SellerNavbar />
        <Outlet />
        <Footer />
    </>
  )
}
