import { createAuthClient } from "better-auth/react"
import { emailOTPClient, jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "https://tools.joutes.app",
  plugins: [
    emailOTPClient(),
    jwtClient(),
  ],
  fetchOptions: {
    onSuccess: (ctx) => {
      const authToken = ctx.response.headers.get("set-auth-token") // get the token from the response headers
      // Store the token securely (e.g., in localStorage)
      if(authToken){
        localStorage.setItem("bearer_token", authToken);
      }
    },
    auth: {
      type:"Bearer",
      token: () => localStorage.getItem("bearer_token") || "" // get the token from localStorage
    },
  },
});
