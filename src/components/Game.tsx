import { useEffect } from "react"
import useGameContext from "../hooks/useGameContext"
import { isAValidKey, KeyNames } from "../utils/constants"

export default function Game() {
  const { squares, moveSquaresDown } = useGameContext()

  const handleKeyPress = (event: KeyboardEvent) => {
    if (isAValidKey(event.key)) {
      switch (event.key) {
        case KeyNames.ArrowDown:
          moveSquaresDown()
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
      <div>
        {squares.map((row, j) => (
          <div key={j} className="flex">
            {row.map((square, i) => (
              <div
                key={`${j}-${i}`}
                className="w-[100px] h-[100px] border bg-stone-100 border-stone-200 items-center justify-center"
              >
                {square.value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
