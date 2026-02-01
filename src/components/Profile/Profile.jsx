import SideBar from './SideBar'
import ProfileDashboard from './Dashboard'
import { Outlet } from 'react-router-dom'

const Profile = () => {

    
    return (
        <div className='flex lg:gap-10 lg:px-20 lg:py-8 p-2'>

            {/* Side bar Section */}
            <SideBar />

            {/* Main Profile dashboard Section */}
            <div className='lg:h-screen w-full flex-1'>
                <Outlet />
            </div>
        </div>
    )
}

export default Profile
