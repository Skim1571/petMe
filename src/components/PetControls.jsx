import { useState } from "react"
import { useParams } from "react-router-dom"
import { Client } from "../services/api"

export const PetControls = ({ petDetails, petDetailsRefresh, setPetDetailsRefresh }) => {
  const [petState, setPetState] = useState({
    "hunger": petDetails.hunger,
    "affection": petDetails.affection,
    "health": petDetails.health,
    "last_fed_time": petDetails.last_fed_time,
    "last_play_time": petDetails.last_play_time
  })

  let { pet_id } = useParams()
  let counter = 0

  const handleClick = (event) => {
    event.preventDefault()
    console.log('details1', petState)
    updatePetInfo(event)

  }

  const updatePetInfo = async (event) => {
    let clickname = event.target.name
    let data = { [event.target.name]: (parseInt(petState[clickname]) + parseInt(event.target.value)) }
    counter++
    let res = await Client.patch(`/pets/${pet_id}`, data)
    setPetState({
      ...petState,
      ...data
    })
    setPetDetailsRefresh(counter)
  }

  return (
    <div>
      <div>
        <h1>Hunger: {petState.hunger} / 100</h1>
        <h1>Affection: {petState.affection} / 100</h1>
      </div>
      <div >
        <button className="petButtons" name="hunger" value={5} onClick={handleClick}>Feed Me</button>
        <button className="petButtons" name="affection" value={10} onClick={handleClick} >Pet Me</button>
      </div>
    </div>
  )
}