import './index.css'

import React from 'react'
import { createRoot } from 'react-dom/client';
import { AlertProvider } from './context/AlertContext'
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';
import App from './App'
import { AUTHZERO_DOMAIN, AUTHZERO_CLIENT_ID, AUTHZERO_AUDIENCE } from './constants/settings'

const providerConfig: Auth0ProviderOptions = {
  domain: AUTHZERO_DOMAIN!,
  clientId: AUTHZERO_CLIENT_ID!,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: AUTHZERO_AUDIENCE
  },
  useRefreshTokens: true,
  cacheLocation: 'localstorage'
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <Auth0Provider {...providerConfig}>
    <React.StrictMode>
      <AlertProvider>
        <App />
      </AlertProvider>
    </React.StrictMode>
  </Auth0Provider>
);
