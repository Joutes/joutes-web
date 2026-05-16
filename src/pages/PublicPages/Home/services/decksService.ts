import type {Deck} from '../types/decks';
import api from '@/services/api';

let decksPromise: Promise<Deck[]> | null = null;

export const getMyDecks = async (): Promise<Deck[]> => {
    if (decksPromise) {
        return decksPromise;
    }

    decksPromise = api.get<Deck[]>('/decks/my')
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur lors de la récupération de mes decks:", error);
            return [];
        })
        .finally(() => {
            decksPromise = null;
        });

    return decksPromise;
};
