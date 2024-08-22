import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../baseURL/baseURL'
import { toast } from 'react-toastify'
import WatchCard from '../ui/WatchCard'

export default function ProductListingPage() {


    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/user/listing`, { withCredentials: true })
            if (res.data.success === true) {
                setProducts(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error in product listing", error)
            toast.error("Error in product listing")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    if(loading){
        return <div className='text-center py-8'>Loading...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-8">Product Listing</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {products.length === 0 ? (
                    <h2 className="col-span-full text-center text-lg">No items to list</h2>
                ) : (
                    products.map(product => (
                        <WatchCard
                            key={product._id}
                            imgSrc={product.image[0]}
                            title={product.model}
                            description={product.description}
                            productId={product._id}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
