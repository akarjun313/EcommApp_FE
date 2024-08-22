import React from 'react'
import { Link } from 'react-router-dom'
import { useResetRecoilState } from 'recoil'
import { userAtom } from '../../logic/atoms'
import Cookies from 'js-cookie'
import axios from 'axios'
import { baseUrl } from '../../baseURL/baseURL'
import { toast } from 'react-toastify'
import ThemeToggler from '../../ui/ThemeToggler'

export default function AdminNavbar() {

    const resetUser = useResetRecoilState(userAtom)

    const userAccount = async () => {
        try {
            const res = await axios.post(`${baseUrl}/api/v1/admin/logout`, {}, { withCredentials: true })
            if (res.data.success) {
                Cookies.remove('token')
                resetUser()
                toast.success("Successfully logged out")
            }
        } catch (error) {
            console.log("Error in logging out", error)
            toast.error("Error in logging out")
        }
    }


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to={'/admin/home'}>Dashboard</Link></li>
                        <li><Link to={'/admin/product-list'}>Products</Link></li>
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl" to='/admin/home'>Timeluxe</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to={'/admin/home'}>Dashboard</Link></li>
                    <li><Link to={'/admin/product-list'}>Products</Link></li>
                </ul>
            </div>
            <div className="navbar-end gap-8">
                <ThemeToggler />
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="User icon" src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link to={'/admin/login'} onClick={userAccount}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
