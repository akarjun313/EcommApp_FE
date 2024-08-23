import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { userAtom } from '../../logic/atoms'
import { baseUrl } from '../../baseURL/baseURL'




const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
}).required()


export default function AdminLoginPage() {


  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })


  const [user, setUser] = useRecoilState(userAtom)

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}/api/v1/admin/sign-in`, data, { withCredentials: true })

      if (res.data.success === true) {
        toast.success(res.data.message[0])
        setUser(res.data.message[1])
        if (res.data.message[1].role === 'admin') {
          navigate('/admin/home')
          console.log("Admin")
        } else {
          navigate('/admin/login')
          toast.error("Admin authentification failed, Try again")
        }
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error("Error in Signing In")
      console.log(error)
    }
  }


  return (
    <div className='h-screen flex justify-center items-center bg-[url("https://cdn.shopify.com/s/files/1/0639/1221/4745/files/custom_resized_219aa640-d808-4793-829f-d60c32f60661.jpg?v=1694506413&width=3000")] bg-center bg-no-repeat bg-cover'>
      <div className='w-[90%] h-[70%] md:w-[30rem] md:h-[40rem] lg:w-[25rem] lg:h-[30rem] flex flex-col justify-center items-center rounded-md shadow-md bg-base-100 bg-opacity-80'>
        <h2 className='flex absolute md:top-96 lg:top-56 top-48 font-bold text-3xl font-serif'>ADMIN</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='form-control w-full flex flex-col gap-6 px-6'>
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
            <input {...register("email")} type="text" className="grow" placeholder="Email" />
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

          <button type='submit' className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  )
}
