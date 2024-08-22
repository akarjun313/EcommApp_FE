import React from 'react'
import videoClip from '../../assets/watch_carousal_clip.mp4'

export default function Carousal() {
  return (
    <div
        className='flex items-center justify-center overflow-hidden mb-20 lg:mb-32'
    >
        <video 
            src={videoClip}
            autoPlay 
            loop 
            muted 
            onError={(e) => console.error('Error loading video:', e)}
            className='min-h-full w-full'
        />
    </div>
  )
}