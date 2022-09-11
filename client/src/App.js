import './sytles/App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { checkToken, refreshToken, tokenAccessCreator, tokenRefreshCreator, getCookie, setToken } from './services/Auth'
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home'
import { PetShop } from './pages/PetShop';
import { PetDetails } from './pages/PetDetails';
import { Register } from './pages/Register'

function App() {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [myPets, setMyPets] = useState()

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null);
    setAuthToken(null)
    setIsLoggedIn(false);
    localStorage.removeItem("token_access")
    localStorage.removeItem("token_refresh")
    localStorage.clear()
  };

  const checkSession = async (token) => {
    let tokenObj = tokenAccessCreator(token)
    let userSession = await checkToken(tokenObj);
    if (userSession.request.status !== 200) {
      tokenObj = tokenRefreshCreator(token)
      let refreshSession = await refreshToken(tokenObj)
      setToken(refreshSession)
      setAuthToken(refreshSession)
      setIsLoggedIn(true)
    }
    setIsLoggedIn(true);
    //If a token exists, sends token to localStorage to persist logged in user
  };

  useEffect(() => {
    const checkTokenStatus = () => {
      if (authToken) {
        checkSession(authToken);
      }
    }
    checkTokenStatus()
  }, [isLoggedIn]);

  useEffect(() => {
    const checkRender = () => {
      if (localStorage.getItem("token_access")) {
        setIsLoggedIn(true)
      }
    }
    checkRender()
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <NavBar isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />
      </header>
      <Routes>
        <Route path='/' element={<Home myPets={myPets} setMyPets={setMyPets} user={user} setUser={setUser} authToken={authToken} setAuthToken={setAuthToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/petshop' element={<PetShop authToken={authToken} user={user} isLoggedIn={isLoggedIn} />} />
        <Route path='/pets/:pet_id' element={<PetDetails user={user} />} />
        <Route path='/register' element={<Register isLoggedIn={isLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;