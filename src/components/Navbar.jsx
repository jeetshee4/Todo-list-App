import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar bg-violet-900 flex justify-between  items-center">
        <div className="navbar__logo font-extrabold text-white mx-20 text-2xl py-2">taskBuddy</div>
        <div className="routes py-2">
            <ul className='flex gap-7 mx-20 text-white'>
               <li className='hover:scale-110 hover:font-bold'>Home</li>
               <li className='hover:scale-110 hover:font-bold'>Your Tasks</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar