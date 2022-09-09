import { Login } from "../components/Login"

export const Register = ({ isLoggedIn }) => {


  return (
    <div>
      <Login isLoggedIn={isLoggedIn} />
    </div>
  )
}