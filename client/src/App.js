import './sytles/App.css'
import { Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home'
import { PetShop } from './pages/PetShop';
import { PetDetails } from './pages/PetDetails';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState();

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <Routes>
        <Route path='/' element={<Home setUser={setUser} />} />
        <Route path='/petshop' element={<PetShop />} />
        <Route path='/pets/:pet_id' element={<PetDetails user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
