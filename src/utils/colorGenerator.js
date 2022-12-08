export function getRandomNumberString(base = 16, length = 6) {
  const max = Math.pow(base, length);
  const decimal = Math.floor(Math.random() * max);
  const hexString = decimal.toString(base).padStart(length, '0');
  return hexString;
}

export function randomColorSet(set) {
  while (set.size < 3) {
    set.add(`#${getRandomNumberString().toUpperCase()}`);
  }
}
