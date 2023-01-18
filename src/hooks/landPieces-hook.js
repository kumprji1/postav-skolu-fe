import { useReducer } from 'react'

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA': {
            console.log('SET_DATA')
            return { piecesToBuy: [...action.data] }
        }
        case 'ADD_PIECE': {
            console.log('ADD_PIECE (reducer), data:', action.data)
            return { piecesToBuy: [...state.piecesToBuy, {...action.data}] }
        }
        case 'REMOVE_PIECE': {
            console.log('useLandPieceHook - REMOVE_PIECE')
            const updatedPieces = state.piecesToBuy.filter(piece => piece.number !== action.number)
            return {piecesToBuy: updatedPieces}
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
