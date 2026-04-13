import { useState } from 'react'
import { Mail, KeyRound, Lock, EyeOff, Eye } from 'lucide-react'
import storex from '../assets/images/Logo/storex.png'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/Auth/AuthContext'

const ForgotPwd = () => {
    const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: New Password
    
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState('')

    const { resetPassword, verifyRecoveryOtp, updatePassword } = useAuth()
    const navigate = useNavigate()

    const handleSendOtp = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors('')

        const { error } = await resetPassword(email)

        if (error) {
            setErrors(error.message)
            toast.error(error.message)
            setLoading(false)
            return
        }

        toast.success("OTP sent to your email!")
        setStep(2)
        setLoading(false)
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors('')

        const { error } = await verifyRecoveryOtp(email, otp)

        if (error) {
            setErrors(error.message)
            toast.error(error.message)
            setLoading(false)
            return
        }

        toast.success("OTP verified successfully!")
        setStep(3)
        setLoading(false)
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors('')

        const { error } = await updatePassword(newPassword)

        if (error) {
            setErrors(error.message)
            toast.error(error.message)
            setLoading(false)
            return
        }

        toast.success("Password updated successfully!")
        setLoading(false)
        navigate('/login')
    }

    return (
        <div className='h-screen flex'>
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
                            {step === 1 && "Reset Password"}
                            {step === 2 && "Enter OTP"}
                            {step === 3 && "New Password"}
                        </h2>
                        <p className='mt-2 text-sm text-gray-600'>
                            {step === 1 && "Enter your email to receive a One-Time Password."}
                            {step === 2 && `We've sent a code to ${email}`}
                            {step === 3 && "Create a secure new password for your account."}
                        </p>
                    </div>

                    {/* Auth Form Card */}
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-200 p-8'>

                        {step === 1 && (
                            <form onSubmit={handleSendOtp} className='space-y-5'>
                                <div>
                                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                                        Email Address
                                    </label>
                                    <div className='relative'>
                                        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                                        <input
                                            id='email'
                                            type='email'
                                            required
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); setErrors('') }}
                                            className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50'
                                            placeholder='Enter your email'
                                        />
                                    </div>
                                </div>
                                {errors && <p className="text-red-500 text-sm text-center">{errors}</p>}
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all disabled:opacity-50'
                                >
                                    {loading ? 'Sending...' : 'Send OTP'}
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleVerifyOtp} className='space-y-5'>
                                <div>
                                    <label htmlFor='otp' className='block text-sm font-medium text-gray-700 mb-2'>
                                        6-Digit OTP
                                    </label>
                                    <div className='relative'>
                                        <KeyRound className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                                        <input
                                            id='otp'
                                            type='text'
                                            required
                                            value={otp}
                                            onChange={(e) => { setOtp(e.target.value); setErrors('') }}
                                            className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 tracking-widest'
                                            placeholder='123456'
                                            maxLength={6}
                                        />
                                    </div>
                                </div>
                                {errors && <p className="text-red-500 text-sm text-center">{errors}</p>}
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all disabled:opacity-50'
                                >
                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                </button>
                                <div className='text-center mt-4'>
                                    <button 
                                        type='button' 
                                        onClick={() => setStep(1)} 
                                        className='text-sm text-gray-500 hover:text-blue-600'
                                    >
                                        Use a different email
                                    </button>
                                </div>
                            </form>
                        )}

                        {step === 3 && (
                            <form onSubmit={handleUpdatePassword} className='space-y-5'>
                                <div>
                                    <label htmlFor='newPassword' className='block text-sm font-medium text-gray-700 mb-2'>
                                        New Password
                                    </label>
                                    <div className='relative'>
                                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                                        <input
                                            id='newPassword'
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={newPassword}
                                            onChange={(e) => { setNewPassword(e.target.value); setErrors('') }}
                                            className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50'
                                            placeholder='Enter new password'
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
                                {errors && <p className="text-red-500 text-sm text-center">{errors}</p>}
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all disabled:opacity-50'
                                >
                                    {loading ? 'Updating...' : 'Update Password'}
                                </button>
                            </form>
                        )}

                        {/* Back to Login Link */}
                        <div className='text-center mt-6'>
                            <Link to='/login' className='text-sm font-medium text-blue-600 hover:text-blue-700'>
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPwd
