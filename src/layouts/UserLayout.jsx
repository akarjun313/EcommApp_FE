import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/users/Navbar'
import Footer from '../components/users/Footer'

export default function UserLayout() {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}
