import React from 'react';
import './InfoSection.scss';

interface InfoSectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, children, className }) => {
    return (
        <section className={`generic-info-section ${className || ''}`}>
            <h3>{title}</h3>
            <div className="info-list">
                {children}
            </div>
        </section>
    );
};

export default InfoSection;
