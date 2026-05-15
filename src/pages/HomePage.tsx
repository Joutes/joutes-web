import {Helmet} from 'react-helmet-async';
import {useEffect, useState} from "react";
import {authClient} from "@/auth-client.ts";
import {useTranslation} from "@/hooks/useTranslation.ts";
import api from "@/services/api.ts";

export default function HomePage() {
  const {t} = useTranslation();
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [col, setCol] = useState<null | { name: string }[]>(null)

  const session = authClient.useSession();

  // @TODO: Very ugly demo for using user-authenticated route
  useEffect(() => {
    if (col || !session.data?.user) {
      return;
    }

    api('https://tools.joutes.app/api/collection/cards').then(async (res) => {
      const cards = await res.data;

      console.log(cards);

      setCol(cards);
    });
  }, [session, col]);

  return (
    <section>
      <Helmet>
        <title>Accueil | Joutes</title>
        <html lang="fr"/>
      </Helmet>

      <header style={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>Joutes</h2>

        {!session.isPending && !session.isRefetching && !session?.data?.user ? (
          <div>
            <div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

              <button className="login-btn" onClick={async () => {
                await authClient.emailOtp.sendVerificationOtp({
                  email: 'nakasar@outlook.fr',
                  type: 'sign-in',
                });
              }}>{t.header.login}</button>
            </div>

            <div>
              <input type="number" value={otp} onChange={(e) => setOtp(e.target.value)}/>

              <button onClick={async () => {
                await authClient.signIn.emailOtp({
                  email,
                  otp,
                });
              }}>Validate code
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button onClick={async () => {
              await authClient.signOut();
            }}>Déconnexion
            </button>
          </div>
        )}
      </header>
    </section>
  );
}