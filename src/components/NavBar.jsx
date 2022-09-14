import { NavLink, Link } from "react-router-dom"

export const NavBar = ({ isLoggedIn, handleLogOut }) => {

  const authNav = (
    <nav className="navBar">
      <div id="logo">
        <Link to="/">petMe</Link>
      </div>
      <div className="nav-links">
        <NavLink to='/' className={({ isActive }) => isActive ? "active" : undefined}>Home</NavLink>
        <NavLink to='/petshop' className={({ isActive }) => isActive ? "active" : undefined}>PetShop</NavLink>
        <NavLink to='/' onClick={handleLogOut} className={({ isActive }) => isActive ? undefined : undefined}>
          Sign Out
        </NavLink>
      </div>
    </nav>
  )

  const publicNav = (
    <nav className="navBar">
      <div id="logo">
        <Link to="/">petMe</Link>
      </div>
      <div className="nav-links">
        <NavLink to='/' className={({ isActive }) => isActive ? "active" : undefined}>Home</NavLink>
        <NavLink to='/petshop' className={({ isActive }) => isActive ? "active" : undefined}>PetShop</NavLink>
        <NavLink to='/register' className={({ isActive }) => isActive ? "active" : undefined}>Register</NavLink>
      </div>
    </nav>
  )


  return (
    <div>
      {!isLoggedIn ? publicNav : authNav}
    </div>
  )
}