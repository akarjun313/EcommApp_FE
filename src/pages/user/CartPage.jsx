import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../baseURL/baseURL'
import { toast } from 'react-toastify'
import BookingButton from '../../components/users/BookingButton'
import { useRecoilState } from 'recoil'
import { cartReloadAfterBooking } from '../../logic/atoms'
import CartTotal from '../../components/users/CartTotal'

export default function CartPage() {

    const [reloadCart, setReloadCart] = useRecoilState(cartReloadAfterBooking)

    //user details here
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchCart = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/user/cart`, { withCredentials: true })
            if (res.data.success === true) {
                const products = await Promise.all(
                    res.data.message.map(async item => {
                        const productRes = await axios.get(`${baseUrl}/api/v1/user/product/${item.product}`, { withCredentials: true })
                        return { ...item, product: productRes.data.message }

                    })
                )
                setCartItems(products)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error in displaying cart", error)
            toast.error("Error in displaying cart")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const handleDelete = async (cartId) => {
        try {
            const res = await axios.delete(`${baseUrl}/api/v1/user/delete-cart/${cartId}`, { withCredentials: true })
            if (res.data.success === true) {
                toast.success(res.data.message)
                fetchCart()
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error in deleting item from cart", error)
            toast.error("Error in deleting item from cart")
        }
    }

    const handleProductQuantity = async (cartId, pQuantity) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${baseUrl}/api/v1/user/edit-cart/${cartId}`, { quantity: pQuantity }, { withCredentials: true })
            if (res.data.success === true) {
                toast.success(res.data.message)
                fetchCart()
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error in managing quantity of the product", error)
            toast.error("Error in managing quantity of the product")
        }
    }


    const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

    if (loading) {
        return <div className="text-center py-8">Loading...</div>
    }

    return (
        <div className='h-lvh overflow-hidden'>

            {(cartItems.length <= 0) ?
                (<div className='text-center py-8 font-semibold text-4xl'>CART EMPTY</div>)
                : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {cartItems.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={item.product.image[0]}
                                                            alt={item.product.model}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{item.product.model}</div>
                                                    <div className="text-sm opacity-50">{item.product.brand}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                min="1"
                                                max="5"
                                                value={item.quantity}
                                                onChange={(e) => handleProductQuantity(item._id, e.target.value)}
                                                className="input input-bordered w-20"
                                            // 
                                            />
                                        </td>
                                        <td>{item.product.price * item.quantity}</td>
                                        <th>
                                            <BookingButton amount={item.product.price*item.quantity} cId={item._id}/>
                                        </th>
                                        <th>
                                            <button
                                                className="btn btn-error btn-xs"
                                                onClick={() => handleDelete(item._id)}
                                            >
                                                Delete
                                            </button>
                                        </th>
                                    </tr>
                                ))}

                            </tbody>
                            {/* foot */}
                            <tfoot>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
                { cartItems.length > 0 && 
                    <CartTotal qty={cartItems.length} price={totalPrice}/>
                }
        </div>
    )
}
