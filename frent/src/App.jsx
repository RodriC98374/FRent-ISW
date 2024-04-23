import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';

import NavBar from './components/Navbar/NavBar';
import Home from './pages/home/Home';
import ListFriend from './pages/listFriend/ListFriends'
import SelectionRegister from './pages/registros/SelectionRegister';
import { CustomerForm } from './components/Forms/CustomerForm/CustomerForm';
import RentFriendForm from './components/Forms/rentFriends/RentaForm';
import { FriendForm } from './components/Forms/FriendForm/FriendForm';
/* import RentalSection from './pages/rentalSection/RentalSection'; */
import ViewReserve from './components/viewReserve/ViewReserve';
import LoginForm from './pages/Login/LoginForm';




function App() {
  return (
    <div className='body-app'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} /> {/* Ruta para el formulario de inicio de sesión */}
          <Route path="/form" element={<SelectionRegister />} />
          <Route path="/customer" element={<CustomerForm />} />
          <Route path="/friend" element={<FriendForm />} />
          <Route path="/listFriend" element={<ListFriend />} />
          <Route path="/rentaForm/:id" element={<RentFriendForm />} />
          <Route path="/rentalSectio" element={<ViewReserve />} />
          {/* Ruta comodín para manejar todas las demás rutas no definidas */}
          <Route path="/*" element={<h1 className='text-center'>404 Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
