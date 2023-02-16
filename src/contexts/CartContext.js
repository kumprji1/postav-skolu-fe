import { createContext } from 'react'

export const CartContext = createContext({
    donations: null,
    products: null,
    pieces: null,
    addDonation: () => {},
    removeDonation: () => {},
    addDonations: () => {},
    addPieces: () => {},
    removePiece: () => {},
    clearCart: () => {}
})