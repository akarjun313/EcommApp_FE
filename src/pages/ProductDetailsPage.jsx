import React, { useState } from 'react'
import ProductInDetail from '../components/users/ProductInDetail'
import ShowProductReviews from '../components/users/ShowProductReviews'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../baseURL/baseURL'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

export default function ProductDetailsPage() {

    const token = Cookies.get('token')

    const { id } = useParams()
    const [loading, setLoading] = useState(false)

    const addToCart = async () => {
        try {
            if (token) {
                const res = await axios.post(`${baseUrl}/api/v1/user/add-to-cart/${id}`, {}, { withCredentials: true })
                if (res.data.success === true) {
                    toast.success(res.data.message)
                } else {
                    toast.error(res.data.message)
                }
        } else {
            toast.error("Please login to add to cart")
        }
        } catch (error) {
            console.log("Error in adding to cart", error)
            toast.error("Error in adding to cart")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <ProductInDetail />
            <ShowProductReviews />
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    onClick={addToCart}
                    disabled={loading}
                    className="btn btn-warning btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                >
                    {loading ? 'Adding...' : 'Add to cart'}
                </button>
            </div>
        </div>
    )
}
