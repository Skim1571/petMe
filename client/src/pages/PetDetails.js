import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PetControls } from "../components/PetControls"
import { Client } from "../services/api"

export const PetDetails = ({ }) => {
  const [petDetails, setPetDetails] = useState()
  const [petDetailsRefresh, setPetDetailsRefresh] = useState(null)

  let { pet_id } = useParams()

  useEffect(() => {
    const getPetDetails = async () => {
      let res = await Client.get(`/pets/${pet_id}`)
      setPetDetails(res.data)
    }
    getPetDetails()
  }, [petDetailsRefresh])

  // console.log('lastFT', petDetails.last_fed_time.slice(0, 19).split('T'))
  let today = Date.now()

  console.log('today', today.toLocaleString('en-US', { hour12: false }))

  const hungerMeter = () => {
    let fedTime = petDetails.last_fed_time.slice(0, 19).split('T')
    let days = ''
  }

  let showDetails
  if (petDetails) {
    let backimg = {
      backgroundImage: `url(${petDetails.image_url})`
    }
    showDetails =
      <div className="petDetails">
        <div className="petScreen" style={backimg}>
          <h1>Hello</h1>
          <div className="petInfo">
            <h3>Species: {petDetails.species.name}</h3>
            <h1>Name: {petDetails.name}</h1>
            <h3>DOB: {petDetails.birth_date}</h3>
          </div>
          <PetControls petDetailsRefresh={petDetailsRefresh} setPetDetailsRefresh={setPetDetailsRefresh} petDetails={petDetails} setPetDetails={setPetDetails} />
        </div>
      </div>

  } else {
    <div className="gotLost" >
      <h1>You must have gotten lost!</h1>
      <h1>Your pet must be worrying about you! Hurry back!</h1>
    </div>
  }

  return (
    <div className="petDetails">
      <h1>PetDetails</h1>
      <div>
        {showDetails}
      </div>
    </div>
  )
}