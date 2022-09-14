import { Login } from "../components/Login"

export const Register = ({ isLoggedIn }) => {


  return (
    <div>
      <h1 className="title">Register Here</h1>
      <Login isLoggedIn={isLoggedIn} />
    </div>
  )
}