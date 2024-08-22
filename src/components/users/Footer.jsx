import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    {/* Company Info */}
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-semibold mb-2">Company Name</h2>
                        <p className="text-sm">1234 Street Name, City, State, 56789</p>
                        <p className="text-sm">Phone: +1 (234) 567-890</p>
                        <p className="text-sm">Email: support@example.com</p>
                    </div>

                    {/* Links */}
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
                        <ul>
                            <li><a href="/" className="hover:underline">Home</a></li>
                            <li><a href="/about" className="hover:underline">About Us</a></li>
                            <li><a href="/services" className="hover:underline">Services</a></li>
                            <li><a href="/contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="flex gap-4">
                        <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-400">
                            <FaFacebookF size={24} />
                        </a>
                        <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400">
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://linkedin.com/in/yourpage" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-600">
                            <FaLinkedinIn size={24} />
                        </a>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
