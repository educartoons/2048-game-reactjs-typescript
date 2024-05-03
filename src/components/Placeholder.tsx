import { SQUARE_COLORS } from "../utils/constants"

export default function Placeholder() {
  return (
    <div
      className="w-[100px] h-[100px] flex items-center justify-center rounded"
      style={{
        backgroundColor: SQUARE_COLORS.get(0)?.tileColor,
      }}
    ></div>
  )
}
