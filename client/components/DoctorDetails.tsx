import React from 'react'
import MagicButton from './MagicButton'
import { FaLocationArrow } from 'react-icons/fa'
import { AppoitmentModal } from './AppointmentModal'

const DoctorDetails = () => {
  return (
    <div className="flex justify-around p-20 gap-5 md:flex-row flex-col">
      <div className="">
        <p className='flex-1 text-4xl font-bold'>Ghulam Mujtaba</p>
        <p className="mt-4">Contact:</p>
        <p className="text-gray-300 text-sm">email@gmail.com</p>
        <p className="text-gray-300 text-sm">0310-5402546</p>
        <p className="mt-2">Discription</p>
        <p className="text-gray-300 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus recusandae tempore alias, iste reiciendis optio. Alias voluptatibus libero voluptatum, quidem ex odio maiores, repellendus neque aspernatur animi quod, temporibus dicta?</p>
        <div className="mt-4">
          <p className="text-lg font-bold">Available Slots for Today</p>
          <div className='flex items-center gap-2'>
            <div className='bg-white-100 text-black-default p-2 hover:shadow-lg rounded-lg drop-shadow-lg cursor-pointer'>
              11-12
            </div>
            <div className='bg-white-100 text-black-default p-2 hover:shadow-lg rounded-lg drop-shadow-lg cursor-pointer'>
              11-12
            </div>
            <div className='bg-white-100 text-black-default p-2 hover:shadow-lg rounded-lg drop-shadow-lg cursor-pointer'>
              11-12
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <AppoitmentModal/>
        </div>
      </div>
      <div className=''>
        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="/" className='md:h-[500px] md:w-[500px] rounded-lg h-[150px] w-full md:object-cover object-contain'/>
      </div>

        
    </div>
  )
}

export default DoctorDetails