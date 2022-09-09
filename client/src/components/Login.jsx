import axios from "axios"
import { useState, useEffect } from "react"
import { BASE_URL } from "../globals"
import { signInUser, registerUser } from "../services/Auth"
import { useNavigate, useLocation } from "react-router-dom"

export const Login = ({ setUser, setAuthToken, setIsLoggedIn }) => {
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' })
  const [registerInfo, setRegisterInfo] = useState({
    username: '',
    password: '',
    confirmpassword: '',
    email: ''
  })
  const navigate = useNavigate()
  const location = useLocation()

  const handleChangeLogin = (event) => {
    setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value })
  }

  const handleSubmitLogin = async (event) => {
    event.preventDefault()
    let payload = await signInUser(loginInfo)
    setUser(loginInfo.username)
    setLoginInfo({ username: '', password: '' })
    await setAuthToken({ payload })
    await setIsLoggedIn(true)
    navigate('/')
  }

  const handleChangeRegister = (event) => {
    setRegisterInfo({ ...registerInfo, [event.target.name]: event.target.value })
  }

  const handleSubmitRegister = async (event) => {
    event.preventDefault()
    if (registerInfo.password !== registerInfo.confirmpassword) {
      alert('Password Must Match Confirm Password')
    } else if (registerInfo.username && registerInfo.email && registerInfo.password === registerInfo.confirmpassword) {
      let res = await registerUser(registerInfo)
      setRegisterInfo({ username: '', password: '', confirmpassword: '', email: '' })
      navigate('/')
    }
  }


  let login = (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmitLogin}>
        <input type="text" value={loginInfo.username.value} name="username" placeholder="Username" onChange={handleChangeLogin} />
        <input type="text" value={loginInfo.password.value} name="password" placeholder="Password" onChange={handleChangeLogin} />
        <button>Submit</button>
      </form>
    </div>
  )


  let register = (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmitRegister}>
        <input type="text" value={registerInfo.username.value} name="username" placeholder="Username" onChange={handleChangeRegister} />
        <input type="text" value={registerInfo.password.value} name="password" placeholder="Password" onChange={handleChangeRegister} />
        <input type="text" value={registerInfo.confirmpassword.value} name="confirmpassword" placeholder="Confirm Password" onChange={handleChangeRegister} />
        <input type="text" value={registerInfo.email.value} name="email" placeholder="Email" onChange={handleChangeRegister} />
        <button>Submit</button>
      </form>
    </div>
  )


  return (
    <div className="loginForm">
      {location.pathname === '/' ? login : register}
    </div>
  )
}