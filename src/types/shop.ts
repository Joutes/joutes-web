import type {Event} from "@/pages/PublicPages/Home/types/event";

export interface Address {
    street: string;
    postal_code: number;
    city: string;
    country: string;
    department: string;
}

export interface Shop {
    id: number;
    slug: string;
    name: string;
    image: string;
    address: Address;
    website: string;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
    description?: string;
    games: string[];
    events?: Event[];
}
