import './sytles/App.css'
import { Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home'
import { PetShop } from './pages/PetShop';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/petshop' element={<PetShop />} />
      </Routes>
    </div>
  );
}

export default App;
