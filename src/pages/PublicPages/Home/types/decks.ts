import type {Pagination} from "@/types/pagination.ts";

export interface Deck {
    id: number;
    name: string;
    game_code: string;
    created_at: string;
    updated_at: string;
    selected_card_id?: number;
    creator_id: number;
}

export interface DecksResponse {
    data: Deck[];
    meta: {
        pagination: Pagination;
    };
}