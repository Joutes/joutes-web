import type {CollectionSummary} from '../types/collection';

const collectionSummary: CollectionSummary = {
    totalCards: 1250,
    totalDecks: 8,
    estimatedValue: "1,450.00 €",
    byGame: {
        magic: { cards: 800, total: 2500, value: "950 €" },
        pokemon: { cards: 450, total: 1200, value: "500 €" },
        yugioh: { cards: 0, total: 3000, value: "0 €" },
        lorcana: { cards: 0, total: 1000, value: "0 €" },
        onepiece: { cards: 0, total: 800, value: "0 €" },
    }
};

export const getCollectionSummary = (): Promise<CollectionSummary> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(collectionSummary), 900);
    });
};
