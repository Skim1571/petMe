import { useState } from "react"
import jwt from "jwt-decode"
import { Client } from "../services/api"
import { useNavigate } from "react-router-dom"


export const CreatePetForm = ({ authToken, speciesList }) => {
  const [newPetDetails, setNewPetDetails] = useState({})
  let animalSelectionImage
  let navigate = useNavigate()

  const handleChange = (event) => {
    setNewPetDetails({
      ...newPetDetails,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let userInfo = jwt(authToken.access)
    let speciesData = speciesList.filter(species => species.id === parseInt(newPetDetails.speciesChoice))
    let petData = {
      "user": userInfo.user_id,
      "name": newPetDetails.name,
      "species": speciesData[0],
      "image_url": speciesData[0].image_url
    }
    let res = await Client.post(`/pets/`, petData)
    navigate('/')
  }

  switch (parseInt(newPetDetails.speciesChoice)) {
    case 1:
      animalSelectionImage = speciesList[1].image_url
      break;
    case 2:
      animalSelectionImage = speciesList[0].image_url
      break;
    case 3:
      animalSelectionImage = speciesList[2].image_url
      break;
    default:
  }

  return (
    <div className="createPet">
      <h1 className="title">Choose Your Pet</h1>
      <div className='petimage'>
        <img src={animalSelectionImage} />
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name='name' placeholder="Name"></input>
        <select defaultValue="Selection" name="speciesChoice" onChange={handleChange}>
          <option name="Selection" value="Selection" disabled>Select Your Pet's Species</option>
          {speciesList.map((species) => (
            <option key={species.id} value={species.id}>{species.name}</option>
          ))}
        </select>
        <button className="adoptBtn">Adopt me</button>
      </form>
    </div>
  )
}