import './index.css'

import React from 'react'
import { createRoot } from 'react-dom/client';
import { AlertProvider } from './context/AlertContext'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App'
import { AUTHZERO_DOMAIN, AUTHZERO_CLIENT_ID } from './constants/settings'

const root = createRoot(document.getElementById('root')!);

root.render(
  <Auth0Provider
    domain={AUTHZERO_DOMAIN!}
    clientId={AUTHZERO_CLIENT_ID!}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    useRefreshTokens={true}
    cacheLocation='localstorage'
  >
    <React.StrictMode>
      <AlertProvider>
        <App />
      </AlertProvider>
    </React.StrictMode>
  </Auth0Provider>
);
