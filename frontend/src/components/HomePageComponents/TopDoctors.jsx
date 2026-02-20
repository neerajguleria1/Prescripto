import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/exportAppContext'

export default function TopDoctors() {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext);

    const [search, setSearch] = useState("");

    const filteredDoctors = doctors.filter(doc => {
        const searchLower = search.toLowerCase();
        return (
            doc.name.toLowerCase().includes(searchLower) ||
            String(doc.rating).includes(searchLower)
        )
    }).slice(0, 10);

    return (
        <div className='flex flex-col items-center gap-6 my-20 text-gray-900 md:mx-10'>
            <div className='text-center'>
                <h1 className='text-4xl font-bold gradient-text mb-3'>Top Doctors to Book</h1>
                <p className='sm:w-2/3 mx-auto text-gray-600 text-base'>
                    Browse through our highly rated and trusted medical professionals
                </p>
            </div>

            <input
                type="text"
                placeholder="🔍 Search by doctor name or rating... "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm border-2 border-gray-200 rounded-xl px-6 py-3 w-full max-w-md mt-4 focus:outline-none focus:border-[#5f6FFF] transition-all duration-300 shadow-sm"
            />

            {!doctors || doctors.length === 0 ? (
                <div className="btn-spinner mt-10">
                    <p style={{ marginBottom: '40px', textAlign: 'center', color: '#5f6FFF', fontWeight: '500' }}>Please wait ! <br />While backend is Connecting from Render.</p>
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8'>
                    {filteredDoctors.slice(0,8).map((item, index) => (
                        <div
                            key={index}
                            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                            className='border-2 border-gray-200 rounded-2xl overflow-hidden cursor-pointer card-hover bg-white shadow-sm'
                        >
                            <div className='relative overflow-hidden'>
                                <img
                                    className='w-full h-64 object-cover hover:scale-110 transition-transform duration-500'
                                    src={item.image}
                                    alt={item.name}
                                />
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
                    ))}
                </div>
            )}

            <button
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                className='gradient-bg text-white px-12 py-4 rounded-xl mt-10 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold'
            >
                View All Doctors →
            </button>
        </div>
    )
}
