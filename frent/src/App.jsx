import React, { useState } from 'react';
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
import UserProvider from './pages/Login/UserProvider';


function App() {
  const [user, setUser] = useState(null);

  const login = (role) => {
    if (role === 'client') {
      setUser({
        id: 1,
        nombre: 'John',
        roles: ['client']
      });
    } else if (role === 'friend') {
      setUser({
        id: 2,
        nombre: 'Jane',
        roles: ['friend']
      });
    }
  }

  const logout = () => {
    setUser(null);
  }

  return (
    <>
      <div className='body-app'>
        
        <BrowserRouter>
          <NavBar user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} /> 
            <Route path="/form" element={<SelectionRegister />} />
            <Route path="/customer" element={
              <ProtectedRoute isAllowed={user && user.roles.includes("client")}>
                <CustomerForm />
              </ProtectedRoute>} />
            <Route path="/friend" element={<FriendForm />} />
        

            <Route element={<ProtectedRoute isAllowed={user && user.roles.includes('client')} redirectTo="/login" />}>
              <Route path="/rentaForm/:id" element={<RentFriendForm />} />
              <Route path="/listRent" element={<ListFriend/>} />
              <Route path="/listFriend" element={<ListFriend />} />
              
            </Route>
            <Route path='/calendarReservas' element = {<MyCalendar/>}/>
            <Route path="/rentalSectio" element={
              <ProtectedRoute isAllowed={user && user.roles.includes('friend')}>
                <ViewReserve />
              </ProtectedRoute>} />

            <Route path="/*" element={<h1 className='text-center'>404 Page Not Found</h1>}></Route>
          </Routes>
          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <div>
              <button onClick={() => login('client')}>Login como Cliente</button>
              <button onClick={() => login('friend')}>Login como Amigo</button>
            </div>
          )}
        </BrowserRouter>
        
      </div>
    </>
  );
}

export default App;