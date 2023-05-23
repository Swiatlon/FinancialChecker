export function formatNumber(number) {
  if (number >= 10_000) {
    const suffixes = ['', 'k', 'M', 'B', 'T'];
    const suffixNum = Math.floor(`${number}`.length / 3);
    let shortNumber = parseFloat((suffixNum !== 0 ? number / 1000 ** suffixNum : number).toPrecision(2));
    if (shortNumber % 1 !== 0) {
      shortNumber = shortNumber.toFixed(1);
    }
    return shortNumber + suffixes[suffixNum];
  }
  return number;
}
