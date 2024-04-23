import { createContext, useEffect, useState } from "react"
import { clone } from "lodash"

type GameContext =
  | {
      squares: Square[][]
      moveSquaresDown: () => void
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

const initialState = [
  [clone(Four), clone(Two), clone(Blank), clone(Blank)],
  [clone(Two), clone(Blank), clone(Blank), clone(Blank)],
  [clone(Two), clone(Blank), clone(Two), clone(Blank)],
  [clone(Blank), clone(Blank), clone(Blank), clone(Blank)],
]

function GameContextProvider({ children }: GameContextProviderProps) {
  const [squares, setSquares] = useState(initialState)

  const moveSquaresDown = () => {
    const newSquares = squares.map((nestedArray) =>
      nestedArray.map((obj) => ({
        ...obj,
        merged: false,
      }))
    )

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
            } else if (
              adjacent.value === current &&
              adjacent.merged === false
            ) {
              newSquares[k][j].value = current * 2
              newSquares[k][j].merged = true
              newSquares[k - 1][j].value = 0
              newSquares[k - 1][j].merged = false
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
    setSquares(copy)
  }

  useEffect(() => {}, [squares])

  return (
    <GameContext.Provider value={{ squares, moveSquaresDown }}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContextProvider }
