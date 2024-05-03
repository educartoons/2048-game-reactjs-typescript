import { clone, filter, find, findIndex, orderBy } from "lodash"
import { createContext, useRef, useState } from "react"

type GameContext =
  | {
      tiles: Tile[]
      moveDown: () => void
      prepareNextMovement: () => void
      moveUp: () => void
      moveRight: () => void
      moveLeft: () => void
    }
  | undefined
export const GameContext = createContext<GameContext>(undefined)

type GameContextProviderProps = {
  children: React.ReactNode
}

export type Tile = {
  positionX: number
  positionY: number
  value: number
  merged: boolean
  remove: boolean
  id: string
}

const initTiles: Tile[] = [
  {
    positionX: 0,
    positionY: 0,
    value: 2,
    merged: false,
    remove: false,
    id: crypto.randomUUID(),
  },
  {
    positionX: 0,
    positionY: 2,
    value: 2,
    merged: false,
    remove: false,
    id: crypto.randomUUID(),
  },
  {
    positionX: 1,
    positionY: 1,
    value: 4,
    merged: false,
    remove: false,
    id: crypto.randomUUID(),
  },
  {
    positionX: 0,
    positionY: 3,
    value: 4,
    merged: false,
    remove: false,
    id: crypto.randomUUID(),
  },
]

export function GameContextProvider({ children }: GameContextProviderProps) {
  const [tiles, setTiles] = useState(initTiles)
  const tilesRef = useRef<Tile[] | null>(null)

  tilesRef.current = tiles

  const getTilesByColumn = (position: number) => {
    return tilesRef.current!.filter((tile) => tile.positionX === position)
  }

  const getTilesByRow = (position: number) => {
    return tilesRef.current!.filter((tile) => tile.positionY === position)
  }

  const prepareNextMovement = () => {
    const newTiles = filter(
      clone(tilesRef.current!).map((tile) => ({ ...tile, merged: false })),
      { remove: false }
    )
    setTiles(newTiles)
  }

  const createNewTile = (currTiles: Tile[]) => {
    const availablePositions: [number, number][] = []
    for (let i = 0; i <= 3; i++) {
      for (let j = 0; j <= 3; j++) {
        const tile = find(currTiles, { positionY: i, positionX: j })
        if (tile === undefined) {
          availablePositions.push([i, j])
        }
      }
    }

    const randomPosition = Math.floor(Math.random() * availablePositions.length)

    const newTile: Tile = {
      id: crypto.randomUUID(),
      value: 2,
      positionY: availablePositions[randomPosition][0],
      positionX: availablePositions[randomPosition][1],
      merged: false,
      remove: false,
    }

    return newTile
  }

  const moveDown = () => {
    let newTiles = clone(tilesRef.current!)

    const limit = 3
    for (let i = 0; i < 4; i++) {
      const tilesList = orderBy(getTilesByColumn(i), ["positionY"], "desc")
      // if we have tiles to move
      if (tilesList.length > 0) {
        tilesList.forEach((tile) => {
          if (tile.positionY !== limit) {
            let position = tile.positionY + 1
            while (position <= limit) {
              // we check the adjacent position
              const adjacent = find(tilesList, { positionY: position })
              const adjacentIndex = findIndex(newTiles, {
                positionY: position,
                positionX: adjacent?.positionX,
              })
              const currentIndex = findIndex(newTiles, {
                positionY: tile.positionY,
                positionX: tile.positionX,
              })
              if (adjacent === undefined) {
                newTiles[currentIndex].positionY = tile.positionY + 1
              } else if (
                adjacent.value === tile.value &&
                adjacent.merged === false
              ) {
                newTiles[currentIndex].positionY = position
                newTiles[currentIndex].remove = true
                newTiles[adjacentIndex].value = tile.value * 2
                newTiles[adjacentIndex].merged = true
                break
              } else {
                break
              }
              position++
            }
          }
        })
      }
    }

    newTiles = newTiles.concat(createNewTile(newTiles))

    setTiles(newTiles)
    setTimeout(() => {
      prepareNextMovement()
    }, 200)
  }

  const moveUp = () => {
    let newTiles = clone(tilesRef.current!)

    const limit = 0
    for (let i = 0; i < 4; i++) {
      const tilesList = orderBy(getTilesByColumn(i), ["positionY"], "asc")
      // if we have tiles to move
      if (tilesList.length > 0) {
        tilesList.forEach((tile) => {
          if (tile.positionY !== limit) {
            let position = tile.positionY - 1
            while (position >= limit) {
              // we check the adjacent position
              const adjacent = find(tilesList, { positionY: position })
              const adjacentIndex = findIndex(newTiles, {
                positionY: position,
                positionX: adjacent?.positionX,
              })
              const currentIndex = findIndex(newTiles, {
                positionY: tile.positionY,
                positionX: tile.positionX,
              })
              if (adjacent === undefined) {
                newTiles[currentIndex].positionY = position
              } else if (
                adjacent.value === tile.value &&
                adjacent.merged === false
              ) {
                newTiles[currentIndex].positionY = position
                newTiles[currentIndex].remove = true
                newTiles[adjacentIndex].value = tile.value * 2
                newTiles[adjacentIndex].merged = true
                break
              } else {
                break
              }
              position--
            }
          }
        })
      }
    }

    newTiles = newTiles.concat(createNewTile(newTiles))

    setTiles(newTiles)
    setTimeout(() => {
      prepareNextMovement()
    }, 200)
  }

  const moveRight = () => {
    let newTiles = clone(tilesRef.current!)

    const limit = 3
    for (let i = 0; i < 4; i++) {
      const tilesList = orderBy(getTilesByRow(i), ["positionX"], "desc")
      // if we have tiles to move
      if (tilesList.length > 0) {
        tilesList.forEach((tile) => {
          if (tile.positionX !== limit) {
            let position = tile.positionX + 1
            while (position <= limit) {
              // we check the adjacent position
              const adjacent = find(tilesList, { positionX: position })
              const adjacentIndex = findIndex(newTiles, {
                positionX: position,
                positionY: adjacent?.positionY,
              })
              const currentIndex = findIndex(newTiles, {
                positionY: tile.positionY,
                positionX: tile.positionX,
              })
              if (adjacent === undefined) {
                newTiles[currentIndex].positionX = position
              } else if (
                adjacent.value === tile.value &&
                adjacent.merged === false
              ) {
                newTiles[currentIndex].positionX = position
                newTiles[currentIndex].remove = true
                newTiles[adjacentIndex].value = tile.value * 2
                newTiles[adjacentIndex].merged = true
                break
              } else {
                break
              }
              position++
            }
          }
        })
      }
    }

    newTiles = newTiles.concat(createNewTile(newTiles))

    setTiles(newTiles)
    setTimeout(() => {
      prepareNextMovement()
    }, 200)
  }

  const moveLeft = () => {
    let newTiles = clone(tilesRef.current!)

    const limit = 0
    for (let i = 0; i < 4; i++) {
      const tilesList = orderBy(getTilesByRow(i), ["positionX"], "asc")
      // if we have tiles to move
      if (tilesList.length > 0) {
        tilesList.forEach((tile) => {
          if (tile.positionX !== limit) {
            let position = tile.positionX - 1
            while (position >= limit) {
              // we check the adjacent position
              const adjacent = find(tilesList, { positionX: position })
              const adjacentIndex = findIndex(newTiles, {
                positionX: position,
                positionY: adjacent?.positionY,
              })
              const currentIndex = findIndex(newTiles, {
                positionY: tile.positionY,
                positionX: tile.positionX,
              })
              if (adjacent === undefined) {
                newTiles[currentIndex].positionX = position
              } else if (
                adjacent.value === tile.value &&
                adjacent.merged === false
              ) {
                newTiles[currentIndex].positionX = position
                newTiles[currentIndex].remove = true
                newTiles[adjacentIndex].value = tile.value * 2
                newTiles[adjacentIndex].merged = true
                break
              } else {
                break
              }
              position--
            }
          }
        })
      }
    }

    newTiles = newTiles.concat(createNewTile(newTiles))

    setTiles(newTiles)
    setTimeout(() => {
      prepareNextMovement()
    }, 200)
  }

  return (
    <GameContext.Provider
      value={{
        tiles,
        moveDown,
        moveUp,
        moveRight,
        moveLeft,
        prepareNextMovement,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
