import { useNavigate } from "react-router-dom"

export const PetCard = ({ Pets }) => {
  let navigate = useNavigate()

  const showPets = (pet) => {
    navigate(`/pets/${pet.id}`)
  }

  return (
    <div className="pet-card-grid">
      {
        Pets.map((pet) => (
          < div key={pet.id} className="card pet-card" onClick={() => showPets(pet)}>
            <div className="info-wrapper">
              <img src={pet.image_url} alt={pet.name}></img>
              <h3>Name: {pet.name}</h3>
              <h3>Species: {pet.species.name}</h3>
              <h3>Age: {pet.age}</h3>
              <h3>Birthdate: {pet.birth_date}</h3>
            </div>
          </div>
        ))
      }
    </div >
  )
}