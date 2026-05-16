import type {Pagination} from "@/types/pagination.ts";

export interface Event {
    id: number;
    slug: string;
    title: string;
    image: string;
    short_description: string;
    description: string;
    date: string;
    followed: boolean;
    shop_id: number;
    game_code: string;
}

export interface EventsResponse {
    data: Event[];
    meta: {
        pagination: Pagination;
    };
}
