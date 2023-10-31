import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Home from './components/Home';
import Profile from './components/Profile';
import SearchResults from './components/SearchResults'

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login/' element={<Login/>}/>
        <Route path='/register/' element={<Register/>}/>
        <Route path='/search' element={<SearchResults/>}/>
        <Route path='/logout/' element={<Logout/>}/>
        <Route path='/:username/' element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;