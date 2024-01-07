import { ItemListingProps, ItemMarketData } from '../interfaces/ItemStatsComponentsProps';

export default function treatItemListings(listings: ItemMarketData['listings']) {
  if (!listings) return null;

  // Only buyable with $BERRY
  const treatedListings = listings.filter(
    (listing) => listing.currency === 'cur_berry',
  ) as ItemListingProps[];

  // Ascending Price
  treatedListings.sort((l1, l2) => l1.price - l2.price);

  return treatedListings;
}
