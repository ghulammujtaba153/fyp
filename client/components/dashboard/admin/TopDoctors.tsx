import React from 'react'

const TopDoctors = () => {
  return (
    <div className='Flex flex-col gap-4 w-full p-2 shadow-xl rounded-lg bg-white'>
        <h2>Top Doctors</h2>
        <div className='w-full h-[1px] bg-gray-400'></div>
        <div className='flex flex-col p-2 gap-4'>
            <div className='flex gap-4 items-center'>
                <img src="Laboratory.png" alt="doctor" className='w-[50px] h-[50px] rounded-full' />
                <p>Dr. John Doe</p>
            </div>
            <div className='w-full h-[1px] bg-gray-400'></div>
        </div>
        <div className='flex flex-col p-2 gap-4'>
            <div className='flex gap-4 items-center'>
                <img src="Laboratory.png" alt="doctor" className='w-[50px] h-[50px] rounded-full' />
                <p>Dr. John Doe</p>
            </div>
            <div className='w-full h-[1px] bg-gray-400'></div>
        </div>

    </div>
  )
}

export default TopDoctors