import getDiffFromCurrentPrice from './getDiffFromCurrentPrice';

const diffFromCurrentPriceInfo = (listingPrice: number, metricValue: number) => {
  let cssName = 'null';

  const calc = getDiffFromCurrentPrice(listingPrice, metricValue);

  calc > 0 ? (cssName = 'positive') : (cssName = 'negative');
  calc === 0 && (cssName = 'null');

  return { css: cssName, percentage: calc, treatedString: `${calc.toFixed(2)}%` };
};

export default diffFromCurrentPriceInfo;
