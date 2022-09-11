import { useState, useEffect } from "react"
import { BASE_URL } from "../globals"
import { tokenAccessCreator, getCookie } from "../services/Auth"
import axios from "axios"
import jwt from "jwt-decode"
import { Client } from "../services/api"

const auth = require('../services/Auth')

export const CreatePetForm = ({ authToken, user, speciesList }) => {
  const [newPetDetails, setNewPetDetails] = useState({})
  let animalSelectionImage


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
    // let data = {
    //   "username": userInfo.username,
    //   "password": "abcd",
    //   "id": userInfo.user_id,
    //   "pets": {
    //     "name": newPetDetails.name,
    //     "species": speciesData[0],
    //     "image_url": speciesData[0].image_url
    //   }
    // }
    // console.log('data', data)
    // let res = await Client.put(`/users/${userInfo.user_id}`, data)
    // console.log('post', res)

    let petData = {
      "user": userInfo.user_id,
      "name": newPetDetails.name,
      "species": speciesData[0],
      "image_url": speciesData[0].image_url
    }
    console.log('data', petData)
    let res = await Client.post(`/pets/`, petData)
    console.log('post', res)
    // let pet_id = res.data.id
    // let putData = {
    //   "pet"
    // }

    // let putres = await Client.put(`/users/${userInfo.user_id}`,)
    // console.log('putres', putres)
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
      <h1>Create Pet Form</h1>
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
