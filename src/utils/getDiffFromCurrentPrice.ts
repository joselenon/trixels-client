const getDiffFromCurrentPrice = (cheapestListing: number, average: number) => {
  return (average / cheapestListing - 1) * 100;
};

export default getDiffFromCurrentPrice;
