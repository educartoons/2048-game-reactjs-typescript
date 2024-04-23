
export enum KeyNames {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight'
}

export function isAValidKey(key: string): boolean {
  return key in KeyNames
}