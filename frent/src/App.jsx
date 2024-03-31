import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
/* import { CustomerFormPage } from './components/form/customerFormPage'; */
/* import { CustomerFormFriend } from './components/form/customeFormFriend'; */
import NavBarN from './components/Navbar/NavBarN';
import Home from './pages/home/Home';
import ListFriend from './pages/listFriend/VeryFriends';
import SelectionRegister from './pages/registros/SelectionRegister';
/* import FriendProfile from './pages/listFriend/FriendProfile'; */
import { Test } from './components/Forms/CustomerForm/test';
import RentaForm from './components/Forms/CustomerForm/rentFriends/RentaForm';
import ViewReserve from './components/viewReserve/ViewReserve';




function App() {
  return (
    <>
    <div className='body-app'>
    <BrowserRouter>
      <NavBarN></NavBarN>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/form" element={<SelectionRegister></SelectionRegister>}/>
        <Route path="/cliente" element={<Test></Test>}/>
        {/* <Route path="/friend" element={<CustomerFormFriend></CustomerFormFriend>}/> */}
        <Route path='/listFriend' element = {<ListFriend></ListFriend>}/>
        {/* <Route path="listFriend/:id" element={<FriendProfile></FriendProfile>} /> */}
        <Route path='/rentaForm' element = {<RentaForm></RentaForm>}></Route>
        <Route path='/viewReserve' element = {<ViewReserve></ViewReserve>}/>
        <Route path="/*" element={<h1 className='text-center'>404 Page Not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>    
    </div>
    </>
  );
}

export default App;
