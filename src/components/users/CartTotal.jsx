import React from 'react'

export default function CartTotal({ qty, price }) {
  return (
    <div className='bg-neutral flex flex-col md:flex-row justify-between rounded-md mx-3 h-20 items-center px-6'>
        <div className='flex gap-4'>
            <h6 className='text-neutral-content font-semibold text-2xl lg:text-3xl font-serif'>Total items :</h6>
            <span className='text-neutral-content font-semibold text-2xl lg:text-3xl font-mono'>{qty}</span>
        </div>

        <div className='flex gap-4'>
            <h6 className='text-neutral-content font-semibold text-2xl lg:text-3xl font-serif'>Total price :</h6>
            <span className='text-neutral-content font-semibold text-2xl lg:text-3xl font-mono'>{price}Rs</span>
        </div>
    </div>
  )
}