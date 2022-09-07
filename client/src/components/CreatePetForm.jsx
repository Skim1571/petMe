import { useState } from "react"

export const CreatePetForm = ({ petDetails }) => {
  const [newPetDetails, setNewPetDetails] = useState({})

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewPetDetails({
      name: event.target.value,
      species: petDetails.species.name,
      image_url: petDetails.image_url
    }
    )
  }

  const handleSubmit = (event) => {
    event.prevent.default()
    console.log('click')
  }

  return (
    <div className="createPet">
      <h1>Create Pet Form</h1>
      <div className='petimage'>
        <img src={petDetails.image_url} />
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name='name' placeholder="Name"></input>
        <button className="adoptBtn">Adopt me</button>
      </form>
    </div>
  )
}
