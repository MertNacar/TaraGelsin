import { createContext } from 'react'

const UserContext = createContext({ foods:[] })

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
export default UserContext