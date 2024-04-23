import Game from "./components/Game"
import { GameContextProvider } from "./context/game-contex"

function App() {
  return (
    <GameContextProvider>
      <div>
        <h2>2048 Game</h2>
        <Game />
      </div>
    </GameContextProvider>
  )
}

export default App
