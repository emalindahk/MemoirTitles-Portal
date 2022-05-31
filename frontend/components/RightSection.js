import React from 'react'

function RightSection({children}) {
  return (
    <div className="w-full bg-gradient-to-br from-red-200 via-red-300 to-yellow-200
    h-full flex flex-col justify-center ">
        {children}
    </div>
  )
}

export default RightSection