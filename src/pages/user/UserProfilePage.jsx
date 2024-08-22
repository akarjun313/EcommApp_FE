import React from 'react'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../../logic/atoms'

export default function UserProfilePage() {

    const user = useRecoilValue(userAtom)
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">First Name:</h2>
                    <p className="text-gray-700">{user.firstName}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Last Name:</h2>
                    <p className="text-gray-700">{user.lastName}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Email:</h2>
                    <p className="text-gray-700">{user.email}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Phone:</h2>
                    <p className="text-gray-700">{user.phone}</p>
                </div>
            </div>
        </div>
    )
}
