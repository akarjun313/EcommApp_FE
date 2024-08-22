import axios from 'axios'
import React, { useState } from 'react'
import { baseUrl } from '../../baseURL/baseURL'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
    rating: yup.number().required("Rating is required").min(1).max(5),
    review: yup.string().required("Review is required").min(5, "Review should be at least 5 characters long"),
})

export default function ReviewButton({ bId }) {

    const [showForm, setShowForm] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })


    const addReview = async (data) => {
        try {
            const res = await axios.post(`${baseUrl}/api/v1/user/add-review/${bId}`, { data }, { withCredentials: true })
            if (res.data.success === true) {
                toast.success(res.data.message)
                setShowForm(false)
                reset()
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error in adding review", error)
            toast.error("Error in adding review")
        }
    }


    return (
        <>
            <button
                type='button'
                className='btn btn-xs btn-info'
                onClick={()=>setShowForm(true)}
            >
                Add Review
            </button>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-80">
                        <form onSubmit={handleSubmit(addReview)}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Rating
                                </label>
                                <div className="rating">
                                    <input
                                        type="radio"
                                        {...register('rating')}
                                        value="1"
                                        className="mask mask-star-2 bg-orange-400"
                                    />
                                    <input
                                        type="radio"
                                        {...register('rating')}
                                        value="2"
                                        className="mask mask-star-2 bg-orange-400"
                                    />
                                    <input
                                        type="radio"
                                        {...register('rating')}
                                        value="3"
                                        className="mask mask-star-2 bg-orange-400"
                                    />
                                    <input
                                        type="radio"
                                        {...register('rating')}
                                        value="4"
                                        className="mask mask-star-2 bg-orange-400"
                                    />
                                    <input
                                        type="radio"
                                        {...register('rating')}
                                        value="5"
                                        className="mask mask-star-2 bg-orange-400"
                                    />
                                </div>
                                {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Review</label>
                                <textarea
                                    {...register('review')}
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Write your review"
                                />
                                <p className="text-red-500 text-xs mt-1">{errors.review?.message}</p>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="btn btn-secondary mr-2"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
