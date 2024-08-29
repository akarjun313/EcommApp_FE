import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { baseUrl } from '../../baseURL/baseURL'
import WatchCard from '../../ui/WatchCard'


export default function ProductShowcase() {

    const [activeLink, setActiveLink] = useState('new')
    const [products, setProducts] = useState([])

    const newProducts = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/user/new-products`, { withCredentials: true })
            console.log(res)
            if (res.data.success === true) {
                console.log(res.data.message)
                setProducts(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log('Error in showing new products', error)
            toast.error("Error in showing new products")
        }
    }

    const topRatedProducts = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/user/top-rated`, { withCredentials: true })
            if (res.data.success === true) {
                console.log(res.data.message)
                setProducts(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log('Error in showing top rated products', error)
            toast.error("Error in showing top rated products")
        }
    }


    useEffect(() => {
        if (activeLink === 'new') {
            newProducts()
        } else {
            topRatedProducts()
        }
    }, [activeLink])



    return (
        <div>
            <div className='flex justify-center gap-4 mb-8'>
                <Link onClick={() => setActiveLink('new')}>
                    <h6 className="text-lg font-semibold relative group">
                        NEW
                        <span className={`absolute left-0 bottom-0 h-1 bg-current transition-all duration-300 ${activeLink === 'new' ? 'w-full' : 'w-0'}`}></span>
                    </h6>
                </Link>
                <Link onClick={() => setActiveLink('top-rated')}>
                    <h6 className="text-lg font-semibold relative group">
                        TOP-RATED
                        <span className={`absolute left-0 bottom-0 h-1 bg-current transition-all duration-300 ${activeLink === 'top-rated' ? 'w-full' : 'w-0'}`}></span>
                    </h6>
                </Link>
            </div>
            <div className='flex justify-center px-3'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
                    {products.length > 0 ? (
                        products.map(product => (
                            <WatchCard
                                key={product._id}
                                imgSrc={product.image[0]}
                                title={product.model}
                                description={product.description}
                                productId={product._id}
                            />
                        ))
                    ) : (
                        <h2 className="text-center text-2xl font-semibold col-span-full">
                            No items to list
                        </h2>
                    )}
                </div>
            </div>
        </div>
    )
}
