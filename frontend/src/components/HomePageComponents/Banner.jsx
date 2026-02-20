import React from 'react'
import { assets } from '../../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

export default function Banner() {

    const navigate = useNavigate();

  return (
    <div className='relative gradient-bg rounded-3xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 overflow-hidden shadow-2xl'>
      
      {/* Decorative elements */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl'></div>

      <div className='flex items-center relative z-10'>
        {/* left  */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
              <div className='space-y-4'>
                  <div className='inline-block'>
                      <span className='bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm'>👨‍⚕️ 100+ Trusted Doctors</span>
                  </div>
                  <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
                      Book Appointment
                  </h2>
                  <p className='text-xl sm:text-2xl md:text-3xl text-white/90 font-medium'>
                      With Expert Healthcare Professionals
                  </p>
                  <p className='text-white/80 text-sm sm:text-base max-w-md'>
                      Get instant access to qualified doctors and schedule your appointments hassle-free
                  </p>
              </div>
              <button 
                  onClick={() => {navigate('/login'), scrollTo(0,0)}} 
                  className='bg-white text-[#5f6FFF] text-sm sm:text-base font-semibold px-8 py-4 rounded-xl mt-8 hover:scale-105 hover:shadow-2xl transition-all duration-300 group'
              >
                  Create Account 
                  <span className='inline-block group-hover:translate-x-1 transition-transform duration-300'>→</span>
              </button>
        </div>

        {/* right  */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
              <img className='w-full absolute bottom-0 right-0 max-w-md hover:scale-105 transition-transform duration-500' src={assets.appointment_img} alt="" />
        </div>
      </div>

    </div>
  )
}
