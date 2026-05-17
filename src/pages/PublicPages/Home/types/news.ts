import type {Pagination} from "@/types/pagination.ts";

export interface News {
    id: number;
    slug: string;
    title: string;
    tags?: string[];
    image: string;
    short_description: string;
    description: string;
    created_at: string;
    updated_at: string;
    shop_id: string | number;
    game_code: string;
}

export interface NewsResponse {
    data: News[];
    meta: {
        pagination: Pagination;
    };
}