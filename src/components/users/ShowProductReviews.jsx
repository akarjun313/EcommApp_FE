import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../baseURL/baseURL'
import { toast } from 'react-toastify'

export default function ShowProductReviews() {

    // product id here 
    const { id } = useParams()

    const [reviews, setReviews] = useState([])

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/user/show-reviews/${id}`, { withCredentials: true })
            console.log(res.data.message)
            if (res.data.success === true) {
                setReviews(res.data.message)
            }
        } catch (error) {
            console.log("Error in showing product review", error)
            toast.error("Error in showing product review")
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    //Loading state
    // if (!reviews) {
    //     return <div className='text-center py-8'>Loading...</div>
    // }


    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>
            {reviews.length === 0 ? (
                <p className="text-center text-lg">No reviews available for this product.</p>
            ) : (
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="border p-4 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold">{review.user.firstName}</h3>
                                <div className="flex items-center">

                                    {Array(review.rating).fill(0).map((_, index) => (
                                        <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="size-6">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                        </svg>
                                    ))}

                                </div>
                            </div>
                            <p className="text-gray-700">{review.review}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
