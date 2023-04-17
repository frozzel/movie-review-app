import React from 'react'

export default function Submit({value}) {
  return (
  <input
    type="submit" 
    className="bg-white text-secondary hover:bg-opacity-90 transition font-semibold p-1 rounded w-full text-lg cursor-pointer " 
    value={value}
  />
  )
}
