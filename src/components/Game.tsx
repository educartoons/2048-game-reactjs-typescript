import { useEffect } from "react"
import useGameContext from "../hooks/useGameContext"
import { isAValidKey, KeyNames, SQUARE_COLORS } from "../utils/constants"
import { Square } from "./Square"

export default function Game() {
  const {
    squares,
    moveSquaresDown,
    moveSquaresUp,
    moveSquaresLeft,
    moveSquaresRight,
  } = useGameContext()

  const handleKeyPress = (event: KeyboardEvent) => {
    if (isAValidKey(event.key)) {
      console.log(event.key)
      switch (event.key) {
        case KeyNames.ArrowDown:
          moveSquaresDown()
          break
        case KeyNames.ArrowUp:
          moveSquaresUp()
          break
        case KeyNames.ArrowLeft:
          moveSquaresLeft()
          break
        case KeyNames.ArrowRight:
          moveSquaresRight()
          break
        default:
          break
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    console.log("ed")
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [squares])
  return (
    <div
      className="p-4 rounded-md"
      style={{ backgroundColor: SQUARE_COLORS.gridColor }}
    >
      <div className="grid grid-cols-4 gap-4">
        {squares.map((row, y) =>
          row.map((square, x) => (
            <Square key={`${y}-${x}`} value={square.value} />
          ))
        )}
      </div>
    </div>
  )
}
