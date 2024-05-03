
export enum KeyNames {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight'
}

export function isAValidKey(key: string): boolean {
  return key in KeyNames
}

export const SQUARE_COLORS: Map<number, { tileColor: string, textColor: string }> = new Map([
  [0, { tileColor: '#cdc1b4', textColor: '#776e65' }], // Empty tile
  [2, { tileColor: '#eee4da', textColor: '#776e65' }], // Tile with value 2
  [4, { tileColor: '#ede0c8', textColor: '#776e65' }], // Tile with value 4
  [8, { tileColor: '#f2b179', textColor: '#f9f6f2' }], // Tile with value 8
  [16, { tileColor: '#f59563', textColor: '#f9f6f2' }], // Tile with value 16
  [32, { tileColor: '#f67c5f', textColor: '#f9f6f2' }], // Tile with value 32
  [64, { tileColor: '#f65e3b', textColor: '#f9f6f2' }], // Tile with value 64
  [128, { tileColor: '#edcf72', textColor: '#f9f6f2' }], // Tile with value 128
  [256, { tileColor: '#edcc61', textColor: '#f9f6f2' }], // Tile with value 256
  [512, { tileColor: '#edc850', textColor: '#f9f6f2' }], // Tile with value 512
  [1024, { tileColor: '#edc53f', textColor: '#f9f6f2' }], // Tile with value 1024
  [2048, { tileColor: '#edc22e', textColor: '#f9f6f2' }] // Tile with value 2048
]);