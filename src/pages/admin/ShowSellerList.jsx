import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../baseURL/baseURL'
import { toast } from 'react-toastify'

export default function ShowSellerList() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [statusUpdate, setStatusUpdate] = useState({})

    const getSellers = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/admin/get-all-products`, { withCredentials: true })

            if (res.data.success === true) {
                setProducts(res.data.products)
                setLoading(false)
            } else {
                toast.error(res.data.message)
                setLoading(false)
            }

        } catch (error) {
            console.error("Error fetching products:", error)
            toast.error("Error fetching products")
            setLoading(false)
        }
    }

    const handleStatusChange = (productId) => {
        setStatusUpdate(prev => ({ ...prev, [productId]: true }))
    }

    const approveProduct = async (pId) => {
        try {
            const res = await axios.patch(`${baseUrl}/api/v1/admin/change-status/${pId}`, { status: statusUpdate[pId] || true }, { withCredentials: true })
            if (res.data.success === true) {
                toast.success(res.data.message)
                getSellers()
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.error("Error updating product status:", error)
            toast.error("Error updating product status")
        }
    }


    useEffect(() => {
        getSellers()
    }, [])

    return (
        <div className="overflow-x-auto h-lvh">
            {loading ? (
                <div className="text-center py-8">Loading...</div>
            ) : (
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Seller</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-8">No Products Found</td>
                            </tr>
                        ) : (
                            products.map(product => (
                                <tr key={product._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={product.image[0]}
                                                        alt="Product"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product.model}</div>
                                                <div className="text-sm opacity-50">{product.brand}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span className="font-bold">{`${product.seller.firstName} ${product.seller.lastName}`}</span>
                                            <span className="text-sm opacity-50">{product.seller.email}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {product.status ? (
                                            <span className="badge badge-success">Active</span>
                                        ) : (
                                            <button
                                                className="btn btn-error btn-xs"
                                                onClick={() => handleStatusChange(product._id)}
                                            >
                                                Inactive
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-info btn-xs"
                                            onClick={() => approveProduct(product._id)}
                                        >
                                            Save
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}
