import React, { useEffect, useState } from 'react'
import Dashboard from '../../ui/Dashboard'
import { baseUrl } from '../../baseURL/baseURL'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function SellerHomePage() {

    const [adStats, setAdStats] = useState({ totalProducts: 0, activeProducts: 0, inactiveProducts: 0 });
    const [salesStats, setSalesStats] = useState({ totalSales: 0, totalProfit: 0 });

    const adCount = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/seller/ad-count`, { withCredentials: true })
            if (res.data.success === true) {
                setAdStats({
                    totalProducts: res.data.totalProducts,
                    activeProducts: res.data.activeProducts,
                    inactiveProducts: res.data.inactiveProducts
                })
            }
        } catch (error) {
            console.log("Error in counting ad", error)
            toast.error("Error in counting ad")
        }
    }
    // adCount will return an array of totalProducts(Number), activeProducts(Number), inactiveProducts(Number)

    const salesAndProfit = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/seller/sales-and-profit`, { withCredentials: true })
            if (res.data.success === true) {
                setSalesStats({
                    totalSales: res.data.totalSales,
                    totalProfit: res.data.totalProfit
                })
            }
        } catch (error) {
            console.log("Error in sales and profit", error)
            toast.error("Error in sales and profit")
        }
    }
    // salesAndProfit will return an array of totalSales(Number), totalProfit(Number)


    useEffect(() => {
        adCount()
        salesAndProfit()
    }, [])

    return (
        <div className="py-10 mt-10 px-4 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Dashboard
                    title="Total Products"
                    value={adStats.totalProducts}
                    description="Total number of products you have listed."
                />
                <Dashboard
                    title="Active Products"
                    value={adStats.activeProducts}
                    description="Products that are currently active."
                />
                <Dashboard
                    title="Inactive Products"
                    value={adStats.inactiveProducts}
                    description="Products that are currently inactive."
                />
                <Dashboard
                    title="Total Sales"
                    value={salesStats.totalSales}
                    description="Total number of sales you've made."
                />
                <Dashboard
                    title="Total Profit"
                    value={`${salesStats.totalProfit}Rs`}
                    description="Total profit from your sales."
                />
            </div>
        </div>
    )
}
