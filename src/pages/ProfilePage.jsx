import Navbar from '../components/layout/Navbar/Navbar'
import Footer from '../components/layout/Footer/Footer'
import Profile from '../components/Profile/Profile'
const ProfilePage = () => {
    return (
        <div className='overflow-x-hidden'>
            {/* navbar */}
            <Navbar />

            {/* Main Home Section */}
            <Profile />

            {/* Footer Section */}
            <Footer />
        </div>
    )
}

export default ProfilePage
