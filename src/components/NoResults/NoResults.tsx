import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import './NoResults.scss';

interface NoResultsProps {
    message?: string;
    icon?: React.ReactNode;
}

export default function NoResults({ message, icon }: NoResultsProps) {
    const { t } = useTranslation();
    
    return (
        <div className="no-results-container">
            <div className="no-results-content">
                {icon && <div className="no-results-icon">{icon}</div>}
                <p className="no-results-message">{message || t.header.no_results}</p>
            </div>
        </div>
    );
}
