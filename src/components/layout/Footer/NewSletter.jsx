import { Mail, ArrowRight } from 'lucide-react'
import React from 'react'

const NewSletter = () => {
    return (
        <div className="px-4 lg:px-8 mt-20 mb-8 font-sans">
            <div className="bg-blue-600 rounded-[3rem] p-10 md:p-16 lg:p-24 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl shadow-blue-600/20">
                {/* ── Quirky Background Shapes ── */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
                
                <div className="relative z-10 text-center flex flex-col items-center">
                    <span className="inline-block py-2 px-6 rounded-full bg-white text-blue-700 text-[10px] font-black tracking-widest uppercase mb-6 shadow-xl">
                        Unlock 15% Off Your First Order
                    </span>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-6">
                        Join The <br/> Inner Circle.
                    </h1>
                    
                    <p className="text-blue-100 font-medium text-sm md:text-base max-w-md mb-10">
                        Get VIP access to exclusive drops, secret sales, and insider-only content before anyone else.
                    </p>

                    <div className="w-full max-w-md relative group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <input
                            className="w-full bg-white text-gray-900 placeholder:text-gray-400 text-sm font-bold pl-14 pr-36 py-5 rounded-full outline-none shadow-2xl focus:ring-4 focus:ring-white/30 transition-all"
                            type="email"
                            placeholder="Enter your email address..." 
                        />
                        <button className="absolute inset-y-2 right-2 bg-black text-white px-6 rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-800 active:scale-95 transition-all flex items-center gap-2">
                            Join <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewSletter
