import type {UpcomingEvent, FollowedEvent} from '../types/events';

const upcomingEvents: UpcomingEvent[] = [
    { id: 1, title: "Avant-première Modern Horizons 3", date: "15 Mai", game: "magic", type: "Prerelease" },
    { id: 2, title: "League Challenge Mai", date: "18 Mai", game: "pokemon", type: "Tournament" },
    { id: 3, title: "Regional Qualifier", date: "22 Mai", game: "yugioh", type: "Qualifier" },
];

const followedEvents: FollowedEvent[] = [
    { id: 4, title: "Soirée JDR & Jeux de plateau", date: "20 Mai", shop: "L'Antre du Dragon", game: "community" },
];

export const getUpcomingEvents = (): Promise<UpcomingEvent[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(upcomingEvents), 800);
    });
};

export const getFollowedEvents = (): Promise<FollowedEvent[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(followedEvents), 600);
    });
};
