import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
// components
import LoadingScreen from '@/components/LoadingScreen';
import devStore from '@/store/dev';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { GetAuthUserDataDocument, VhLastSeenDocument } from '@/graphql';
import * as ga from '@/utils/ga';
import { useSnapshot } from 'valtio';

// ----------------------------------------------------------------------

const createApolloClient = (authToken: any) => {
  console.log('apollo');
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://vh-alpha-01.hasura.app/v1/graphql',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

// ----------------------------------------------------------------------

const AuthGuard: React.FC = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect, user, getAccessTokenSilently } = useAuth();

  const { pathname, push, events } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  const [client, setClient] = useState<any>(null);

  const devState = useSnapshot(devStore);

  const domain_version =
    window.location.hostname == 'local.virtual.haus'
      ? 'dev.virtual.haus'
      : window.location.hostname;

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      // @ts-ignore
      window.Intercom('update');
      // @ts-ignore
      window.Appcues.page();

      ga.pageview(devState.user.uuid, url);

      if (client) {
        client.mutate({
          mutation: VhLastSeenDocument,
          variables: {
            data: {
              path: url,
            },
          },
        });
      }
      console.log('[router] change', url);
    };

    events.on('routeChangeComplete', handleRouteChange);

    return () => {
      events.off('routeChangeComplete', handleRouteChange);
    };
  }, [client, devState.user.uuid, events]);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  useEffect(() => {
    console.log('[useEffect] fired');
    const getUserToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          redirect_uri: window.location.origin,
        });
        if (user) {
          const newClient = createApolloClient(accessToken);
          setClient(newClient);

          const user_data = await newClient.query({
            query: GetAuthUserDataDocument,
            variables: {
              id: user['https://hasura.io/jwt/claims']['x-hasura-user-uuid'],
              domain: domain_version,
            },
          });

          newClient.mutate({
            mutation: VhLastSeenDocument,
            variables: {
              data: {
                path: window.location.pathname,
              },
            },
          });

          console.log(user_data);
          console.log(user);
          user.first_name = user_data.data.users_by_pk.first_name;
          devStore.user = user;
          devStore.user.uuid = user_data.data.users_by_pk.id;
          devStore.user.first_name = user_data.data.users_by_pk.first_name;
          devStore.user.last_name = user_data.data.users_by_pk.last_name;
          devStore.user.avatar = user_data.data.users_by_pk.avatar;
          devStore.user.token = accessToken;
          devStore.user.organization = user_data.data.users_by_pk.organization;
          devStore.user.pwc = user_data.data.versions[0];

          // GA
          // ga.identify(user_data.data.users_by_pk.id);

          // Intercom Integration
          // @ts-ignore
          window.Intercom('boot', {
            app_id: 'u2nr54b6',
            name: `${user_data.data.users_by_pk.first_name} ${user_data.data.users_by_pk.last_name}`,
            email: user_data.data.users_by_pk.email,
            vhid: user_data.data.users_by_pk.id,
          });

          // LuckyOrange Classic
          // @ts-ignore
          window.__lo_log_console = true;
          // @ts-ignore
          window._loq = window._loq || [];
          // @ts-ignore
          window._loq.push([
            'custom',
            {
              name: `${user_data.data.users_by_pk.first_name} ${user_data.data.users_by_pk.last_name}`,
              email: user_data.data.users_by_pk.email,
            },
          ]);

          // LuckyOrange New
          // @ts-ignore
          window.LOQ = window.LOQ || [];
          // @ts-ignore
          window.LOQ.push([
            'ready',
            (LO: any) => {
              LO.visitor.identify(user_data.data.users_by_pk.id, {
                name: `${user_data.data.users_by_pk.first_name} ${user_data.data.users_by_pk.last_name}`,
                email: user_data.data.users_by_pk.email,
              });
            },
          ]);

          // Appcues Integration
          // @ts-ignore
          window.Appcues.identify(
            user_data.data.users_by_pk.id, // unique, required
            {
              // recommended (optional) properties
              createdAt: user_data.data.users_by_pk.created_at, // Unix timestamp of user signup date
              purchasedAd: null, // Unix timestamp of account purchase date (leave null if empty)
              planTier: 'Standard', // Current user’s plan tier
              role: 'User', // Current user’s role or permissions
              accountId: user_data.data.users_by_pk.id, // Current user's account ID
              firstName: user_data.data.users_by_pk.first_name, // current user's first name

              // additional suggestions
              email: user_data.data.users_by_pk.email, // Current user's email
            }
          );
        }
      } catch (e: any) {
        console.log(JSON.stringify(e, null, 4));
      }
    };

    getUserToken();
  }, [domain_version, getAccessTokenSilently, user]);

  if (isLoading) {
    console.log('isLoading:', isLoading);
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    console.log('!isAuthenticated:', isAuthenticated);
    if (pathname !== requestedLocation) {
      console.log('pathname !== requestedLocation');
      setRequestedLocation(pathname);
    }
    loginWithRedirect({
      appState: { targetUrl: pathname },
    });
  }

  if (!client) {
    console.log('!client');
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    console.log('isAuthenticated yay');
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }

  return <LoadingScreen />;
};

export default AuthGuard;
