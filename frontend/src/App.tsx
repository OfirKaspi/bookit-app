import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Register } from './pages/Register';
import { SignIn } from './pages/SignIn';
import { AddHotel } from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';
import { MyHotels } from './pages/MyHotels';
import { EditHotel } from './pages/EditHotel';
import { Search } from './pages/Search';
import { Layout } from './layouts/layout';
import { HotelDetails } from './pages/HotelDetails';
import { Booking } from './pages/Booking';
import { MyBookings } from './pages/MyBookings';
import { Home } from './pages/Home';
import { PageNotFound } from './pages/PageNotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout><Home /></Layout>} />
        <Route path='/search' element={<Layout><Search /></Layout>} />
        <Route path='/detail/:hotelId' element={<Layout><HotelDetails /></Layout>} />
        <Route path='/register' element={<Layout><Register /></Layout>} />
        <Route path='/sign-in' element={<Layout><SignIn /></Layout>} />
        {/* needs auth */}
        <Route path='/add-hotel' element={<Layout><AddHotel /></Layout>} />
        <Route path='/my-bookings' element={<Layout><MyBookings /></Layout>} />
        <Route path='/my-hotels' element={<Layout><MyHotels /></Layout>} />
        <Route path='/edit-hotel/:hotelId' element={<Layout><EditHotel /></Layout>} />
        <Route path='/hotel/:hotelId/booking' element={<Layout><Booking /></Layout>} />

        <Route path='*' element={<Layout><PageNotFound /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App
