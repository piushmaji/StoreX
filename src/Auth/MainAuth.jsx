import { Link, Outlet } from 'react-router-dom'
import Content from './Content'
import Login from './Login'
import { ArrowLeft } from 'lucide-react'
import Signup from './SignUp'
import { useState } from 'react'

const Authlayout = () => {

    const toggle = () => {
        const [active, setActive] = useState(<Login />)
        setActive(<Signup />)
    }

    return (
        <div className='relative flex'>
            {/* Back to Home */}

            <div className='z-50 absolute top-6 left-4'>
                <div className='flex justify-start mb-6'>
                    <Link to='/'>
                        <div className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors'>
                            <ArrowLeft className='w-8 h-8 bg-blue-200  md:bg-gray-100 rounded-full p-1' />
                        </div>
                    </Link>
                </div>
            </div>

            <div className='lg:w-2/5'>
                <Content />
            </div>

            <div className=' lg:flex-1 w-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default Authlayout