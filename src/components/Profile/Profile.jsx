import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'
import AnimatedOutlet from '../../pages/AnimatedOutlet'

const Profile = () => {


    return (
        <div className='min-h-screen flex lg:gap-10 lg:px-20 lg:py-8 p-2'>

            <aside className='w-[25%] hidden md:block'>
                {/* Side bar Section */}
                <SideBar />
            </aside>

            <main className='w-full flex-1 '>
                <div className='md:hidden'>
                    <Topbar />
                </div>
                {/* Main Profile dashboard Section */}
                <div >
                    <AnimatedOutlet />
                </div>
            </main>
        </div>
    )
}

export default Profile
