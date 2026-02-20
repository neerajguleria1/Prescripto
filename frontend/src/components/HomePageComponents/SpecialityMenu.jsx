import React from 'react'
import { specialityData } from '../../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

export default function SpecialityMenu() {
  return (
    <div className='flex flex-col items-center gap-6 py-20 text-gray-800' id='speciality'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold gradient-text mb-3'>Find by Speciality</h1>
        <p className='sm:w-2/3 mx-auto text-gray-600 text-base'>Browse through our extensive list of trusted doctors across various specialities</p>
      </div>
      <div className='flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto pb-4 px-4'>
        {specialityData.map((item, index) => (
            <Link 
              onClick={() => scrollTo(0,0)} 
              className='flex flex-col items-center text-sm cursor-pointer flex-shrink-0 group' 
              key={index} 
              to={`/doctors/${item.speciality}`}
            >
                <div className='w-20 h-20 sm:w-28 sm:h-28 mb-3 rounded-2xl bg-gradient-to-br from-[#5f6FFF]/10 to-[#7a88ff]/10 flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 border-2 border-transparent group-hover:border-[#5f6FFF]'>
                  <img className='w-12 sm:w-16' src={item.image} alt="" />
                </div>
                <p className='font-medium text-gray-700 group-hover:text-[#5f6FFF] transition-colors'>{item.speciality}</p>
            </Link>
        ))}
      </div>
    </div>
  )
}
