import axios from 'axios'
import React, { useState } from 'react'
import { baseUrl } from '../../baseURL/baseURL'
import { toast } from 'react-toastify'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export default function AddProductBtn() {

    const [clicked, setClicked] = useState(false)


    // Validation schema using Yup
    const schema = yup.object().shape({
        brand: yup.string().required('Brand is required'),
        model: yup.string().required('Model is required'),
        price: yup.number().required('Price is required').positive('Price must be positive'),
        stock: yup.number().required('Stock is required').integer('Stock must be an integer').min(1, 'Stock cannot be negative value or zero'),
        usedFor: yup.string().required('Used For is required'),
        category: yup.string().required('Category is required'),
        occassion: yup.string().required('Occasion is required'),
        warranty: yup.number().required('Warranty is required').max(5, 'Maximum input is 5').min(1, 'Minimum input is 1'),
        description: yup.string().required('Description is required'),
        images: yup.mixed().required('Images are required').test('fileCount', 'You can upload up to 6 images', value => value && value.length <= 6)
    })

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        try {
            console.log("hitted onSubmit")
            const formData = new FormData()
            formData.append('brand', data.brand)
            formData.append('model', data.model)
            formData.append('price', data.price)
            formData.append('stock', data.stock)
            formData.append('usedFor', data.usedFor)
            formData.append('category', data.category)
            formData.append('occassion', data.occassion)
            formData.append('warranty', data.warranty)
            formData.append('description', data.description)

            const images = data.images instanceof FileList ? Array.from(data.images) : []
            if (images.length === 0) {
                toast.error('Please select at least one image.')
                return
            }
            if (images.length > 6) {
                toast.error('You can only upload up to 6 images.')
                return
            }

            images.forEach((file) => {
                formData.append('images', file)
            })

            console.log(formData)
            const res = await axios.post(`${baseUrl}/api/v1/seller/add-product`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res.data.success === true) {
                toast.success(res.data.message)
                setClicked(false)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error in adding product", error)
            toast.error("Error in adding product")
        }
    }


    return (
        <>
            <button
                onClick={() => setClicked(true)}
                className='btn btn-info'
            >
                Add Product
            </button>
            {clicked && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl overflow-auto max-h-[90vh]">
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label>Brand</label>
                                    <input type="text" {...register('brand')} className="input input-bordered w-full" />
                                    {errors.brand && <p className="text-red-500 text-xs">{errors.brand.message}</p>}
                                </div>

                                <div>
                                    <label>Model</label>
                                    <input type="text" {...register('model')} className="input input-bordered w-full" />
                                    {errors.model && <p className="text-red-500 text-xs">{errors.model.message}</p>}
                                </div>

                                <div>
                                    <label>Price</label>
                                    <input type="number" {...register('price')} className="input input-bordered w-full" />
                                    {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
                                </div>

                                <div>
                                    <label>Stock</label>
                                    <input type="number" {...register('stock')} className="input input-bordered w-full" />
                                    {errors.stock && <p className="text-red-500 text-xs">{errors.stock.message}</p>}
                                </div>

                                <div>
                                    <label>Used For</label>
                                    <select {...register('usedFor')} className="select select-bordered w-full">
                                        <option value="">Select...</option>
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                        <option value="kids">Kids</option>
                                        <option value="unisex">Unisex</option>
                                    </select>
                                    {errors.usedFor && <p className="text-red-500 text-xs">{errors.usedFor.message}</p>}
                                </div>

                                <div>
                                    <label>Category</label>
                                    <select {...register('category')} className="select select-bordered w-full">
                                        <option value="">Select...</option>
                                        <option value="smart watch">Smart Watch</option>
                                        <option value="analog">Analog</option>
                                        <option value="digital">Digital</option>
                                        <option value="analog-digital">Analog-Digital</option>
                                    </select>
                                    {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
                                </div>

                                <div>
                                    <label>Occasion</label>
                                    <select {...register('occassion')} className="select select-bordered w-full">
                                        <option value="">Select...</option>
                                        <option value="casual">Casual</option>
                                        <option value="formal">Formal</option>
                                        <option value="party">Party</option>
                                        <option value="sporty">Sporty</option>
                                        <option value="sport">Sport</option>
                                        <option value="casual-sport">Casual-Sport</option>
                                        <option value="casual-formal">Casual-Formal</option>
                                        <option value="casual-party">Casual-Party</option>
                                        <option value="formal-party">Formal-Party</option>
                                    </select>
                                    {errors.occassion && <p className="text-red-500 text-xs">{errors.occassion.message}</p>}
                                </div>

                                <div>
                                    <label>Warranty</label>
                                    <input type="text" {...register('warranty')} className="input input-bordered w-full" />
                                    {errors.warranty && <p className="text-red-500 text-xs">{errors.warranty.message}</p>}
                                </div>

                                <div>
                                    <label>Description</label>
                                    <textarea {...register('description')} className="textarea textarea-bordered w-full"></textarea>
                                    {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                                </div>

                                <div>
                                    <label>Images</label>
                                    <Controller
                                        name="images"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => {
                                                    // Ensure files are passed as a FileList
                                                    onChange(e.target.files)
                                                }}
                                                onBlur={onBlur}
                                                className="file-input file-input-bordered w-full"
                                            />
                                        )}
                                    />
                                    {errors.images && <p className="text-red-500 text-xs">{errors.images.message}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => setClicked(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
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
