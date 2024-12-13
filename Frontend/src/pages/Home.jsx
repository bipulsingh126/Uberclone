import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div className='bg-cover bg-center bg-[url(https://media.istockphoto.com/id/996412132/photo/waiting-for-taxi.jpg?s=612x612&w=0&k=20&c=Q6ZD40QqHnd2B_4EC5TuR_i8MMDI04jROL2WMaWgyCw=)] h-screen pt-8 flex justify-between w-full flex-col '>
                <img className='w-14 ml-8' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" alt="" />
                <div className='bg-white pb-7 py-4 px-4'>
                    <h2 className='text-2xl font-bold'>Get Started with Uber</h2>
                    <Link   to='/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Home