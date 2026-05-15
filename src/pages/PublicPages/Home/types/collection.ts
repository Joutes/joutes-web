export interface TCGCollection {
    cards: number;
    total: number;
    value: string;
}

export interface CollectionSummary {
    totalCards: number;
    totalDecks: number;
    estimatedValue: string;
    byGame: Record<string, TCGCollection>;
}
