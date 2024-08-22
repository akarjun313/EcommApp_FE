import React from 'react'

export default function Dashboard({ title, value, description }) {
    return (
        <div className='px-4 md:px-10 lg:px-20'>
            <div className="bg-warning shadow-md rounded-lg p-6 w-80 h-48 flex flex-col justify-between items-center">
                <div className='flex flex-col items-center'>
                    <h3 className="text-lg font-semibold text-warning-content mb-2">{title}</h3>
                    <p className="text-4xl font-bold text-warning-content font-mono">{value}</p>
                </div>
                {description && <p className="text-sm mt-2">{description}</p>}
            </div>
        </div>
    )
}
