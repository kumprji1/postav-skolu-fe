import { createContext } from 'react'

export const CartContext = createContext({
    donations: null,
    products: null,
    addDonation: () => {},
    removeDonation: () => {},
    addDonations: () => {}
})