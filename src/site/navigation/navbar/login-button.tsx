'use client';

import {ComponentProps, useTransition} from "react";
import {logoutAction} from '@/features/authentication/logout';
import {useRouter} from '@/platform/i18n/navigation';
import {useTranslations} from 'next-intl';
import {User, LogOut} from 'lucide-react';

interface LoginButtonProps extends ComponentProps<'button'> {
    isLoggedIn: boolean;
}

export function LoginButton({isLoggedIn, className = '', ...props}: LoginButtonProps) {
    const t = useTranslations('Navigation');
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <button
            {...props}
            aria-disabled={isPending}
            className={`inline-flex items-center gap-1.5 ${className}`}
            onClick={() => {
                if (isLoggedIn) {
                    startTransition(async () => {
                        await logoutAction();
                    });
                } else {
                    router.push('/sign-in');
                }
            }}
        >
            {isLoggedIn ? (
                <>
                    <LogOut className="size-4 shrink-0" />
                    <span>{t('signOut')}</span>
                </>
            ) : (
                <>
                    <User className="size-4 shrink-0" />
                    <span className="hidden sm:inline font-medium text-xs sm:text-sm">{t('signIn')}</span>
                </>
            )}
        </button>
    );
}
