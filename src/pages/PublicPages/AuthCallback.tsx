import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }
    if (auth.error) {
      console.error("Erreur d'authentification:", auth.error);
      navigate("/");
    }
  }, [auth.isAuthenticated, auth.error, navigate]);

  return (
    <div className="auth-callback-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '60vh',
      gap: '20px'
    }}>
      <div className="loader"></div>
      <p>Connexion en cours...</p>
      <style>{`
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-left-color: #08aeca;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
