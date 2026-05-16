import './SectionMessage.scss';

interface SectionMessageProps {
    message: string;
    type?: 'empty' | 'error';
}

export default function SectionMessage({ message, type = 'empty' }: SectionMessageProps) {
    return (
        <div className={`section-message ${type}`}>
            <p>{message}</p>
        </div>
    );
}
