import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar/NavBar';
import Home from './pages/home/Home';
import HomeClient from './pages/home/HomeClient'; // Nuevo componente
import HomeFriend from './pages/home/HomeFriend'; // Nuevo componente
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
import AddAvailableHours from './components/Forms/AddAvailableHours/AddAvailableHours';
import ProfileFriend from './pages/profile/profileFriend';
import ProfileUser from './pages/profile/ProfileUser';
import { getUser } from './pages/Login/LoginForm';

import { UserContext } from './pages/Login/UserProvider';
import Chat from './components/Chat/Chat';


/*import para ver como queda perfil*/
import ProfileClient from "./pages/profile/profileClient";

function App() {
  const { userData } = useContext(UserContext);
  const userData2 = getUser();

  return (
    <>
      <div className="body-app">
        <BrowserRouter>
          <NavBar user={userData2} />
          <Routes>
            <Route
              path="/"
              element={
                userData2 && userData2.user_type === "Cliente" ? (
                  <HomeClient />
                ) : userData2 && userData2.user_type === "Amigo" ? (
                  <HomeFriend />
                ) : (
                  <Home />
                )
              }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/form" element={<SelectionRegister />} />
            <Route path="/customer" element={<CustomerForm />} />
            <Route path="/addAvailableHours" element={<AddAvailableHours />} />
            <Route path="/friend" element={<FriendForm />} />
            <Route path="/photo" element={<Photo />} />
            <Route path="/chat2" element={<Chat />} />

            <Route
              element={
                <ProtectedRoute
                  isAllowed={userData2 && userData2.user_type === "Cliente"}
                  redirectTo="/login"
                />
              }
            >

              
            </Route>

            <Route
              element={
                <ProtectedRoute
                  isAllowed={userData2 && userData2.user_type === "Cliente"}
                  redirectTo="/login"
                />
              }
            >
              <Route path="/rentaForm/:id" element={<RentFriendForm />} />
              <Route path="/profileFriend/:id" element = {<ProfileFriend/>}/>
              <Route path="/listRent" element={<ListFriend />} />
              <Route path="/calendarReservas/:id" element={<MyCalendar />} />
              <Route path="/listFriend" element={<ListFriend />} />

            </Route>

            <Route
              element={
                <ProtectedRoute
                  isAllowed={userData2 && userData2.user_type === "Amigo"}
                  redirectTo="/login"
                />
              }
            >
              <Route path="/rentalSectio" element={<ViewReserve />} />
              <Route path="/profileClient/:id" element={<ProfileClient />} />
            </Route>
            <Route
              element={
                <ProtectedRoute
                  isAllowed={userData2 && (userData2.user_type === "Amigo" || userData2.user_type === "Cliente")}
                  redirectTo="/login"
                />
              }
            >
            <Route path="/profileUser" element={<ProfileUser />} />
            </Route>
            <Route path="/profil/:id" element={<ProfileFriend />} />
            <Route
              path="/*"
              element={<h1 className="text-center">404 Page Not Found</h1>}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
