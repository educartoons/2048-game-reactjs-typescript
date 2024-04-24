
export enum KeyNames {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight'
}

export function isAValidKey(key: string): boolean {
  return key in KeyNames
}

export const SQUARE_COLORS = {
  0: {
    tileColor: '#cdc1b4', // Empty tile color
    textColor: '#776e65' // Text color for empty tile
  },
  2: {
    tileColor: '#eee4da', // Tile with value 2
    textColor: '#776e65' // Text color for tile with value 2
  },
  4: {
    tileColor: '#ede0c8', // Tile with value 4
    textColor: '#776e65' // Text color for tile with value 4
  },
  8: {
    tileColor: '#f2b179', // Tile with value 8
    textColor: '#f9f6f2' // Text color for tile with value 8
  },
  16: {
    tileColor: '#f59563', // Tile with value 16
    textColor: '#f9f6f2' // Text color for tile with value 16
  },
  32: {
    tileColor: '#f67c5f', // Tile with value 32
    textColor: '#f9f6f2' // Text color for tile with value 32
  },
  64: {
    tileColor: '#f65e3b', // Tile with value 64
    textColor: '#f9f6f2' // Text color for tile with value 64
  },
  128: {
    tileColor: '#edcf72', // Tile with value 128
    textColor: '#f9f6f2' // Text color for tile with value 128
  },
  256: {
    tileColor: '#edcc61', // Tile with value 256
    textColor: '#f9f6f2' // Text color for tile with value 256
  },
  512: {
    tileColor: '#edc850', // Tile with value 512
    textColor: '#f9f6f2' // Text color for tile with value 512
  },
  1024: {
    tileColor: '#edc53f', // Tile with value 1024
    textColor: '#f9f6f2' // Text color for tile with value 1024
  },
  2048: {
    tileColor: '#edc22e', // Tile with value 2048
    textColor: '#f9f6f2' // Text color for tile with value 2048
  },
  gridColor: '#bbada0' // Background grid color
};