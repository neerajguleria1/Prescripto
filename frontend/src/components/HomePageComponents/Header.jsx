import React from 'react'
import { assets } from '../../assets/assets_frontend/assets'

export default function Header() {
    return (
        <div className='flex flex-col md:flex-row mt-5 flex-wrap gradient-bg rounded-2xl px-6 md:px-10 lg:px-20 shadow-2xl overflow-hidden relative'>
            
            {/* Decorative elements */}
            <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl'></div>

            {/* Left side */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[10vw] md:mb-[-30px] relative z-10 fade-in-up'>
                <div className='inline-block'>
                    <span className='bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm'>🏥 Trusted Healthcare Platform</span>
                </div>
                <h1 className='text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight md:leading-tight lg:leading-tight'>
                    Book Appointment <br /> 
                    <span className='text-yellow-300'>With Trusted</span> Doctors
                </h1>
                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light bg-white/10 backdrop-blur-sm rounded-xl p-4'>
                    <img className='w-28 float-animation' src={assets.group_profiles} alt="" />
                    <p className='leading-relaxed'>Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block' />schedule your appointment hassle-free.</p>
                </div>
                <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-4 rounded-full text-[#5f6FFF] text-sm font-semibold m-auto md:m-0 hover:scale-105 hover:shadow-2xl transition-all duration-300 group'>
                    Book Appointment 
                    <img className='w-3 group-hover:translate-x-1 transition-transform duration-300' src={assets.arrow_icon} alt="" />
                </a>
            </div>

            {/* Right side */}
            <div className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-lg hover:scale-105 transition-transform duration-500' src={assets.header_img} alt="" />
            </div>

        </div>
    )
}
