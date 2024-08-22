import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../baseURL/baseURL'
import { toast } from 'react-toastify'
import AddProductBtn from '../../components/seller/AddProductBtn'

export default function MyProductsPage() {


    const [products, setProducts] = useState([])


    const myProducts = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/seller/my-products`, { withCredentials: true })
            if (res.data.success === true) {
                setProducts(res.data.message)
            }
        } catch (error) {
            console.log("Error in displaying your products", error)
            toast.error("Error in displaying your products")
        }
    }

    const deleteProduct = async (pId) => {
        try {
            const res = await axios.delete(`${baseUrl}/api/v1/seller/remove-product/${pId}`, { withCredentials: true })
            if (res.data.success === true) {
                toast.success(res.data.message)
                myProducts()
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error in product deletion", error)
            toast.error("Error in product deletion")
        }
    }


    const editStockAndPrice = async (pId, stock, price) => {
        try {
            const res = await axios.patch(`${baseUrl}/api/v1/seller/edit-product/${pId}`, { price, stock }, { withCredentials: true })
            if (res.data.success === true) {
                toast.success(res.data.message)
                myProducts()
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error in product modifying", error)
            toast.error("Error in product modifying")
        }
    }

    useEffect(() => {
        myProducts()
    }, [])


    const handleInputChange = (e, product, field) => {
        const updatedProducts = products.map((item) =>
            item._id === product._id ? { ...item, [field]: e.target.value } : item
        )
        setProducts(updatedProducts)
    }

    return (
        <>
            <div className='flex py-10 px-12'>
                <AddProductBtn />
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Model</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>For</th>
                            <th>Category</th>
                            <th>Occasion</th>
                            <th>Warranty</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={product.image[0]}
                                                        alt={product.model}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product.model}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={product.price}
                                            onChange={(e) => handleInputChange(e, product, 'price')}
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={product.stock}
                                            onChange={(e) => handleInputChange(e, product, 'stock')}
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                    </td>
                                    <td>{product.usedFor}</td>
                                    <td>{product.category}</td>
                                    <td>{product.occassion}</td>
                                    <td>{product.warranty ? `${product.warranty} years` : 'No Warranty'}</td>
                                    <td>{product.description}</td>
                                    <td>{product.status ? (<p className='text-success'>Available</p>) : (<p className='text-error'>Inactive</p>)}</td>
                                    <td>
                                        <button
                                            className="btn btn-xs btn-primary"
                                            onClick={() => editStockAndPrice(product._id, product.stock, product.price)}
                                        >
                                            Save
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-error btn-xs"
                                            onClick={() => deleteProduct(product._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="text-center">No products found</td>
                            </tr>
                        )}
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Model</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>For</th>
                            <th>Category</th>
                            <th>Occasion</th>
                            <th>Warranty</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}
