import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import {Login} from './components/Login';
import {Register} from './components/Register';
import Logout from './components/Logout';
import Home from './components/Home';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/:user' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;