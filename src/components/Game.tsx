import { useEffect } from "react"
import Placeholder from "./Placeholder"
import useGameContext from "../hooks/useGameContext"
import Tile from "./Tile"
import { isAValidKey, KeyNames } from "../utils/constants"

const grid: number[][] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

export default function Game() {
  const { tiles, moveDown, moveUp, moveRight, moveLeft } = useGameContext()

  const handleKeyPress = (event: KeyboardEvent) => {
    if (isAValidKey(event.key)) {
      switch (event.key) {
        case KeyNames.ArrowDown:
          moveDown()
          break
        case KeyNames.ArrowUp:
          moveUp()
          break
        case KeyNames.ArrowRight:
          moveRight()
          break
        case KeyNames.ArrowLeft:
          moveLeft()
          break
        default:
          break
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  return (
    <div>
      <div className="p-4 rounded-md bg-[#bbada0]">
        <div className="grid grid-cols-4 gap-4 relative">
          {grid.map((row, index) =>
            row.map((_, index2) => <Placeholder key={`${index}-${index2}`} />)
          )}
          {tiles.map((tile) => (
            <Tile key={tile.id} tile={tile} />
          ))}
        </div>
      </div>
    </div>
  )
}
