import { UseDiscordLoginParams, TokenResponse } from '../../lib/discord/DiscordLoginTypes'
import { useDiscordLogin } from '../../lib/discord/useDiscordLogin'
import { DISCORD_CLIENT_ID, BASE_URL } from '../../constants/settings'
import { useDiscordUser } from '../../context/UserContext'

import {
    ArrowRightEndOnRectangleIcon
  } from '@heroicons/react/24/outline'

export const DiscordLogin = () => {
    const { user, onLogin } = useDiscordUser()

    const discordLoginParams: UseDiscordLoginParams = {
        clientId: DISCORD_CLIENT_ID!,
        redirectUri: `${BASE_URL}`,
        responseType: 'token', // or 'code'
        scopes: ['identify'],
        onSuccess: response => {
            onLogin(response as TokenResponse)
            console.log('Login successful:', (response as TokenResponse).user);
        },
        onFailure: error => {
            console.error('Login failed:', error);
        },
    };

    const { buildUrl, isLoading } = useDiscordLogin(discordLoginParams);

    return (
        <ArrowRightEndOnRectangleIcon 
            className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => (window.location.href = buildUrl())}>
            Sign in with Discord
        </ArrowRightEndOnRectangleIcon>
    );
};