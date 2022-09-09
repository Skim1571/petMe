import { NavLink, Link } from "react-router-dom"

export const NavBar = ({ isLoggedIn, handleLogOut }) => {

  const publicNav = (
    <nav className="navBar">
      <div id="logo">
        <Link to="/">petMe</Link>
      </div>
      <div className="nav-links">
        <NavLink to='/' className={({ isActive }) => isActive ? "active" : undefined}>Home</NavLink>
        <NavLink to='/petshop' className={({ isActive }) => isActive ? "active" : undefined}>PetShop</NavLink>
        <NavLink to='/' onClick={handleLogOut} >
          Sign Out
        </NavLink>
      </div>
    </nav>
  )

  const authNav = (
    <nav className="navBar">
      <div id="logo">
        <Link to="/">petMe</Link>
      </div>
      <div className="nav-links">
        <NavLink to='/' className={({ isActive }) => isActive ? "active" : undefined}>Home</NavLink>
        <NavLink to='/petshop' className={({ isActive }) => isActive ? "active" : undefined}>PetShop</NavLink>
      </div>
    </nav>
  )


  return (
    <div>
      {!isLoggedIn ? authNav : publicNav}
    </div>
  )
}