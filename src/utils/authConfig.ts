import type {AuthProviderProps} from "react-oidc-context";

export const oidcConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_AUTH_AUTHORITY,
  client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
  redirect_uri: window.location.origin + "/auth/callback",
  post_logout_redirect_uri: window.location.origin,
  scope: "openid profile email offline_access",
  onSigninCallback: (): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};
