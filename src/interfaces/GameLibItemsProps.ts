type ItemCategories = 'consumables' | string;

type ItemOnUseTypes = 'generic' | string;

type ItemUseTargetsTypes = 'entityTypes' | string;
type ItemUseTargetsEntityTypes = 'generic' | string;

export interface GameLibItemsProps {
  [itemName: string]: {
    id: string;
    categories: Array<ItemCategories>;
    name: string;
    trade?: {
      disableTrading: boolean;
    };
    description: string;
    utility?: string;
    image: string;
    onUse: {
      quantityChange: number;
      types: Array<ItemOnUseTypes>;
    };
    useTargets: {
      types: Array<ItemUseTargetsTypes>;
      entityTypes?: Array<ItemUseTargetsEntityTypes>;
    };
    inventory: {
      maxQuantity: number;
    };
  };
}
