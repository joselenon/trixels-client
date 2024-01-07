import {
  HistoryPricesAndTimeObj,
  MetricsProps,
} from '../interfaces/ItemStatsComponentsProps';

export default function historyPricesTreatment(
  historyPricesArray: HistoryPricesAndTimeObj,
): MetricsProps['averages'] {
  const averagePrice1h = (function () {
    const today = new Date();

    const todayNow = today.getTime() / 1000;
    const hoursInMs = 1 * 60 * 60 * 1000;
    const today1hBehind = (today.getTime() - hoursInMs) / 1000;

    const hourPrices = historyPricesArray.filter((registry) => {
      if (registry.time < todayNow && registry.time > today1hBehind) {
        return registry;
      }
    });

    const todayAverage =
      hourPrices.reduce((acc, listing) => acc + listing.value, 0) / hourPrices.length;

    return todayAverage;
  })();

  const averagePrice1d = (function () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStart = today.getTime() / 1000;
    today.setHours(23, 59, 59, 999);
    const todayEnd = today.getTime() / 1000;

    const todayPrices = historyPricesArray.filter((registry) => {
      if (registry.time > todayStart && registry.time < todayEnd) {
        return registry;
      }
    });

    const todayAverage =
      todayPrices.reduce((acc, listing) => acc + listing.value, 0) / todayPrices.length;

    return todayAverage;
  })();

  const averagePrice7d =
    historyPricesArray.reduce((acc, listing) => acc + listing.value, 0) /
    historyPricesArray.length;

  const averagesObj = {
    averagePrice1h: {
      caption: 'Avg. 1h',
      metricValue: averagePrice1h,
    },
    averagePrice1d: {
      caption: 'Avg. 1d',
      metricValue: averagePrice1d,
    },
    averagePrice7d: {
      caption: 'Avg. 7d',
      metricValue: averagePrice7d,
    },
  };

  return averagesObj;
}
