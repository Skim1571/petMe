import { useState } from "react"

export const CreatePetForm = ({ speciesList }) => {
  const [newPetDetails, setNewPetDetails] = useState({})

  const handleChange = (event) => {
    setNewPetDetails({
      name: event.target.value,
      species: speciesList.name,
    })
  }

  const handleSubmit = (event) => {
    event.prevent.default()
    console.log('click')
  }

  return (
    <div className="createPet">
      <h1>Create Pet Form</h1>
      {/* <div className='petimage'>
        <img src={speciesList.image_url} />
      </div> */}
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name='name' placeholder="Name"></input>
        <select>
          <option name="Selection" disabled>Select Your Pet's Species</option>
          {speciesList.map((species) => (
            <option key={species.id} name={species.name}>{species.name}</option>
          ))}
        </select>
        <button className="adoptBtn">Adopt me</button>
      </form>
    </div>
  )
}
