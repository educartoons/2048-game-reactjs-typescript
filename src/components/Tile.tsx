import { SQUARE_COLORS } from "../utils/constants"
import { Tile as TileType } from "../context/game-contex"
import { useEffect, useState } from "react"

const WIDTH = 100
const GAP = 16

type TileProps = {
  tile: TileType
}

export default function Tile({ tile }: TileProps) {
  const { positionX, positionY, value, merged } = tile
  const [scale, setScale] = useState(1)

  useEffect(() => {
    setScale(1.1)
    setTimeout(() => {
      setScale(1)
    }, 200)
  }, [merged])

  return (
    <div
      className="w-[100px] h-[100px] flex items-center justify-center rounded absolute transition-all duration-400 ease-out"
      style={{
        backgroundColor: SQUARE_COLORS.get(value)?.tileColor,
        top: positionY * (WIDTH + GAP),
        left: positionX * (WIDTH + GAP),
        transform: `scale(${scale})`,
      }}
    >
      <span
        className="text-5xl font-semibold "
        style={{
          color: SQUARE_COLORS.get(value)?.textColor,
        }}
      >
        {value}
      </span>
    </div>
  )
}
