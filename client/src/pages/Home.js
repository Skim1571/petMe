import { Login } from "../components/Login"

export const Home = ({ setAuthToken, isLoggedIn, setIsLoggedIn }) => {

  const loginPanel = (
    <Login setAuthToken={setAuthToken} setIsLoggedIn={setIsLoggedIn} />
  )

  return (
    <div>
      <h1>Home</h1>
      {!isLoggedIn ? loginPanel : ''}
    </div>
  )
}