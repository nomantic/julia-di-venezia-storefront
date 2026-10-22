import {getRouteLocale} from '@/platform/i18n/server';
import {User, ChevronDown} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@/platform/i18n/navigation';
import {LoginButton} from "@/site/navigation/navbar/login-button";
import {getActiveCustomer} from '@/features/account/customer';
import {getTranslations} from 'next-intl/server';

export async function NavbarUser() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Navigation'});
    const customer = await getActiveCustomer();

    if (!customer) {
        return (
            <Button
                render={<LoginButton isLoggedIn={false} />}
                variant="ghost"
                size="sm"
                className="gap-1.5 rounded-full text-foreground/85 hover:text-primary hover:bg-secondary/60 px-2 sm:px-3 h-8 sm:h-9 shrink-0"
                aria-label={t('signIn')}
            />
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 rounded-full text-foreground/85 hover:text-primary hover:bg-secondary/60 px-2 sm:px-3 h-8 sm:h-9 shrink-0"
                    />
                }
            >
                <User className="size-4 shrink-0"/>
                <span className="hidden sm:inline font-medium text-xs sm:text-sm max-w-[100px] truncate">
                    {customer.firstName || t('profile')}
                </span>
                <ChevronDown className="size-3 opacity-60 hidden sm:inline" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover/95 backdrop-blur-md border border-border shadow-lg rounded-xl z-50">
                <DropdownMenuItem render={<Link href="/account/profile" />} className="cursor-pointer">
                    {t('profile')}
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/account/orders" />} className="cursor-pointer">
                    {t('orders')}
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem render={<LoginButton isLoggedIn={true} />} nativeButton className="cursor-pointer" />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
