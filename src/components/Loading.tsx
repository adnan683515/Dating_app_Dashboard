import carimg from '../assets/7317975-removebg-preview.png'
import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      {/* Road */}
      <div className="relative w-full max-w-md h-6 bg-gray-300 rounded-full overflow-hidden">
        {/* Moving Car */}
        <img
          src={carimg}
          alt="Car"
          className="absolute w-16 h-auto -left-16 animate-carMove shadow-lg"
        />
      </div>

      {/* Loading text */}
      <p className="mt-6 text-gray-700 font-semibold text-lg animate-pulse">
        Loading your ride...
      </p>

      {/* Custom animation using global CSS */}
      <style>
        {`
          @keyframes carMove {
            0% { left: -4rem; transform: translateY(0); }
            25% { transform: translateY(-2px); }
            50% { left: 100%; transform: translateY(0); }
            75% { transform: translateY(-2px); }
            100% { left: 100%; transform: translateY(0); }
          }
          .animate-carMove {
            animation: carMove 3s linear infinite;
          }
        `}
      </style>
    </div>
  )
}

export default Loading;