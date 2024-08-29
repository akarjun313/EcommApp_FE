import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeToggler from '../../ui/ThemeToggler'
import { useResetRecoilState, useRecoilState } from 'recoil'
import { userAtom } from '../../logic/atoms'
import Cookies from 'js-cookie'
import axios from 'axios'
import { baseUrl } from '../../baseURL/baseURL'
import { toast } from 'react-toastify'

export default function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useRecoilState(userAtom)
    const resetUser = useResetRecoilState(userAtom)
    const [cartCount, setCartCount] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {

        const userEmail = localStorage.getItem('userEmail')
        if (userEmail && !user) {

            axios.get(`${baseUrl}/api/v1/user/user-check`, { withCredentials: true })
                .then((res) => {
                    if (res.data.success) {
                        setUser(res.data.message)
                        setIsLoggedIn(true)
                    }
                })
                .catch((error) => {
                    console.log("Error in fetching user data at navbar", error)
                    setIsLoggedIn(false)
                })

        } else if (user) {
            setIsLoggedIn(true)

        } else {
            setIsLoggedIn(false)
        }
    }, [user])


    const userAccount = async () => {
        if (isLoggedIn) {
            try {
                const res = await axios.post(`${baseUrl}/api/v1/user/logout`, {}, { withCredentials: true })
                if (res.data.success) {
                    Cookies.remove('token')
                    resetUser()
                    localStorage.removeItem('userEmail')
                    setIsLoggedIn(false)
                }
            } catch (error) {
                console.log("Error in logging out", error)
                toast.error("Error in logging out")
            }
        }
    }


    const countCart = async () => {
        if (isLoggedIn) {
            try {
                const res = await axios.get(`${baseUrl}/api/v1/user/count-cart`, { withCredentials: true })
                if (res.data.success) {
                    setCartCount(res.data.message)
                }
            } catch (error) {
                console.log("error in countcart", error)
            }
        }
    }
    useEffect(()=>{
        countCart()
    }, [isLoggedIn])


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to={'/products'}>Watches</Link></li>
                        <li><Link to={'/customer-service'}>Customer service</Link></li>
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl" to='/'>Timeluxe</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to={'/products'}>Watches</Link></li>
                    <li><Link to={'/customer-service'}>Customer service</Link></li>
                </ul>
            </div>
            <div className="navbar-end gap-8">

                {/* add something for theme */}
                <ThemeToggler />

                {/* cart button  */}
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" disabled={!isLoggedIn} onClick={() => navigate('/cart')}>
                    <div className="indicator">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>

                        {isLoggedIn &&
                            <span className="badge badge-sm indicator-item">{cartCount}</span>
                        }
                    </div>
                </div>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="User icon" src="https://i.pinimg.com/originals/97/21/05/972105c5a775f38cf33d3924aea053f1.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            {isLoggedIn ? (
                                <Link to='/profile'>Profile</Link>
                            ) : (
                                <span className="cursor-not-allowed text-gray-500">Profile</span>
                            )}
                        </li>
                        <li>
                            {isLoggedIn ? (
                                <Link to='/orders'>Orders</Link>
                            ) : (
                                <span className="cursor-not-allowed text-gray-500">Orders</span>
                            )}
                        </li>
                        <li>
                            {isLoggedIn ? (
                                <Link to={'/'} onClick={userAccount}>Logout</Link>
                            ) : (
                                <Link to={'/login'}>Login</Link>
                            )}


                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
