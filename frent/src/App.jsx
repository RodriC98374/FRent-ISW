import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar/NavBar';
import Home from './pages/home/Home';
import ListFriend from './pages/listFriend/ListFriends';
import SelectionRegister from './pages/registros/SelectionRegister';
import { CustomerForm } from './components/Forms/CustomerForm/CustomerForm';
import RentFriendForm from './components/Forms/rentFriends/RentaForm';
import { FriendForm } from './components/Forms/FriendForm/FriendForm';
import ViewReserve from './components/viewReserve/ViewReserve';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import LoginForm from './pages/Login/LoginForm'
import MyCalendar from './components/Forms/rentFriends/calendar/MyCalendar';
import Photo from './pages/photo/PhotoForm';
import AddAvailableHours from './components/Forms/AddAvailableHours/AddAvailableHours'

import { UserContext } from './pages/Login/UserProvider';

function App() {
  const { userData } = useContext(UserContext);

  return (
    <>
      <div className='body-app'>
        <BrowserRouter>
          <NavBar user={userData} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/form" element={<SelectionRegister />} />
            <Route path="/customer" element={<CustomerForm />} />
            <Route path='/addAvailableHours' element={<AddAvailableHours/>}/>

            <Route path="/friend" element={<FriendForm />} />

            <Route path="/photo" element={<Photo />} />


            <Route element={<ProtectedRoute isAllowed={userData && userData.user_type === 'Client'} redirectTo="/login" />}>
              <Route path="/rentaForm/:id" element={<RentFriendForm />} />
              <Route path="/listRent" element={<ListFriend />} />
              <Route path="/listFriend" element={<ListFriend />} />
            </Route>
            
            <Route path='/calendarReservas/:id' element = {<MyCalendar/>}/>
            
            <Route path="/rentalSectio" element={
              <ProtectedRoute isAllowed={userData && userData.user_type === 'Friend'}>
                <ViewReserve />
              </ProtectedRoute>} />

            <Route path="/*" element={<h1 className='text-center'>404 Page Not Found</h1>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
