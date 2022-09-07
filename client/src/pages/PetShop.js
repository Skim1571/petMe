import { useState, useEffect } from 'react'
import { BASE_URL } from '../globals'
import axios from 'axios'
import { PetCard } from '../components/PetCard'

export const PetShop = () => {
  let showPetCard
  const [shopPets, setShopPets] = useState()

  const getShopPets = async () => {
    const res = await axios.get(`${BASE_URL}/users/3`)
    setShopPets(res.data.pets)
  }

  useEffect(() => {
    getShopPets()
    showPetCard = true
  }, [])

  if (shopPets) {
    showPetCard = <PetCard shopPets={shopPets} />
  }

  return (
    <div className='petshop'>
      <div>
        <h1>PetShop</h1>
      </div>
      <div className="container-grid">
        {showPetCard}
      </div>
    </div>
  )
}