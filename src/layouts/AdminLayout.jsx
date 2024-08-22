import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/admin/AdminNavbar'
import Footer from '../components/users/Footer'

export default function AdminLayout() {
  return (
    <>  
        <AdminNavbar />
        <Outlet />
        <Footer />
    </>
  )
}
