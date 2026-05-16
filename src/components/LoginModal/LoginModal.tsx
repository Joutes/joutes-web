import { useTranslation } from '@/hooks/useTranslation';
import { useUIStore } from '@/store/uiStore';
import { useAuth } from 'react-oidc-context';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { XmarkOutlined, DiscordOutlined } from '@lineiconshq/free-icons';
import Logo from '@/assets/Logo.png';
import './LoginModal.scss';

export default function LoginModal() {
  const { t } = useTranslation();
  const { isLoginModalOpen, closeLoginModal } = useUIStore();
  const auth = useAuth();

  if (!isLoginModalOpen) return null;

  const handleLoginJoutes = () => {
    auth.signinRedirect();
    closeLoginModal();
  };

  const handleLoginDiscord = () => {
    auth.signinRedirect({
      extraQueryParams: {
        identity_provider: 'discord'
      }
    });
    closeLoginModal();
  };

  // Fermer si on clique sur l'overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLoginModal();
    }
  };

  return (
    <div className="login-modal-overlay" onClick={handleOverlayClick}>
      <div className="login-modal-content">
        <button className="close-modal-btn" onClick={closeLoginModal}>
          <Lineicons icon={XmarkOutlined} />
        </button>

        <div className="login-modal-header">
          <h2>{t.auth.modal_title}</h2>
          <p>{t.auth.modal_subtitle}</p>
        </div>

        <div className="login-options">
          <button className="login-option-btn joutes" onClick={handleLoginJoutes}>
            <img src={Logo} alt="Joutes" className="option-icon" />
            <span>{t.auth.login_with_joutes}</span>
          </button>

          <div className="divider">
            <span>OU</span>
          </div>

          <button className="login-option-btn discord" onClick={handleLoginDiscord}>
            <Lineicons icon={DiscordOutlined} />
            <span>{t.auth.login_with_discord}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
