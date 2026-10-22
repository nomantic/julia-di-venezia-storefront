'use client';

import {ShoppingCart} from "lucide-react";
import {Button} from "@/components/ui/button";
import { Link } from '@/platform/i18n/navigation';
import {useTranslations} from 'next-intl';

interface CartIconProps {
    cartItemCount: number;
}

export function CartIcon({cartItemCount}: CartIconProps) {
    const t = useTranslations('Navigation');
    return (
        <Button
            render={<Link href="/cart" />}
            nativeButton={false}
            variant="ghost"
            size="icon"
            className="relative rounded-full text-foreground/85 hover:text-primary hover:bg-secondary/60 transition-colors shrink-0"
            aria-label={t('shoppingCart')}
        >
            <ShoppingCart className="size-4.5"/>
            {cartItemCount > 0 && (
                <span
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full size-4.5 min-w-4.5 px-0.5 flex items-center justify-center shadow-xs">
                    {cartItemCount}
                </span>
            )}
            <span className="sr-only">{t('shoppingCart')}</span>
        </Button>
    );
}
