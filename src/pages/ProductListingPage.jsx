import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../baseURL/baseURL'
import { toast } from 'react-toastify'
import WatchCard from '../ui/WatchCard'
import SearchBar from '../components/users/SearchBar'

export default function ProductListingPage() {


    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/user/listing`, { withCredentials: true })
            if (res.data.success === true) {
                setProducts(res.data.message)
                setFilteredProducts(res.data.message)
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
            <SearchBar products={products} setFilteredProducts={setFilteredProducts} />
            <h1 className="text-2xl font-semibold mb-8 mt-8">Product Listing</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.length === 0 ? (
                    <h2 className="col-span-full text-center text-lg">No items to list</h2>
                ) : (
                    filteredProducts.map(product => (
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
