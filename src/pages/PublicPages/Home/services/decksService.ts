import type {Deck} from '../types/decks';

const myDecks: Deck[] = [
    { id: 1, name: "Mono Red Aggro", game: "magic", lastEdit: "2 jours", champion: "Chandra, Hope's Beacon", image: "https://cards.scryfall.io/art_crop/front/a/1/a149a039-b883-49f9-ab51-37aa22bd0d16.jpg" },
    { id: 2, name: "Gardevoir ex", game: "pokemon", lastEdit: "5 jours", champion: "Gardevoir", image: "https://images.pokemontcg.io/sv1/86_hires.png" },
];

export const getMyDecks = (): Promise<Deck[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(myDecks), 700);
    });
};
