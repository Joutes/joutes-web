import { Link } from 'react-router-dom';
import Logo from '@/assets/Logo.png';
import { useTranslation } from '@/hooks/useTranslation';
import { Lineicons } from '@lineiconshq/react-lineicons';
import {
    DiscordOutlined,
    GithubOutlined,
    XOutlined,
} from "@lineiconshq/free-icons";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="main-footer">
            <div className="footer-top">
                <div className="footer-links">
                    <Link to="/about">{t.footer.about}</Link>
                    <Link to="/cgu">{t.footer.cgu}</Link>
                    <Link to="/opensource">{t.footer.opensource}</Link>
                </div>
            </div>

            <div className="footer-middle">
                <Link to="/" className="footer-brand">
                    <img src={Logo} alt="Logo" className="footer-logo" />
                    <span className="footer-site-name">Joutes</span>
                </Link>

                <div className="social-links">
                    <a href="https://discord.gg/dZEGkZwJGB" target="_blank" rel="noopener noreferrer">
                        <Lineicons icon={DiscordOutlined} />
                    </a>
                    <a href="https://github.com/Joutes" target="_blank" rel="noopener noreferrer">
                        <Lineicons icon={GithubOutlined} />
                    </a>
                    <a href="https://x.com/JoutesApp" target="_blank" rel="noopener noreferrer">
                        <Lineicons icon={XOutlined} />
                    </a>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="copyright">
                    @2026 Joutes -&nbsp;
                    <strong>Joutes.app</strong> was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.
                </p>
                <div className="riot-disclaimer">
                    <p>

                    </p>
                </div>
            </div>
        </footer>
    );
}