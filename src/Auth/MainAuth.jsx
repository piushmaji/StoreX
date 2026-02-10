import { Link } from 'react-router-dom'
import Content from './Content'
import Login from './Login'
import { ArrowLeft } from 'lucide-react'

const Authlayout = () => {
    return (
        <div className='h-screen flex'>

            <div className='lg:w-2/5'>
                <Content />
            </div>
            <div className='relative lg:flex-1 w-full'>
                {/* Back to Home */}

                <div className='absolute top-7 left-4 '>
                    <div className='flex justify-start mb-6'>
                        <Link to='/'> <div className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors'>
                            <ArrowLeft className='w-5 h-5' />
                            <span className='text-sm'>Back to Home</span>
                        </div>
                        </Link>
                    </div>
                </div>
                <div>
                    <Login />
                </div>
            </div>
        </div>
    )
}

export default Authlayout