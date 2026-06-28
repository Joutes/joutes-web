import React from 'react';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { ArrowLeftOutlined } from "@lineiconshq/free-icons";
import './Banner.scss';

interface BannerProps {
    backgroundImage: string;
    iconImage?: string;
    title: string;
    onBack?: () => void;
    backLabel?: string;
    color?: string;
}

const Banner: React.FC<BannerProps> = ({
    backgroundImage,
    iconImage,
    title,
    onBack,
    backLabel,
    color
}) => {
    return (
        <div className="generic-banner" style={{ 
            backgroundImage: `url(${backgroundImage})`,
            '--banner-color': color 
        } as React.CSSProperties}>
            <div className="banner-overlay">
                {onBack && (
                    <button onClick={onBack} className="back-btn" title={backLabel}>
                        <Lineicons icon={ArrowLeftOutlined} />
                    </button>
                )}
                <div className="banner-content">
                    {iconImage && <img src={iconImage} alt="" className="banner-icon" />}
                    <h1 className="banner-title">{title}</h1>
                </div>
            </div>
        </div>
    );
};

export default Banner;
