export function convertedToSubcurrency(cur: number) {
  const mul = 100;
  return Math.round(cur * mul);
}
