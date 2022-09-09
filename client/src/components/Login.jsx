import axios from "axios"
import { useState, useEffect } from "react"
import { BASE_URL } from "../globals"
import { signInUser } from "../services/Auth"
import { useNavigate } from "react-router-dom"

export const Login = ({ setAuthToken, setIsLoggedIn }) => {
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' })

  let navigate = useNavigate()

  const handleChange = (event) => {
    setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const payload = await signInUser(loginInfo)
    setLoginInfo({ username: '', password: '' })
    await setAuthToken({ payload })
    await setIsLoggedIn(true)
    navigate('/')
  }

  return (
    <div className="loginForm">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={loginInfo.username.value} name="username" placeholder="Username" onChange={handleChange} />
        <input type="text" value={loginInfo.password.value} name="password" placeholder="Password" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}