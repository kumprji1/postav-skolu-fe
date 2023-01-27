import { useCallback, useState, useEffect } from "react"

export const useSelectedPiecesDKnL = () => {
   const [pieces, setPieces] = useState()

   const save = useCallback((pcs) => {
    localStorage.setItem("selectedPiecesDKnL",
    JSON.stringify({
        pieces: pcs
    }))
   }, [])

   const clear = useCallback(() => {
    localStorage.removeItem("selectedPiecesDKnL");
   }, [])

   useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("selectedPiecesDKnL"));
    if (storedData) {
        save(storedData.pieces)
    }
   }, [save])
   
   return { pieces, save, clear}
}

