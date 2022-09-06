import { useNavigate } from "react-router-dom"

export const PetCard = ({ shopPets }) => {
  let navigate = useNavigate()

  const showPets = (pet) => {
    navigate(`/pets/${pet.id}`)
  }

  return (
    <div className="pet-card-grid">
      {
        shopPets.map((pet) => (
          <div key={pet._id} className="card pet-card" onClick={() => showPets(pet)}>
            <div className="info-wrapper flex-col">
              <h3>{pet.petName}</h3>
            </div>
          </div>
        ))
      }
    </div>
  )
}