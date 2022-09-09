import { useState, useEffect } from "react"

export const CreatePetForm = ({ speciesList, tokenAccessCreator }) => {
  const [newPetDetails, setNewPetDetails] = useState({})

  let animalSelectionImage

  const handleChange = (event) => {
    setNewPetDetails({
      ...newPetDetails,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    tokenAccessCreator()
    console.log('click')
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
    default: console.log('default')
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
