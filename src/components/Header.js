import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Header() {

  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('access_token') !== null){
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Tenner</Navbar.Brand>            
          <Nav className="me-auto"> 
            {isAuth ? <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link> : null}
          </Nav>
          <Nav>
            {isAuth ? <Nav.Link onClick={() => navigate("/logout/")}>Logout</Nav.Link>
              : location.pathname === "/register/" ? <Nav.Link onClick={() => navigate("/login/")}>Login</Nav.Link>
                : <Nav.Link onClick={() => navigate("/register/")}>Register</Nav.Link>}
          </Nav>
      </Navbar>
    </>
  );
}

export default Header;