import Navbar from '../components/layout/Navbar/Navbar'
import Home from '../components/Home/Home'
import Footer from '../components/layout/Footer/Footer'
const HomePage = () => {
  return (
    <div>
      {/* navbar */}
      <Navbar />

      {/* Main Home Section */}
      <Home />

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default HomePage
