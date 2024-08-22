import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from 'react-toastify'
import axios from 'axios'
import { baseUrl } from '../baseURL/baseURL.js'


const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().positive().integer().required(),
    password: yup.string().min(6).required(),
    role: yup.string().required()
}).required()

export default function SignUpPage() {

    const navigate = useNavigate()

    const {
      register,
      handleSubmit,
    } = useForm({ resolver: yupResolver(schema) })


    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${baseUrl}/api/v1/user/signup`, data, { withCredentials: true })

            if(res.data.success === true){
                toast.success(res.data.message)
                navigate('/login')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("error in user Sign-up", error)
            toast.error("Error in Signing Up")
        }
    }



    return (
        <div className='h-screen flex justify-center items-center bg-[url("https://cdn.shopify.com/s/files/1/0639/1221/4745/files/custom_resized_219aa640-d808-4793-829f-d60c32f60661.jpg?v=1694506413&width=3000")] bg-center bg-no-repeat bg-cover'>
            <div className='w-[90%] h-[90%] md:w-[30rem] md:h-[40rem] lg:w-[25rem] lg:h-[40rem] flex flex-col justify-center items-center rounded-md shadow-md bg-base-100 bg-opacity-80 overflow-auto'>

                <form onSubmit={handleSubmit(onSubmit)} className='form-control w-full flex flex-col gap-6 px-6'>

                    {/* FIRST NAME  */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input {...register("firstName")} type="text" className="grow" placeholder="First Name" />
                    </label>

                    {/* LAST NAME  */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input {...register("lastName")} type="text" className="grow" placeholder="Last Name" />
                    </label>

                    {/* E-MAIL  */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input {...register("email")} type="email" className="grow" placeholder="Email" />
                    </label>

                    {/* PHONE  */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="size-4">
                            <path
                                fillRule="evenodd" d="m3.855 7.286 1.067-.534a1 1 0 0 0 .542-1.046l-.44-2.858A1 1 0 0 0 4.036 2H3a1 1 0 0 0-1 1v2c0 .709.082 1.4.238 2.062a9.012 9.012 0 0 0 6.7 6.7A9.024 9.024 0 0 0 11 14h2a1 1 0 0 0 1-1v-1.036a1 1 0 0 0-.848-.988l-2.858-.44a1 1 0 0 0-1.046.542l-.534 1.067a7.52 7.52 0 0 1-4.86-4.859Z" clipRule="evenodd" />
                        </svg>
                        <input {...register("phone")} type="tel" className="grow" placeholder="Phone" />
                    </label>

                    {/* PASSWORD  */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input {...register("password")} type="password" className="grow" placeholder='Password' />
                    </label>


                    {/* RADIO BUTTON  */}
                    <div className='flex flex-col gap-0'>
                    <div className='flex items-center'>
                        <input
                            type="radio"
                            id="user"
                            name="option"
                            value="user"
                            {...register("role", { required: true })}
                            className='cursor-pointer radio-sm'
                        />
                        <label htmlFor="user" className='ml-2 text-base-content'>For normal use</label>
                    </div>
                    <div className='flex items-center mt-2'>
                        <input
                            type="radio"
                            id="seller"
                            name="option"
                            value="seller"
                            {...register("role", { required: true })}
                            className='cursor-pointer radio-sm'
                        />
                        <label htmlFor="seller" className='ml-2 text-base-content'>For business purpose</label>
                    </div>
                    </div>

                    <button type='submit' className="btn btn-primary">Register</button>
                </form>
                <p className='text-sm mt-10 text-base-content'>Already have an account ? <Link className='link underline-offset-2' to="/login">Sign-In</Link></p>
            </div>
        </div>
    )
}


