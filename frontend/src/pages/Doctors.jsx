import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/exportAppContext';
import { useCallback } from 'react';

const Doctors = () => {

  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const applyFilter = useCallback(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((item) => item.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter])

  const filterSearch = filterDoc.filter(doc => {
    const searchLower = search.toLowerCase();

    return (
      doc.name.toLowerCase().includes(searchLower) ||
      String(doc.rating).includes(searchLower)
    )
  })

  const specialities = [
    { name: 'General physician', icon: '🩺' },
    { name: 'Gynecologist', icon: '👶' },
    { name: 'Dermatologist', icon: '💆' },
    { name: 'Pediatricians', icon: '👨‍⚕️' },
    { name: 'Neurologist', icon: '🧠' },
    { name: 'Gastroenterologist', icon: '🫀' }
  ];

  return (
    <div className='mt-5 fade-in-up'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold gradient-text mb-2'>Find Your Doctor</h1>
        <p className='text-gray-600'>Browse through our specialist doctors and book your appointment</p>
      </div>

      {/* Search Input */}
      <div className='mb-6'>
        <input
          type="text"
          placeholder="🔍 Search by doctor name or rating... "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm border-2 border-gray-200 rounded-xl px-6 py-3 w-full md:w-96 focus:outline-none focus:border-[#5f6FFF] transition-all duration-300 shadow-sm"
        />
      </div>

      <div className='flex flex-col sm:flex-row items-start gap-8 mt-5'>
        <button className={`py-2 px-6 border-2 rounded-xl text-sm transition-all cursor-pointer sm:hidden font-medium ${showFilters ? 'bg-[#5f6FFF] text-white border-[#5f6FFF]' : 'border-gray-300'}`} onClick={() => setShowFilters((prev) => !prev)}>Filters</button>
        
        <div className={`flex-col gap-3 text-sm ${showFilters ? 'flex' : 'hidden sm:flex'} min-w-[250px]`}>
          <h3 className='font-semibold text-gray-800 mb-2'>Specialities</h3>
          {
            specialities.map((spec, index) => (
              <div 
                key={index}
                onClick={() => speciality === spec.name ? navigate('/doctors') : navigate(`/doctors/${spec.name}`)} 
                className={`w-full pl-4 py-3 pr-6 border-2 rounded-xl transition-all cursor-pointer hover:scale-105 hover:shadow-md ${
                  speciality === spec.name 
                    ? "gradient-bg text-white border-[#5f6FFF] shadow-lg" 
                    : "border-gray-200 hover:border-[#5f6FFF]"
                }`}
              >
                <span className='mr-2'>{spec.icon}</span>
                {spec.name}
              </div>
            ))
          }
        </div>

        {/* Show spinner if doctors not loaded */}
        {!doctors || doctors.length === 0 ? (
          <div className="flex justify-center items-center w-full h-64 mt-10">
            <div className="btn-spinner2">
              <p style={{ marginBottom: '40px', textAlign: 'center' }}>Please wait ! <br />While backend is Connecting from Render.</p>
              <div style={{marginLeft: '100px'}} className="spinner"></div>
            </div>
          </div>
        ) : (
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {
              filterSearch.map((item, index) => (
                <div 
                  onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                  className='border-2 border-gray-200 rounded-2xl overflow-hidden cursor-pointer card-hover bg-white shadow-sm' 
                  key={index}
                >
                  <div className='relative overflow-hidden'>
                    <img className='w-full h-64 object-cover hover:scale-110 transition-transform duration-500' src={item.image} alt="" />
                    <div className='absolute top-3 right-3'>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item?.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        {item?.available ? '✓ Available' : '✗ Unavailable'}
                      </span>
                    </div>
                  </div>
                  <div className='p-5'>
                    <h3 className='text-gray-900 text-lg font-bold mb-1'>{item.name}</h3>
                    <p className='text-[#5f6FFF] text-sm font-medium mb-2'>{item.speciality}</p>
                    <div className='flex items-center gap-1'>
                      <span className='text-yellow-500'>⭐</span>
                      <span className='text-gray-700 font-semibold'>{item?.rating}</span>
                      <span className='text-gray-500 text-sm'>/5</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </div>

    </div>
  )
}

export default Doctors
