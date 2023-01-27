import { createContext } from 'react'

export const SelectedPiecesDKnLContext = createContext({
    pieces: null,
    save: () => {},
    clear: () => {}
})