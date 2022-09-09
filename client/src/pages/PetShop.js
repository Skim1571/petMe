import { useState, useEffect } from 'react'
import { BASE_URL } from '../globals'
import axios from 'axios'
import { PetCard } from '../components/PetCard'

export const PetShop = ({ isLoggedIn }) => {
  let showPetCard
  const [shopPets, setShopPets] = useState()

  const getShopPets = async () => {
    const res = await axios.get(`${BASE_URL}/users/2`)
    setShopPets(res.data.pets)
  }

  useEffect(() => {
    getShopPets()
    showPetCard = true
  }, [])

  if (shopPets) {
    showPetCard = <PetCard shopPets={shopPets} />
  }

  const createPetCard = (
    < div className="card pet-card" onClick={() => console.log('you clicked this')}>
      <div className="info-wrapper">
        <img src="https://i.pinimg.com/originals/a7/3b/76/a73b76d0340098a90bb28d16f372ee0e.jpg" alt="Create Animal"></img>
        <h3>Click Here to Design Your Own Animal</h3>
      </div>
    </div>
  )

  return (
    <div className='petshop'>
      <div>
        <h1>PetShop</h1>
      </div>
      <div className="container-grid">
        <div>
          {showPetCard}
        </div>
        <div>
          {isLoggedIn ? createPetCard : ''}
        </div>
      </div>
    </div>
  )
}