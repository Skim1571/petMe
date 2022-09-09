import './sytles/App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { checkToken, refreshToken } from './services/Auth'
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home'
import { PetShop } from './pages/PetShop';
import { PetDetails } from './pages/PetDetails';
import { Register } from './pages/Register'

function App() {
  const [user, setUser] = useState();
  const [authToken, setAuthToken] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null);
    setAuthToken(null)
    setIsLoggedIn(false);
    localStorage.removeItem("token_access")
    localStorage.removeItem("token_refresh");
  };

  const checkSession = async (token) => {
    let csrfToken = decodeURIComponent(document.cookie)
    let tokenObj = {
      "token": token.access,
      "headers": { 'X-Requested-With': 'XMLHttpRequest', 'X-CSRFToken': getCookie(csrfToken), 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
    }
    let userSession = await checkToken(tokenObj);
    if (!userSession) {
      tokenObj = {
        "token": token.refresh,
        "headers": { 'X-Requested-With': 'XMLHttpRequest', 'X-CSRFToken': getCookie(csrfToken), 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
      }
      userSession = await refreshToken(tokenObj)
    }
    setUser(userSession);
    setIsLoggedIn(true);
    //If a token exists, sends token to localStorage to persist logged in user
  };

  useEffect(() => {
    const checkTokenStatus = async () => {
      let token = {
        access: localStorage.getItem("token_access"),
        refresh: localStorage.getItem("token_refresh")
      };
      if (token) {
        checkSession(token);
      }
    }
    checkTokenStatus()
  }, [isLoggedIn]);

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      let cookies = document.cookie.split(';');
      cookieValue = cookies[0].toString()
      cookieValue = cookieValue.substring(10, cookieValue.length)
    }
    return cookieValue;
  }


  return (
    <div className="App">
      <header className="App-header">
        <NavBar isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />
      </header>
      <Routes>
        <Route path='/' element={<Home setAuthToken={setAuthToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/petshop' element={<PetShop isLoggedIn={isLoggedIn} />} />
        <Route path='/pets/:pet_id' element={<PetDetails user={user} />} />
        <Route path='/register' element={<Register isLoggedIn={isLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
