import {
    UserCircleIcon
} from '@heroicons/react/24/outline'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";

const UserIcon = () => {
    const { user, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && user && user.picture ? 
            <img className='h-6 w-6 rounded-full cursor-pointer animated' src={user.picture} alt={user.name}/> :
            <UserCircleIcon className="h-6 w-6 cursor-pointer dark:stroke-white"/>
    )
}

export const UserMenu = () => {
    const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    const menuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handler = (event: MouseEvent | TouchEvent) => {
            if (open && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('touchstart', handler);
        };
    }, [open]);

    return (
        <div className='mr-3 relative' ref={menuRef}>
            <div onClick={() => handleToggle()}>
                <UserIcon/>
            </div>
            {open && (
                <div className='absolute left-1/2 -translate-x-1/2 top-9'>
                    <ul className="w-24 h-auto shadow-md rounded-md p-1 border bg-white dark:bg-gray-700
                                   border-slate-300 dark:border-slate-600">
                        {isAuthenticated ? (
                            <li className='relative flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600
                                           rounded-md text-gray-900 dark:text-gray-100 cursor-pointer items-center justify-center'
                                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                Log Out
                            </li>
                        ) : (
                            <li className='relative flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600
                                           rounded-md text-gray-900 dark:text-gray-100 cursor-pointer items-center justify-center'
                                onClick={() => loginWithRedirect()}>
                                Log In
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}