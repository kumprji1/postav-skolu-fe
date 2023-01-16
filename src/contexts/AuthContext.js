import { createContext } from 'react'

export const AuthContext = createContext({
    userId: null,
    email: null,
    name: null,
    surname: null,
    role: null,
    token: null,
    login: () => {},
    logout: () => {}
})