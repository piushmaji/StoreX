import { useState } from 'react'
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import storex from '../assets/images/Logo/storex.png'


const Auth = () => {
    const [activeTab, setActiveTab] = useState('login') // 'login', 'signup', 'forgot'
    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log('Form submitted:', formData)
    }

    const handleGoogleLogin = () => {
        // Handle Google login logic here
        console.log('Google login clicked')
    }

    return (
        <div className='h-screen flex'>

            {/* Right Side - Auth Form */}
            <div className='w-full flex items-center justify-center bg-gray-50 p-4 lg:p-0'>
                <div className='max-w-md w-full'>

                    {/* Mobile Logo */}
                    <div className='lg:hidden flex justify-center items-center gap-3 mb-8'>
                        <img
                            className='h-12 w-12 drop-shadow-lg bg-gray-50 border-2 border-blue-500 rounded-2xl p-2'
                            src={storex}
                            alt="StoreX Logo"
                        />
                        <h1 className='text-3xl font-bold text-blue-600'>StoreX</h1>
                    </div>

                    {/* Header */}
                    <div className='mb-8'>
                        <h2 className='text-3xl font-bold text-gray-900'>
                            {activeTab === 'login' && 'Welcome Back!'}
                            {activeTab === 'signup' && 'Create Account'}
                            {activeTab === 'forgot' && 'Reset Password'}
                        </h2>
                        <p className='mt-2 text-sm text-gray-600'>
                            {activeTab === 'login' && 'Sign in to continue shopping'}
                            {activeTab === 'signup' && 'Join StoreX today and start shopping'}
                            {activeTab === 'forgot' && 'Enter your email to reset password'}
                        </p>
                    </div>

                    {/* Auth Form Card */}
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-200 p-8'>

                        {/* Tabs - Only show for login/signup */}
                        {activeTab !== 'forgot' && (
                            <div className='flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg'>
                                <button
                                    onClick={() => setActiveTab('login')}
                                    className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'login'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setActiveTab('signup')}
                                    className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'signup'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className='space-y-5'>

                            {/* Name Field - Only for Signup */}
                            {activeTab === 'signup' && (
                                <div>
                                    <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
                                        Full Name
                                    </label>
                                    <div className='relative'>
                                        <User className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                                        <input
                                            id='name'
                                            name='name'
                                            type='text'
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50'
                                            placeholder='Enter your full name'
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                                    Email Address
                                </label>
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                                    <input
                                        id='email'
                                        name='email'
                                        type='email'
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50'
                                        placeholder='Enter your email'
                                    />
                                </div>
                            </div>

                            {/* Password Field - Not for Forgot Password */}
                            {activeTab !== 'forgot' && (
                                <div>
                                    <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                                        Password
                                    </label>
                                    <div className='relative'>
                                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                                        <input
                                            id='password'
                                            name='password'
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50'
                                            placeholder='Enter your password'
                                        />
                                        <button
                                            type='button'
                                            onClick={() => setShowPassword(!showPassword)}
                                            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                                        >
                                            {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Forgot Password Link - Only for Login */}
                            {activeTab === 'login' && (
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <input
                                            id='remember-me'
                                            name='remember-me'
                                            type='checkbox'
                                            className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer'
                                        />
                                        <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700 cursor-pointer'>
                                            Remember me
                                        </label>
                                    </div>
                                    <button
                                        type='button'
                                        onClick={() => setActiveTab('forgot')}
                                        className='text-sm font-medium text-blue-600 hover:text-blue-700'
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type='submit'
                                className='w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-98'
                            >
                                {activeTab === 'login' && 'Sign In'}
                                {activeTab === 'signup' && 'Create Account'}
                                {activeTab === 'forgot' && 'Send Reset Link'}
                            </button>

                            {/* Back to Login - Only for Forgot Password */}
                            {activeTab === 'forgot' && (
                                <button
                                    type='button'
                                    onClick={() => setActiveTab('login')}
                                    className='w-full text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2 py-2'
                                >
                                    <ArrowLeft className='w-4 h-4' />
                                    Back to Login
                                </button>
                            )}
                        </form>

                        {/* Divider - Only for Login/Signup */}
                        {activeTab !== 'forgot' && (
                            <div className='relative my-6'>
                                <div className='absolute inset-0 flex items-center'>
                                    <div className='w-full border-t border-gray-300'></div>
                                </div>
                                <div className='relative flex justify-center text-sm'>
                                    <span className='px-2 bg-white text-gray-500'>Or continue with</span>
                                </div>
                            </div>
                        )}

                        {/* Google Login Button - Only for Login/Signup */}
                        {activeTab !== 'forgot' && (
                            <button
                                type='button'
                                onClick={handleGoogleLogin}
                                className='w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-98'
                            >
                                <svg className='w-5 h-5' viewBox='0 0 24 24'>
                                    <path
                                        fill='#4285F4'
                                        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                                    />
                                    <path
                                        fill='#34A853'
                                        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                                    />
                                    <path
                                        fill='#FBBC05'
                                        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                                    />
                                    <path
                                        fill='#EA4335'
                                        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                                    />
                                </svg>
                                <span className='text-gray-700 font-medium'>
                                    {activeTab === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
                                </span>
                            </button>
                        )}

                        {/* Terms and Privacy - Only for Signup */}
                        {activeTab === 'signup' && (
                            <p className='mt-4 text-xs text-center text-gray-500'>
                                By signing up, you agree to our{' '}
                                <a href='#' className='text-blue-600 hover:text-blue-700 font-medium'>
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href='#' className='text-blue-600 hover:text-blue-700 font-medium'>
                                    Privacy Policy
                                </a>
                            </p>
                        )}
                    </div>

                    {/* Additional Info */}
                    <div className='text-center mt-6'>
                        <p className='text-sm text-gray-600'>
                            {activeTab === 'login' && "Don't have an account? "}
                            {activeTab === 'signup' && 'Already have an account? '}
                            {activeTab === 'forgot' && 'Remember your password? '}
                            <button
                                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                                className='font-semibold text-blue-600 hover:text-blue-700'
                            >
                                {activeTab === 'login' && 'Sign up'}
                                {activeTab === 'signup' && 'Sign in'}
                                {activeTab === 'forgot' && 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth