import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://media.istockphoto.com/id/996412132/photo/waiting-for-taxi.jpg?s=612x612&w=0&k=20&c=Q6ZD40QqHnd2B_4EC5TuR_i8MMDI04jROL2WMaWgyCw=)] h-screen pt-8 flex justify-center items-center flex-col">
        <img
          className="w-20 mb-4"
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
          alt="Uber Logo"
        />
        <div className="bg-white shadow-lg rounded-lg pb-7 py-4 px-6">
          <h2 className="text-3xl font-bold text-center">
            Get Started with Uber
          </h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5 hover:bg-gray-800 transition duration-300"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
