import React from 'react'

const Alert = ({ message }) => {
  return (
    <div className="bg-blue-100 border border-blue-400 mt-4 text-blue-700 px-4 py-3 rounded relative w-80 mx-auto" role="alert">
        <span className="block sm:inline">{message}</span>
    </div>
  )
}

export default Alert