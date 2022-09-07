import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BASE_URL } from "../globals"
import { CreatePetForm } from "../components/CreatePetForm"

export const PetDetails = ({ user }) => {
  const [petDetails, setPetDetails] = useState()


  let { pet_id } = useParams()

  useEffect(() => {
    const getPetDetails = async () => {
      let res = await axios.get(`${BASE_URL}/pets/${pet_id}`)
      setPetDetails(res.data)
    }
    getPetDetails()
  }, [pet_id])

  let showDetails
  if (petDetails) {
    showDetails =
      <div className="petDetails">
        <div>
          <img className="petimage" src={petDetails.image_url} />
        </div>
        <h3>Species: {petDetails.species.name}</h3>
        <h1>Name: {petDetails.name}</h1>
        <h3>DOB: {petDetails.birth_date}</h3>
        <h1></h1>
      </div>
  }


  let view
  if (pet_id) {
    if (petDetails) {
      view = (pet_id === 1 || pet_id === 2 || pet_id === 3) ? showDetails : <CreatePetForm petDetails={petDetails} />
    } else {
      return (
        <div className="gotLost" >
          <h1>You must have gotten lost!</h1>
          <h1>Your pet must be worrying about you! Hurry back!</h1>
        </div>
      )
    }
  }

  return (
    <div className="petDetails">
      <h1>PetDetails</h1>
      <div>
        {view}
      </div>
    </div>
  )
}