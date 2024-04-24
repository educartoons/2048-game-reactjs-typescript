import { createContext, useState } from "react"
import { clone } from "lodash"

type GameContext =
  | {
      squares: Square[][]
      moveSquaresDown: () => void
      moveSquaresUp: () => void
      moveSquaresLeft: () => void
      moveSquaresRight: () => void
    }
  | undefined

export const GameContext = createContext<GameContext>(undefined)

type GameContextProviderProps = {
  children: React.ReactNode
}

type Square = {
  value: number
  merged: boolean
}

const Blank: Square = {
  value: 0,
  merged: false,
}

const Four: Square = {
  value: 4,
  merged: false,
}

const Two: Square = {
  value: 2,
  merged: false,
}

const Eight: Square = {
  value: 8,
  merged: false,
}

const initialState = [
  [clone(Two), clone(Blank), clone(Blank), clone(Blank)],
  [clone(Blank), clone(Blank), clone(Blank), clone(Blank)],
  [clone(Blank), clone(Blank), clone(Blank), clone(Blank)],
  [clone(Eight), clone(Two), clone(Two), clone(Two)],
]

type Point = [number, number]

function GameContextProvider({ children }: GameContextProviderProps) {
  const [squares, setSquares] = useState(initialState)

  const getAFreeSpot = (values: Square[][]): Point => {
    const indexes: [number, number][] = []

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (values[i][j].value === 0) {
          indexes.push([i, j])
        }
      }
    }

    const randomIndex = Math.floor(Math.random() * indexes.length)

    const point = indexes[randomIndex]

    return point
  }

  const moveSquaresDown = () => {
    const newSquares = squares.map((nestedArray) =>
      nestedArray.map((obj) => ({
        ...obj,
        merged: false,
      }))
    )

    let hasMerged = false

    const length = newSquares.length
    const border = length - 1
    for (let j = 0; j < length; j++) {
      for (let i = length - 1; i > -1; i--) {
        const current = newSquares[i][j].value

        // We move the element to the edge if it is not 0 or it is located on the limit
        if (i !== border && current !== 0) {
          let k = i + 1
          while (k <= border) {
            const adjacent = { ...newSquares[k][j] }
            if (adjacent.value === 0) {
              newSquares[k - 1][j].value = 0
              newSquares[k][j].value = current
              hasMerged = true
            } else if (
              adjacent.value === current &&
              adjacent.merged === false
            ) {
              newSquares[k][j].value = current * 2
              newSquares[k][j].merged = true
              newSquares[k - 1][j].value = 0
              newSquares[k - 1][j].merged = false
              hasMerged = true
            } else {
              break
            }
            k++
          }
        }
      }
    }

    const copy = newSquares.map((nestedArray) =>
      nestedArray.map((obj) => ({
        ...obj,
        merged: false,
      }))
    )
    if (hasMerged) {
      const point = getAFreeSpot(newSquares)
      copy[point[0]][point[1]] = {
        value: 2,
        merged: false,
      }
    }

    setSquares(copy)
  }

  const moveSquaresUp = () => {
    const newSquares = squares.map((nestedArray) =>
      nestedArray.map((obj) => ({
        ...obj,
        merged: false,
      }))
    )

    let hasMerged = false

    const length = newSquares.length
    const border = 0
    for (let j = 0; j < length; j++) {
      for (let i = 0; i < length; i++) {
        const current = newSquares[i][j].value

        // We move the element to the edge if it is not 0 or it is located on the limit
        if (i !== border && current !== 0) {
          let k = i - 1
          while (k >= border) {
            const adjacent = { ...newSquares[k][j] }
            if (adjacent.value === 0) {
              newSquares[k][j].value = current
              newSquares[k + 1][j].value = 0
              hasMerged = true
            } else if (
              adjacent.value === current &&
              adjacent.merged === false
            ) {
              newSquares[k][j].value = current * 2
              newSquares[k][j].merged = true
              newSquares[k + 1][j].value = 0
              newSquares[k + 1][j].merged = false
              hasMerged = true
            } else {
              break
            }
            k--
          }
        }
      }
    }

    const copy = newSquares.map((nestedArray) =>
      nestedArray.map((obj) => ({
        ...obj,
        merged: false,
      }))
    )
    if (hasMerged) {
      const point = getAFreeSpot(newSquares)
      copy[point[0]][point[1]] = {
        value: 2,
        merged: false,
      }
    }
    setSquares(copy)
  }

  const moveSquaresLeft = () => {
    const newSquares = squares.map((nestedArray) =>
      nestedArray.map((obj) => ({
        ...obj,
        merged: false,
      }))
    )

    let hasMerged = false

    const length = newSquares.length
    const border = 0
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        const current = newSquares[i][j].value

        // We move the element to the edge if it is not 0 or it is located on the limit
        if (j !== border && current !== 0) {
          let k = j - 1
          while (k >= border) {
            const adjacent = { ...newSquares[i][k] }
            if (adjacent.value === 0) {
              newSquares[i][k].value = current
              newSquares[i][k + 1].value = 0
              hasMerged = true
            } else if (
              adjacent.value === current &&
              adjacent.merged === false
            ) {
              newSquares[i][k].value = current * 2
              newSquares[i][k].merged = true
              newSquares[i][k + 1].value = 0
              newSquares[i][k + 1].merged = false
              hasMerged = true
            } else {
              break
            }
            k--
          }
        }
      }
    }

    const copy = newSquares.map((nestedArray) =>
      nestedArray.map((obj) => ({
        ...obj,
        merged: false,
      }))
    )
    if (hasMerged) {
      const point = getAFreeSpot(newSquares)
      copy[point[0]][point[1]] = {
        value: 2,
        merged: false,
      }
    }
    setSquares(copy)
  }

  const moveSquaresRight = () => {
    const newSquares = squares.map((nestedArray) =>
      nestedArray.map((obj) => ({
        ...obj,
        merged: false,
      }))
    )

    let hasMerged = false

    const length = newSquares.length
    const border = length - 1
    for (let i = 0; i < length; i++) {
      for (let j = length - 1; j > -1; j--) {
        const current = newSquares[i][j].value

        // Right
        if (j !== border && current !== 0) {
          let k = j + 1
          while (k <= border) {
            const adjacent = { ...newSquares[i][k] }
            if (adjacent.value === 0) {
              newSquares[i][k].value = current
              newSquares[i][k - 1].value = 0
              hasMerged = true
            } else if (
              adjacent.value === current &&
              adjacent.merged === false
            ) {
              newSquares[i][k].value = current * 2
              newSquares[i][k].merged = true
              newSquares[i][k - 1].value = 0
              newSquares[i][k - 1].merged = false
              hasMerged = true
            } else {
              break
            }
            k++
          }
        }
      }
    }

    const copy = newSquares.map((nestedArray) =>
      nestedArray.map((obj) => ({
        ...obj,
        merged: false,
      }))
    )
    if (hasMerged) {
      const point = getAFreeSpot(newSquares)
      copy[point[0]][point[1]] = {
        value: 2,
        merged: false,
      }
    }
    setSquares(copy)
  }

  return (
    <GameContext.Provider
      value={{
        squares,
        moveSquaresDown,
        moveSquaresUp,
        moveSquaresLeft,
        moveSquaresRight,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export { GameContextProvider }
