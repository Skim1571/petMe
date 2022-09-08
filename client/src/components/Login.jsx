import axios from "axios"
import { useState, useEffect } from "react"
import { BASE_URL } from "../globals"

export const Login = () => {
  const [loginInfo, setLoginInfo] = useState()
  const handleChange = (event) => {
    setLoginInfo(...loginInfo, `${event.target.name}: ${event.target.value}`)
  }

  const handleSubmit = async (event) => {
    event.prevent.default()
    console.log('triggered login submit')
  }

  useEffect(() => {
    const checkToken = async () => {
      const res = await axios.get(`${BASE_URL}/pets/`)
      console.log('The app is responding fine', res);
    }
    checkToken()
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={handleChange} />
        <input type="text" placeholder="Password" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}