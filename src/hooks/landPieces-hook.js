import { useReducer } from 'react'

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA': {
            console.log('SET_DATA')
            return { pieces: [...action.data] }
        }
        case 'ADD_PIECE': {
            console.log('ADD_PIECE (reducer), data:', action.data)
            return { pieces: [...state, {...action.data}] }
        }
        default:
            throw new Error('Špatný action v useLandPieces()')
    }
}
export const useLandPieces = (initState) => {
    const [landPiecesState, dispatch] = useReducer(reducer, {
        pieces: initState
    })

    const setData = (data) => {
        dispatch({type: 'SET_DATA', data: data})
    }

    const addPiece = (piece) => {
        dispatch({type: 'ADD_PIECE', data: piece})
    }

    return { landPiecesState, setData, addPiece }
}
