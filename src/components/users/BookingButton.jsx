import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { baseUrl } from '../../baseURL/baseURL'
import 'https://checkout.razorpay.com/v1/checkout.js'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'
import { cartReloadAfterBooking } from '../../logic/atoms'


const schema = yup.object().shape({
    addressDetail: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    landmark: yup.string().required("Landmark is required"),
    pincode: yup.string().required("Pincode is required").matches(/^[0-9]+$/, "Must be only digits").min(6, 'Must be exactly 6 digits').max(6, 'Must be exactly 6 digits'),
    phone: yup.string().required("Phone number is required").matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
})

export default function BookingButton({ amount, cId }) {

    const setCartReload = useSetRecoilState(cartReloadAfterBooking)

    const [showForm, setShowForm] = useState(false)


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const paymentHandler = async (data, amount, cId) => {
        const response = await axios.post(`${baseUrl}/api/v1/user/booking`, { amount }, { withCredentials: true })

        const order = response.data.data

        const option = {
            key: import.meta.env.RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Timeluxe',
            description: 'Sample text payment',
            image: "https://example.com/your_logo",
            order_id: order.id,
            handler: async function (response) {
                const body = { ...response }
                console.log("reached top of verification link")
                const validateResponse = await axios.post(`${baseUrl}/api/v1/user/verify-payment`, { body, data, cId }, { withCredentials: true })

                const res = validateResponse
                toast.success(res.data.message)

                // reload cart page 
                setCartReload(true)

            },
            prefill: {
                name: "Arjun",
                email: "arjun@gmail.com.com",
                contact: "000000",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        }
        const rzp1 = new window.Razorpay(option);

        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
        });

        rzp1.open();
        // e.preventDefault();
    }


    const onSubmit = (data) => {
        // Close the form and initiate the payment process
        setShowForm(false);
        paymentHandler(data, amount, cId);
    };

    return (
        <>
            <button
                className="btn btn-info btn-xs"
                onClick={() => setShowForm(true)}
            >
                Buy
            </button>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">Address</label>
                                <input type="text" {...register("addressDetail")} className="input input-bordered" />
                                {errors.addressDetail && <span className="text-red-500">{errors.addressDetail.message}</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">City</label>
                                <input type="text" {...register("city")} className="input input-bordered" />
                                {errors.city && <span className="text-red-500">{errors.city.message}</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">State</label>
                                <input type="text" {...register("state")} className="input input-bordered" />
                                {errors.state && <span className="text-red-500">{errors.state.message}</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">Landmark</label>
                                <input type="text" {...register("landmark")} className="input input-bordered" />
                                {errors.landmark && <span className="text-red-500">{errors.landmark.message}</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">Pincode</label>
                                <input type="text" {...register("pincode")} className="input input-bordered" />
                                {errors.pincode && <span className="text-red-500">{errors.pincode.message}</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">Phone</label>
                                <input type="text" {...register("phone")} className="input input-bordered" />
                                {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                            </div>

                            <div className="modal-action mt-4 flex justify-end">
                                <button type="submit" className="btn btn-primary">Make Payment</button>
                                <button type="button" className="btn ml-2" onClick={() => setShowForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>

            )}
        </>
    )
}
