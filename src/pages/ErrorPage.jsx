import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
                <p className="text-lg mt-2">The page you are looking for does not exist.</p>
                <p className="text-gray-500">Error 404</p>
                <Link to={'/'} className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Go Home</Link>
            </div>
        </div>
    )
}
