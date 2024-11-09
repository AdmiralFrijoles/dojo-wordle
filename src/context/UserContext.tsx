import { TokenResponse } from '../lib/discord/DiscordLoginTypes'
import { ReactNode, useState, createContext, useContext, useCallback, useMemo } from 'react'
import { 
    saveDiscordAccessTokenToLocalStorage,
    loadDiscordAccessTokenFromLocalStorage, 
    removeDiscordAccessTokenFromLocalStorage
} from '../lib/localStorage'
import { addSeconds } from 'date-fns'

export interface DiscordUser {
    id: string;
    username: string;
    discriminator: string;
    global_name: string | null;
    avatar: string | null;
    locale: string | null;
    verified: boolean;
}

type DiscordUserContextValue = {
    user: DiscordUser | null;
    onLogin: (response: TokenResponse | null) => void
}

type Props = {
    children?: ReactNode
}

export const UserContext = createContext<DiscordUserContextValue | null>(null);

export const useDiscordUser = () => useContext(UserContext) as DiscordUserContextValue;

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<DiscordUser | null>(null);

    const onLogin = useCallback((response: TokenResponse | null) => {
        if (response && response.user) {
            const expiresAt = addSeconds(Date.now(), response.expires_in)
            saveDiscordAccessTokenToLocalStorage({
                access_token: response.access_token,
                expires_at: expiresAt
            })

            setUser({
                id: response.user.id,
                username: response.user.username,
                discriminator: response.user.discriminator,
                global_name: response.user.global_name,
                avatar: response.user.avatar,
                locale: response.user.locale,
                verified: response.user.verified
            })
        } else {
            removeDiscordAccessTokenFromLocalStorage();
            setUser(null);
        }
    }, []);

    const contextValue = useMemo(() => ({
        user,
        onLogin
    }), [user, onLogin])

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}