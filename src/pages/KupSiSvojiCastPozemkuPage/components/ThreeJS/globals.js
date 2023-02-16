
// A_LENGTH - Length of an edge of one square landPiece (100,-) (the smallest)
export const A_LENGTH = 2.4205750708;

// frameWidth - Width (x length) of whole land (and height)
export const landFrameData = {
    width: 870,
    height: 330,
    transX: -60,
    transY: 50,
    transZ: 1,
    rotZ: -0
}

// landPiece init Pos and Rot (top left corner of landFrame)
export const landPieceInitPosAndRot = {
    transX: -landFrameData.width / 2 + landFrameData.transX,
    transY: landFrameData.height / 2 + landFrameData.transY - A_LENGTH / 2,
    rotZ: landFrameData.rotZ
}

// Colors 
export const getColorByPrice = (price) => {
    switch (true) {
        case price == 100: return '#005282'
        case price == 200: return '#54368a'
        case price < 500: return '#b00060'
        case price < 1_000: return '#ee7f00'
        case price < 5_000: return '#fbeb45'
        case price < 10_000: return '#a4c300'
        case price >= 10_000: return '#4bb080'
        default: console.log('Cannot get color by given price! Price: ', price)
    }
 }

 // PieceToDonate - Offset Stuff
 export const lastOffsets = {
    transX: 0,
    transY: 0,
 }

 export const setLastOffsets = (x, y) => {
    lastOffsets.transX = x 
    lastOffsets.transY = y
 }


