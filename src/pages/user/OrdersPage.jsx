import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { baseUrl } from '../../baseURL/baseURL'
import ReviewButton from '../../components/users/ReviewButton'

export default function OrdersPage() {

    const [bookings, setBookings] = useState([])
    const [expanded, setExpanded] = useState({})

    const fetchBookings = async () => {
        try {

            const res = await axios.get(`${baseUrl}/api/v1/user/my-orders`, { withCredentials: true })
            console.log(res)
            if (res.data.success === true) {
                setBookings(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error in fetching bookings", error)
            toast.error("Error in fetching bookings")
        }
    }

    useEffect(() => {
        fetchBookings()
    }, [])

    const handleToggle = (index) => {
        setExpanded(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <div className='h-lvh'>
            {(bookings === null || bookings.length === 0) ? (
                <div className="text-center py-8">No Orders Yet</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Amount paid</th>
                                <th>Seller</th>
                                <th>Order status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {bookings.map((booking, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={booking.product.image[0]}
                                                            alt="Product image"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{booking.product.model}</div>
                                                    <div className="text-sm opacity-50">{booking.product.brand}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{booking.quantity}</p>
                                        </td>
                                        <td>
                                            <p>{booking.totalPrice}</p>
                                        </td>
                                        <td>
                                            {`${booking.seller.firstName} ${booking.seller.lastName}`}
                                        </td>
                                        <td>
                                            {booking.status}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-xs"
                                                onClick={() => handleToggle(index)}
                                            >
                                                {expanded[index] ? 'Less' : 'More'}
                                            </button>
                                        </td>
                                        <td>
                                            {booking.status === 'Delivered' && (
                                                
                                                <ReviewButton bId={booking._id}/>
                                            )}
                                        </td>
                                    </tr>
                                    {expanded[index] && (
                                        <tr>
                                            <td colSpan="6">
                                                <div className="p-4 border-t border-gray-200">
                                                    <div className="flex justify-between mb-2">
                                                        <div><strong>Address:</strong> {booking.address.addressDetail}</div>
                                                        <div><strong>Landmark:</strong> {booking.address.landmark}</div>
                                                    </div>
                                                    <div className="flex justify-between mb-2">
                                                        <div><strong>City:</strong> {booking.address.city}</div>
                                                        <div><strong>State:</strong> {booking.address.state}</div>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <div><strong>Pincode:</strong> {booking.address.pincode}</div>
                                                        <div><strong>Additional Phone:</strong> {booking.address.phone}</div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
