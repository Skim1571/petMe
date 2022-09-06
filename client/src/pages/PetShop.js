import { useState, useEffect } from 'react'
import { BASE_URL } from '../globals'
import axios from 'axios'
import { PetCard } from '../components/PetCard'

export const PetShop = () => {
  const [shopPets, setShopPets] = useState()

  const getShopPets = async () => {
    console.log('hello')
    const res = await axios.get(`${BASE_URL}/pets/`)
    setShopPets(res.data)
    console.log(res.data)
  }

  useEffect(() => {
    console.log('hello2')
    getShopPets()
  }, [])

  return (
    <div>
      <div>
        <h1>PetShop</h1>
      </div>
      <div>
        <PetCard shopPets={shopPets} />
      </div>


    </div>
  )
}