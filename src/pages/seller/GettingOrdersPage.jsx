import React, { useState, useEffect } from 'react'
import { baseUrl } from '../../baseURL/baseURL'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function GettingOrdersPage() {

    const [bookings, setBookings] = useState([])
    const [expanded, setExpanded] = useState({})
    const [status, setStatus] = useState({})

    const fetchBookings = async () => {
        try {

            const res = await axios.get(`${baseUrl}/api/v1/seller/orders`, { withCredentials: true })
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



    const handleSave = async (index) => {
        try {
            const res = await axios.patch(`${baseUrl}/api/v1/seller/change-order-status/${bookings[index]._id}`, { status: status[index] }, { withCredentials: true })

            if (res.data.success === true) {
                toast.success(res.data.message)
                fetchBookings()
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error in updating order status", error)
            toast.error("Error in updating order status")
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

    const handleStatusChange = (index, value) => {
        setStatus(prev => ({
            ...prev,
            [index]: value
        }))
    }

    return (
        <div className='h-lvh'>
            {(bookings === null || bookings.length === 0) ? (
                <div className="text-center py-8">No Orders Yet</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
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
                                            {`${booking.buyer.firstName} ${booking.buyer.lastName}`}
                                        </td>
                                        <td>
                                            <select
                                                value={status[index] || booking.status}
                                                onChange={(e) => handleStatusChange(index, e.target.value)}
                                                className="select select-bordered"
                                            >
                                                <option value="In-transit">In-transit</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                                <option value="Pending">Pending</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-xs"
                                                onClick={() => handleToggle(index)}
                                            >
                                                {expanded[index] ? 'Less' : 'More'}
                                            </button>
                                            {expanded[index] && (
                                                <button
                                                    className="btn btn-success btn-xs ml-2"
                                                    onClick={() => handleSave(index)}
                                                >
                                                    Save
                                                </button>
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
