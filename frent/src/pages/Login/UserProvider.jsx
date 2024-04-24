import { UserContext } from "./UserContext"

const usuario = [
    {
        id: 1,
        nombre: 'Armando',
        user: 'client'
    },
    {
        id: 2,
        nombre: 'Gaspar',
        user: 'friend'
    }
]


export default function UserProvider({Children}) {
  return (
    <UserContext.Provider value={usuario}>
        {Children}
    </UserContext.Provider>
  )
}
