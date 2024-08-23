import React from 'react'
import { Link } from 'react-router-dom'

export default function CustomerServicePage() {
    return (
        <div className="container mx-auto px-4 py-8 h-lvh">
            <h1 className="text-3xl font-semibold mb-4">Customer Service</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                <p className="mb-2">
                    <strong>Phone:</strong> +1 (234) 567-890
                </p>
                <p className="mb-2">
                    <strong>Email:</strong> support@example.com
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
                <div className="flex gap-4">
                    <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Facebook
                    </a>
                    <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        Twitter
                    </a>
                    <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">
                        Instagram
                    </a>
                    <a href="https://linkedin.com/in/yourpage" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline">
                        LinkedIn
                    </a>
                </div>
            </div>
            <div>
                <Link to={'/admin/login'} className="text-blue-500 hover:underline">Admin &gt;&gt;&gt;</Link>
            </div>
        </div>
    )
}
