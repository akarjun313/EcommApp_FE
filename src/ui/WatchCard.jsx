import React from 'react'
import { Link } from 'react-router-dom'

export default function WatchCard({ imgSrc, title, description, productId }) {
    return (
        <Link to={`/product/${productId}`} className='block w-full sm:w-80'>
            <div className="card bg-base-100 w-80 h-96 shadow-xl">
                <figure className="px-10 pt-10">
                    <img
                        src={imgSrc}
                        alt={title}
                        className="rounded-xl object-cover h-60 w-auto" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </Link>
    )
}
