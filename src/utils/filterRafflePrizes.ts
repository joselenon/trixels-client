export default function filterRafflePrizes(prizes: string) {
  const prizesParsed = JSON.parse(prizes);
  return prizesParsed;
}
