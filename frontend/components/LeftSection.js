import React from 'react'

function LeftSection({children}) {
  return (
    <div className="flex flex-col items-center h-full justify-center text-left w-full">
        {children}
    </div>
  )
}

export default LeftSection