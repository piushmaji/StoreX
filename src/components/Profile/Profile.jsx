import SideBar from './SideBar'
import ProfileDashboard from './ProfileDashboard'

const Profile = () => {
    return (
        <div className='flex lg:gap-10 lg:px-20 lg:py-8 p-2'>

            {/* Side bar Section */}
            <SideBar />

            {/* Main Profile dashboard Section */}
            <ProfileDashboard />
        </div>
    )
}

export default Profile
