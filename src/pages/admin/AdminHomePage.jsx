import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../baseURL/baseURL'
import { toast } from 'react-toastify'
import Dashboard from '../../ui/Dashboard'

export default function AdminHomePage() {

    const [ dashboard, setDashboard ] = useState({ totalUsers: 0, sellerCount: 0, userCount: 0, bookingCount: 0 })

    const getDashboardDetails = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/admin/dashboard-readings`, { withCredentials: true })
            console.log(res)
            if (res.data.success === true) {
                setDashboard({
                    totalUsers: res.data.totalUsers,
                    sellerCount: res.data.sellerCount,
                    userCount: res.data.userCount,
                    bookingCount: res.data.bookingCount
                })
            } else {
                toast.error('Unknown error occured')
            }
        } catch (error) {
            console.log("Error in fetching dashboard contents", error)
            toast.error("Error in fetching dashboard contents")
        }
    }

    useEffect(() => {
        getDashboardDetails()
    }, [])

    return (
        <div className="py-10 mt-10 px-4 md:px-10 lg:px-20">
            <h1 className="text-2xl font-bold mb-10">Admin Dashboard :</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Dashboard
                    title="Total Users"
                    value={dashboard.totalUsers}
                    description="Total number of users in the system."
                />
                <Dashboard
                    title="Normal users count"
                    value={dashboard.userCount}
                    description="Count of Normal account holders."
                />
                <Dashboard
                    title="Sellers count"
                    value={dashboard.sellerCount}
                    description="Count of Seller account holders."
                />
                <Dashboard
                    title="Total bookings"
                    value={dashboard.bookingCount}
                    description="Total bookings from the system."
                />
            </div>
        </div>
    )
}
