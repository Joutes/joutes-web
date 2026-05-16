export interface GameImage {
    icon: string;
    horizontal: string;
    vertical: string;
}

export interface Game {
    code: string;
    name: string;
    color: string;
    images: GameImage;
}
