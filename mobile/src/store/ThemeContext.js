import { createContext } from 'react'

const UserContext = createContext({ themes:[] })

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
export default UserContext