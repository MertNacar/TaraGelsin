import { createContext } from 'react'

const UserContext = createContext({ token: null, user: null })

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
export default UserContext