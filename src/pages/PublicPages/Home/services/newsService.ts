import type {NewsItem} from '../types/news';

const news: NewsItem[] = [
    { 
        id: 1, 
        title: "Nouvelles extensions annoncées pour 2026", 
        description: "Le calendrier des sorties pour l'année 2026 vient d'être révélé. Préparez-vous à découvrir des mécaniques inédites et des mondes inexplorés dans vos TCG préférés.",
        timeAgo: "Il y a 3h", 
        fullDate: "15 Mai 2026",
        tags: ["annonce", "promo"],
        game: "magic",
        image: "https://images.unsplash.com/photo-1611891487122-207579d67d98?auto=format&fit=crop&q=80&w=800"
    },
    { 
        id: 2, 
        title: "Bannissements en format Standard", 
        description: "Le comité d'arbitrage a rendu son verdict. Trois cartes majeures quittent le format Standard dès lundi prochain pour préserver l'équilibre du jeu compétitif.",
        timeAgo: "Hier", 
        fullDate: "14 Mai 2026",
        tags: ["rules"],
        game: "pokemon",
        image: "https://images.unsplash.com/photo-1511149755252-35875b273fd6?auto=format&fit=crop&q=80&w=800"
    },
    { 
        id: 3, 
        title: "Ouverture d'une nouvelle boutique à Lyon", 
        description: "La communauté s'agrandit ! Une nouvelle enseigne dédiée aux jeux de cartes et de plateau ouvre ses portes au cœur du 2ème arrondissement.",
        timeAgo: "Il y a 2 jours", 
        fullDate: "13 Mai 2026",
        tags: ["community"],
        game: "lorcana",
        image: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=800"
    },
];

export const getNews = (): Promise<NewsItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(news), 1000);
    });
};
