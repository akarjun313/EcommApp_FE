import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../baseURL/baseURL'
import { toast } from 'react-toastify'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"

export default function ProductInDetail() {

    // product id here 
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    const getProduct = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/user/product/${id}`, { withCredentials: true })
            if (res.data.success === true) {
                console.log(res.data.message)
                setProduct(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error in showing product details", error)
            toast.error("Error in showing product details")
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    // if product is not there or takes time to load 
    if (!product) {
        return <div className='text-center py-8'>Loading...</div>
    }


    // Format the images for react-image-gallery
    const images = product.image.map(img => ({
        original: img,
        thumbnail: img
    }))

    return (
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <ImageGallery items={images} showThumbnails={true} showPlayButton={false} />
            </div>
            <div className="lg:order-2 order-1 space-y-4">
                <h1 className="text-3xl font-bold">{product.model}</h1>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-xl font-semibold">Price: {product.price}Rs</p>
                <p>Brand: {product.brand}</p>
                <p>Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>
                <p>Category: {product.category}</p>
                <p>Occasion: {product.occassion}</p>
                <p>Used For: {product.usedFor}</p>
                <p>Warranty: {product.warranty}</p>
                <div className="flex items-center">
                    <span className="mr-2">Rating:</span>
                    <div className='flex ml-2'>
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={index < product.rating ? "orange" : "none"}
                                stroke={index >= product.rating ? "orange" : "none"}
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
