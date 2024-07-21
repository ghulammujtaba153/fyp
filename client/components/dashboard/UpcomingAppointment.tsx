import React from 'react'

const UpcomingAppointment = () => {
  return (
    <div className='flex flex-col justify-center bg-white-100 rounded-md w-full items-center p-4'>
        <p className='font-bold text-lg'>Upcoming Appointment</p>
        <div className='flex justify-center items-center gap-[40px]'>
            <div className='flex items-center gap-2'>
                <img src="https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="/"  className='w-[50px] h-[50px] rounded-full'/>
                <p className='font-bold'>Ali Akbar</p>

            </div>
            
            <p>Appoitment At: <span>2 Aug, 2021 11:20 PM</span></p>
        </div>
    </div>
  )
}

export default UpcomingAppointment