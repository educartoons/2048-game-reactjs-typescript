import Game from "./components/Game"
import { GameContextProvider } from "./context/game-contex"
import { SQUARE_COLORS } from "./utils/constants"

function App() {
  return (
    <GameContextProvider>
      <div className="bg-[#faf8ef] min-h-screen pt-8">
        <div className="w-[480px] mx-auto mb-8">
          <h2
            className="text-7xl font-semibold"
            style={{ color: SQUARE_COLORS.get(4)?.textColor }}
          >
            2048
          </h2>
          <p
            className="text-md font-normal mt-3"
            style={{ color: SQUARE_COLORS.get(0)?.textColor }}
          >
            Join the tiles, get to <strong>2048!</strong>
          </p>
        </div>
        <div className="flex h-full items-center flex-col">
          <Game />
        </div>
        <div className="w-[480px] mx-auto mt-10">
          <p
            className="text-md font-normal mt-3"
            style={{ color: SQUARE_COLORS.get(0)?.textColor }}
          >
            Developed by{" "}
            <a className="font-semibold" href="https://github.com/educartoons">
              @educartoons
            </a>{" "}
            using Typescript + ReactJS + TailwindCSS
          </p>
        </div>
      </div>
    </GameContextProvider>
  )
}

export default App
