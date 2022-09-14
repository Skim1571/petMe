import { useState, useEffect } from 'react'
import { BASE_URL } from '../globals'
import axios from 'axios'
import { CreatePetForm } from '../components/CreatePetForm'


export const PetShop = ({ authToken, isLoggedIn }) => {
  const [shopPets, setShopPets] = useState()
  const [speciesList, setSpeciesList] = useState()

  useEffect(() => {
    const getSpecies = async () => {
      let res = await axios.get(`${BASE_URL}/species/`)
      setSpeciesList(res.data)
    }
    getSpecies()
  }, [isLoggedIn])

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
      {!speciesList ? '' : <CreatePetForm authToken={authToken} speciesList={speciesList} />}
    </div>
  )
}