import SideBar from './SideBar'
import ProfileDashboard from './ProfileDashboard'

const Profile = () => {
    return (
        <div className='flex gap-10 lg:px-20 lg:py-8'>

            {/* Side bar Section */}
            <SideBar />

            {/* Main Profile dashboard Section */}
            <ProfileDashboard />
        </div>
    )
}

export default Profile
