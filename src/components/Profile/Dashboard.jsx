import { Heart, Map, ShoppingBag } from 'lucide-react'

const myDashboard =
    [
        {
            id: "D1",
            icon: ShoppingBag,
            title: "Total Orders",
            value: 32,
            info: 3,
        },
        {
            id: "D2",
            icon: Heart,
            title: "My Wishlist",
            value: 14,
            info: "Item Saved",
        },
        {
            id: "D3",
            icon: Map,
            title: "Saved Addresses",
            value: 3,
            info: "Home",
        },
    ]

const Dashboard = () => {
    return (
        <div className='flex flex-col gap-4'>

            <div className='bg-gray-50 border rounded-lg border-gray-300 pb-5'>
                <section className=' py-3 lg:px-6  '>
                    <div className='text-2xl py-2 px-4 lg:px-0'>
                        <h1>Edit Profile</h1>
                    </div>


                    {/* Profile Section */}
                    <div className='flex flex-col lg:flex-row items-center py-4 px-8 gap-6'>
                        <div className='lg:w-[20%] flex flex-col items-center gap-2'>
                            <div className='h-40 w-40 rounded-full'>
                                <img
                                    className='h-full w-full rounded-full object-cover'
                                    src="https://i.pinimg.com/1200x/d9/e1/4c/d9e14c251d468cc476c0ec33f969b5da.jpg" alt="dp" />
                            </div>
                            <div className='flex flex-col items-center'>
                                <h1 className='text-xl font-bold'>Piush Maji</h1>
                                <a className='text-blue-700 cursor-pointer hover:text-blue-900'>Change Photo</a>
                            </div>
                        </div>

                        <div className='lg:w-[80%] w-full grid grid-cols-2 lg:gap-7 gap-4 items-center'>
                            <div className='flex flex-col gap-2 col-span-2 lg:col-span-1'>
                                <h1>Full name</h1>
                                <input
                                    className='p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-0'
                                    type="text"
                                    placeholder='Full Name' />
                            </div>
                            <div className='flex flex-col gap-2 col-span-2 lg:col-span-1'>
                                <h1>Email Address</h1>
                                <input
                                    className='p-2 bg-gray-50 border border-gray-300 rounded-lg w- focus:outline-0'
                                    type="email"
                                    placeholder='Email Address' />
                            </div>
                            <div className='flex flex-col gap-2 col-span-2 lg:col-span-1'>
                                <h1>Phone Number</h1>
                                <input
                                    className='p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-0'
                                    type="text"
                                    placeholder='Phone Number' />
                            </div>
                            <div className='flex flex-col gap-2 col-span-2 lg:col-span-1'>
                                <h1>Password</h1>
                                <input
                                    className='p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-0'
                                    type="Password"
                                    placeholder='Password' />
                            </div>
                            <div className='col-span-2 py-4 bg-green-500 rounded-lg font-light text-white hover:bg-green-600 cursor-pointer active:scale-95 transition-all duration-200 flex items-center justify-center'>

                                <h1>Save Changes</h1>

                            </div>
                        </div>
                    </div>

                </section>
            </div>


            {/* Dashboard Section */}
            <section className='hidden bg-gray-50 border rounded-lg border-gray-300 p-6 flex-col gap-4'>
                <div className='text-2xl'>
                    <h1>My Dashboard</h1>
                </div>

                <div className='flex md:flex-row flex-col  gap-4 justify-between'>
                    {myDashboard.map((items) => {

                        const Icon = items.icon
                        return (
                            <div div key={items.id} className='w-full md:w-1/3 flex flex-col border border-gray-300 rounded-lg p-4 gap-1' >
                                <div className='h-8 w-8 flex items-center justify-center rounded-lg text-blue-500 bg-blue-200'>
                                    <Icon />
                                </div>
                                <div className='font-semibold'>
                                    <h1>{items.title}</h1>
                                </div>
                                <div className='text-2xl font-bold'>
                                    <p>{items.value}</p>
                                </div>
                                <div>
                                    <p>{items.info}</p>
                                </div>
                            </div>
                        )

                    })}
                </div>
            </section >
        </div >
    )
}

export default Dashboard
