import React from 'react';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { type IconData } from '@lineiconshq/free-icons';

interface InfoItemProps {
    icon: IconData;
    label?: string;
    value: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => {
    return (
        <div className="info-item">
            <div className="icon-wrapper">
                <Lineicons icon={icon} />
            </div>
            <div className="info-text">
                {label && <h3>{label}</h3>}
                <div className="info-value">{value}</div>
            </div>
        </div>
    );
};

export default InfoItem;
