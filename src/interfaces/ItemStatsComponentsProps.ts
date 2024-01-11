import { SetStateAction } from 'react';

export interface ItemListingProps {
  createdAt: number;
  currency: string;
  ownerId: string;
  price: number;
  quantity: number;
  _id: number;
  purchasedQuantity: number;
  claimedQuantity: number;
}

export type ItemListingKeys = keyof ItemListingProps;

export interface GetItemsListingsProps {
  [itemName: string]: ItemMarketData;
}

export interface ItemMarketData {
  listings: ItemListingProps[];
  ownerUsernames: { [id: string]: string } | null | undefined;
}

export type HistoryPricesAndTimeObj = { value: number; time: number }[];

export type ItemHistoryPricesData = {
  [itemName: string]: { value: number; time: number }[];
};

export type ItemMetricsProps = {
  averagePrice1h: number;
  averagePrice1d: number;
  averagePrice7d: number;
  /*   pricesArray: number[];
  daysArray: number[]; */
};

export type MetricsProps = {
  cheapestListing: ItemListingProps | undefined;
  averages:
    | {
        averagePrice1h: { caption: string; metricValue: number };
        averagePrice1d: { caption: string; metricValue: number };
        averagePrice7d: { caption: string; metricValue: number };
      }
    | undefined;
};

export type ItemProp = {
  [itemName: string]: {
    image: string;
    metrics: MetricsProps | undefined;
    market: ItemMarketData;
  };
};

export interface ItemStatsProps {
  itemName: string | undefined;
  showMetrics?: Array<keyof ItemMetricsProps>;
  itemInfoUpdated: ItemProp;
}

export interface ItemInfoProps extends MetricsProps {
  itemName: string;
}
