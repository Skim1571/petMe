import { useState, useEffect } from "react"
import { Login } from "../components/Login"
import { BASE_URL } from "../globals"
import axios from "axios"
import jwt from 'jwt-decode'
import { PetCard } from "../components/PetCard"

export const Home = ({ myPets, setMyPets, user, setUser, setAuthToken, isLoggedIn, setIsLoggedIn }) => {


  const loginPanel = (
    <Login setUser={setUser} isLoggedIn={isLoggedIn} setAuthToken={setAuthToken} setIsLoggedIn={setIsLoggedIn} />
  )
  useEffect(() => {
    const getMyPets = async () => {
      let decodeToken = jwt(localStorage.getItem("token_access"))
      let res = await axios.get(`${BASE_URL}/users/${decodeToken.user_id}`)
      setMyPets(res.data.pets)
    }
    getMyPets()
  }, [user])

  // const myPetPanel = (

  // )
  let userData = (
    <div>
      <PetCard Pets={myPets} />
    </div>
  )



  return (
    <div>
      <h1>Home</h1>
      {!isLoggedIn ? loginPanel : userData}
    </div>
  )
}