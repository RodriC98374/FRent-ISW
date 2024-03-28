import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import { CustomerFormPage } from './components/form/customerFormPage';
import { CustomerFormFriend } from './components/form/customeFormFriend';
import NavBarN from './components/Navbar/NavBarN';
import Home from './pages/home/Home';
import ListFriend from './pages/listFriend/ListFriend';
import SelectionRegister from './pages/registros/SelectionRegister';




function App() {
  return (
    <>
    <BrowserRouter>
      <NavBarN></NavBarN>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/form" element={<SelectionRegister></SelectionRegister>}/>
        <Route path="/cliente" element={<CustomerFormPage></CustomerFormPage>}/>
        <Route path="/friend" element={<CustomerFormFriend></CustomerFormFriend>}/>
        <Route path='listFriend' element = {<ListFriend></ListFriend>}/>
        <Route path="/*" element={<h1 className='text-center'>404 Page Not Found</h1>}></Route>
      </Routes>

    </BrowserRouter>
  
      
      
    </>
  );
}

export default App;
