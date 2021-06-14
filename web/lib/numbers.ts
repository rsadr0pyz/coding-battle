export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);


export const range = (size: number) => [...Array(size).keys()]