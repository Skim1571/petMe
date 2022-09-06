import { NavLink, Link } from "react-router-dom"

export const NavBar = () => {

  return (
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
}