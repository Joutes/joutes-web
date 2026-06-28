import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useGames } from '@/hooks/useGames';
import type { Shop } from '@/types/shop';
import { getShops } from './services/shopsService';
import SectionLoader from '@/components/SectionLoader/SectionLoader';
import NoResults from '@/components/NoResults/NoResults';
import './ShopsListPage.scss';

export default function ShopsListPage() {
    const { t } = useTranslation();
    const [shops, setShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getShops().then(data => {
            setShops(data);
            setLoading(false);
        });
    }, []);

    const shopsByCountryAndDepartment = useMemo(() => {
        const grouped: Record<string, Record<string, Shop[]>> = {};
        
        shops.forEach(shop => {
            const country = shop.address.country || 'France';
            if (!grouped[country]) {
                grouped[country] = {};
            }

            const deptName = shop.address.department;

            if (!grouped[country][deptName]) {
                grouped[country][deptName] = [];
            }
            grouped[country][deptName].push(shop);
        });

        // Trier les pays puis les départements
        const sorted: Record<string, Record<string, Shop[]>> = {};
        Object.keys(grouped).sort().forEach(country => {
            sorted[country] = Object.keys(grouped[country]).sort().reduce((acc, key) => {
                acc[key] = grouped[country][key];
                return acc;
            }, {} as Record<string, Shop[]>);
        });

        return sorted;
    }, [shops]);

    if (loading) return <SectionLoader />;

    if (shops.length === 0) {
        return (
            <div className="shops-list-page">
                <header className="page-header">
                    <h1 className="gradient-text">{t.shops.title}</h1>
                </header>
                <NoResults message={t.shops.no_shops} />
            </div>
        );
    }

    return (
        <div className="shops-list-page">
            <header className="page-header">
                <h1 className="gradient-text">{t.shops.title}</h1>
            </header>

            <div className="countries-container">
                {Object.entries(shopsByCountryAndDepartment).map(([country, departments]) => (
                    <div key={country} className="country-section">
                        <h2 className="country-title">{country}</h2>
                        <div className="departments-container">
                            {Object.entries(departments).map(([dept, shopsInDept]) => (
                                <section key={dept} className="department-section">
                                    <h3 className="department-title">{dept}</h3>
                                    <div className="shops-grid">
                                        {shopsInDept.map(shop => (
                                            <ShopCard key={shop.id} shop={shop} />
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ShopCard({ shop }: { shop: Shop }) {
    const navigate = useNavigate();
    const { getGameByCode } = useGames();
    
    const handleCardClick = () => {
        navigate(`/shops/${shop.slug}`);
    };

    const maxGames = 2;

    return (
        <div className="shop-card" onClick={handleCardClick}>
            <div className="shop-image-container">
                <img src={shop.image} alt={shop.name} className="shop-image" />
                <div className="shop-overlay">
                    <div className="shop-content">
                        <h3 className="shop-name-overlay">{shop.name}</h3>
                        <p className="shop-address-overlay">{shop.address.street}, {shop.address.postal_code} {shop.address.city}</p>
                        
                        <div className="shop-tags">
                            {(shop.games || []).slice(0, maxGames).map(tagCode => {
                                const game = getGameByCode(tagCode);
                                return (
                                    <span 
                                        key={tagCode} 
                                        className="shop-tag" 
                                        style={{ '--game-color': game?.color || '#666' } as React.CSSProperties}
                                    >
                                        {game?.name || tagCode}
                                    </span>
                                );
                            })}
                            {(shop.games?.length || 0) > maxGames && (
                                <span className="shop-tag-more">+ {(shop.games?.length || 0) - maxGames} jeux</span>
                            )}
                        </div>

                        {shop.description && (
                            <div className="shop-description-hover">
                                <p>{shop.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
