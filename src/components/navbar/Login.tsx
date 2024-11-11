import {
    ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/outline'
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <ArrowRightEndOnRectangleIcon 
            className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => loginWithRedirect()}>
            Sign In
        </ArrowRightEndOnRectangleIcon>
    );
};