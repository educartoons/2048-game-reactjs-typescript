import { SQUARE_COLORS } from "../utils/constants"

type SquareProps = {
  value: number
}

export function Square({ value }: SquareProps) {
  return (
    <div
      className="w-[100px] h-[100px] flex items-center justify-center rounded"
      style={{
        backgroundColor: SQUARE_COLORS[value].tileColor,
        color: SQUARE_COLORS[value].textColor,
      }}
    >
      <span className="text-5xl font-semibold">
        {value !== 0 ? value : null}
      </span>
    </div>
  )
}
