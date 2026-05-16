export interface Address {
    street: string;
    postal_code: number;
    city: string;
    country: string;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Shop {
    id: number;
    name: string;
    address: Address;
    coordinates: Coordinates;
    image: string;
}