'use client';

import {useTranslations} from 'next-intl';
import {Coins} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {useRouter} from '@/platform/i18n/navigation';
import {switchCurrency} from '@/features/currency/switch-currency';
import {useTransition} from 'react';

interface CurrencyPickerProps {
    availableCurrencyCodes: string[];
    activeCurrencyCode: string;
}

export function CurrencyPicker({availableCurrencyCodes, activeCurrencyCode}: CurrencyPickerProps) {
    const t = useTranslations('Navigation');
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleCurrencyChange = (currencyCode: string) => {
        startTransition(async () => {
            await switchCurrency(currencyCode);
            router.refresh();
        });
    };

    if (availableCurrencyCodes.length <= 1) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 rounded-full text-foreground/85 hover:text-primary hover:bg-secondary/60 px-2 sm:px-2.5 h-8 sm:h-9 shrink-0"
                        aria-label={t('switchCurrency')}
                    />
                }
            >
                <Coins className="size-4 shrink-0" />
                <span className="text-xs font-medium">{activeCurrencyCode}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36 bg-popover/95 backdrop-blur-md border border-border shadow-lg rounded-xl z-50">
                {availableCurrencyCodes.map((code) => (
                    <DropdownMenuItem
                        key={code}
                        onClick={() => handleCurrencyChange(code)}
                        disabled={isPending}
                        className="cursor-pointer"
                    >
                        <span>{code}</span>
                        {activeCurrencyCode === code && <span className="ml-auto text-xs text-primary font-bold">✓</span>}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
