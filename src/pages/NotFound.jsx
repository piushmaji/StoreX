import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Geometric Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-64 h-64 border-2 border-white transform rotate-45"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 border-2 border-white transform -rotate-12"></div>
                <div className="absolute top-1/2 left-1/2 w-72 h-72 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 rotate-12"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center">
                {/* 404 Large Numbers with 3D Effect */}
                <div className="relative mb-8">
                    <div className="flex items-center justify-center gap-8 mb-6">
                        {/* First 4 */}
                        <div className="relative">
                            <div className="text-[180px] md:text-[220px] font-bold text-blue-400 opacity-50 select-none leading-none">
                                4
                            </div>
                            <div className="absolute inset-0 text-[180px] md:text-[220px] font-bold text-blue-300 transform translate-x-2 translate-y-2 -z-10 select-none leading-none">
                                4
                            </div>
                        </div>

                        {/* Hole with Ladder */}
                        <div className="relative w-32 h-32 md:w-40 md:h-40">
                            {/* Hole */}
                            <div className="w-full h-full bg-blue-800 rounded-full shadow-2xl shadow-blue-900/50 flex items-center justify-center">
                                <div className="w-[85%] h-[85%] bg-linear-to-b from-blue-900 to-black rounded-full"></div>
                            </div>

                            {/* Ladder */}
                            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-8 h-20">
                                <div className="relative w-full h-full">
                                    {/* Ladder sides */}
                                    <div className="absolute left-1 top-0 w-1.5 h-full bg-yellow-600 rounded"></div>
                                    <div className="absolute right-1 top-0 w-1.5 h-full bg-yellow-600 rounded"></div>
                                    {/* Ladder rungs */}
                                    <div className="absolute top-2 left-1 right-1 h-1.5 bg-yellow-600 rounded"></div>
                                    <div className="absolute top-1/3 left-1 right-1 h-1.5 bg-yellow-600 rounded"></div>
                                    <div className="absolute top-2/3 left-1 right-1 h-1.5 bg-yellow-600 rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* Second 4 */}
                        <div className="relative">
                            <div className="text-[180px] md:text-[220px] font-bold text-blue-400 opacity-50 select-none leading-none">
                                4
                            </div>
                            <div className="absolute inset-0 text-[180px] md:text-[220px] font-bold text-blue-300 transform translate-x-2 translate-y-2 -z-10 select-none leading-none">
                                4
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8 space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider animate-pulse">
                        OOPS!
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-md mx-auto">
                        We can't find<br />
                        the page that you're<br />
                        looking for :(
                    </p>
                </div>

                {/* Back to Home Button */}
                <button
                    onClick={() => navigate('/')}
                    className="group relative px-8 py-3 text-white font-semibold tracking-wider border-2 border-white rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                    <span className="relative z-10">BACK TO HOME</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300"></div>
                </button>

                {/* Floating Animation Elements */}
                <div className="absolute -top-10 left-1/4 w-4 h-4 bg-white rounded-full animate-bounce opacity-60"></div>
                <div className="absolute top-20 right-1/4 w-3 h-3 bg-blue-200 rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-10 left-1/3 w-5 h-5 bg-white rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Additional 3D Depth Shadows */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default NotFound;