'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from '@/platform/i18n/navigation';
import {routing, localeNames} from '@/platform/i18n/routing';
import {Globe} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguagePicker() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLocaleChange = (newLocale: string) => {
        router.replace(pathname, {locale: newLocale});
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 rounded-full text-foreground/85 hover:text-primary hover:bg-secondary/60 px-2 sm:px-2.5 h-8 sm:h-9 shrink-0"
                        aria-label="Select Language"
                    />
                }
            >
                <Globe className="size-4 shrink-0" />
                <span className="text-xs uppercase font-medium">{locale}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36 bg-popover/95 backdrop-blur-md border border-border shadow-lg rounded-xl z-50">
                {routing.locales.map((loc) => (
                    <DropdownMenuItem
                        key={loc}
                        onClick={() => handleLocaleChange(loc)}
                        className="cursor-pointer"
                    >
                        <span>{localeNames[loc] ?? loc.toUpperCase()}</span>
                        {locale === loc && <span className="ml-auto text-xs text-primary font-bold">✓</span>}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
