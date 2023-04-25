import { useReducer } from 'react'

function updateLocalStorage(newState) {
    // localStorage.setItem("selectedPiecesDKnL",
    // JSON.stringify({
    //     pieces: newState.piecesToBuy
    // }))
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA': {
            const newState = { piecesToBuy: [...action.data] }
            return newState
        }
        case 'ADD_PIECE': {
            const newState = { piecesToBuy: [...state.piecesToBuy, {...action.data}] }
            updateLocalStorage(newState)
            return newState
        }
        case 'REMOVE_PIECE': {
            const updatedPieces = state.piecesToBuy.filter(piece => piece.number !== action.number)
            const newState = {piecesToBuy: updatedPieces}
            updateLocalStorage(newState)
            return newState
        }
                default:
            throw new Error('Špatný action v useLandPieces()')
    }
}
export const useLandPieces = (initState) => {
    const [landPiecesState, dispatch] = useReducer(reducer, initState)

    const setData = (data) => {
        dispatch({type: 'SET_DATA', data: data})
    }

    const addPiece = (piece) => {
        dispatch({type: 'ADD_PIECE', data: piece})
    }

    const removePiece = (number) => {
        dispatch({type: 'REMOVE_PIECE', number: number})
    }

    return { landPiecesState, setData, addPiece, removePiece }
}
