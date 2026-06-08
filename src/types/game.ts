export interface GameImage {
    icon: string;
    horizontal: string;
    vertical: string;
    banner: string;
}

export interface GameNote {
    accessibility: number | null;
    depth: number | null;
    interaction: number | null;
    replayability: number | null;
    budget: number | null;
}

export interface GameFormat {
    code: string;
    name: string;
    type: string;
    description: string;
}

export interface GameMetadata {
    publisher?: string;
    release_date?: string;
    players?: {
        min: number;
        max: number;
    };
    playing_time_minutes?: {
        min: number;
        max: number;
    };
}

export interface GameStats {
    community_rating?: number;
    popularity_score?: number;
}

export interface GameLinks {
    official_website?: string;
    x?: string;
    discord?: string;
    rules?: string;
}

export interface Game {
    code: string;
    name: string;
    description: string;
    longDescription?: string;
    note: GameNote | null;
    color: string;
    categories: string[];
    images: GameImage;
    gallery?: string[];
    links?: GameLinks;
    metadata?: GameMetadata;
    formats?: GameFormat[];
    stats?: GameStats;
}
