import {BrandLogo} from "@/components/brand-logo";
import {NavigationLink} from '@/site/navigation/navigation-link';
import {NavbarCollections} from '@/site/navigation/navbar/navbar-collections';
import {NavbarCart} from '@/site/navigation/navbar/navbar-cart';
import {NavbarUser} from '@/site/navigation/navbar/navbar-user';
import {ThemeSwitcher} from '@/site/navigation/navbar/theme-switcher';
import {LanguagePicker} from '@/site/navigation/navbar/language-picker';
import {CurrencyPickerWrapper} from '@/site/navigation/navbar/currency-picker-wrapper';
import {MobileNavWrapper} from '@/site/navigation/navbar/mobile-nav-wrapper';
import {Suspense} from "react";
import {SearchInput} from '@/site/navigation/search-input';
import {NavbarUserSkeleton} from '@/site/navigation/skeletons/navbar-user-skeleton';
import {SearchInputSkeleton} from '@/site/navigation/skeletons/search-input-skeleton';
import {ShoppingCart, Sun, User, Globe} from 'lucide-react';

/** Icon-only skeleton pill — keeps space reserved while async chunks stream in */
function IconSkeleton({ width = 'w-9' }: { width?: string }) {
    return (
        <div
            className={`${width} h-8 sm:h-9 rounded-full bg-muted/60 animate-pulse shrink-0`}
            aria-hidden="true"
        />
    );
}

/** Visible icon-only placeholder that shows the icon in a muted state */
function IconFallback({ icon: Icon }: { icon: React.FC<{ className?: string }> }) {
    return (
        <div className="size-8 sm:size-9 rounded-full flex items-center justify-center text-muted-foreground/50 shrink-0">
            <Icon className="size-4" />
        </div>
    );
}

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/70 backdrop-blur-md bg-background/90 shadow-sm">
            <div className="container mx-auto px-3 sm:px-4">
                <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">

                    {/* ── Left: hamburger + logo + desktop collections ── */}
                    <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 shrink-0">
                        {/* Mobile hamburger — hidden on md+ */}
                        <Suspense fallback={<IconSkeleton width="w-8" />}>
                            <MobileNavWrapper />
                        </Suspense>

                        {/* Logo */}
                        <NavigationLink href="/" className="inline-block shrink-0">
                            <BrandLogo size="md" />
                        </NavigationLink>

                        {/* Desktop collection links — hidden below md */}
                        <nav className="hidden md:flex items-center gap-1 lg:gap-2 ml-2 lg:ml-4">
                            <Suspense fallback={<div className="h-8 w-40 rounded-full bg-muted/50 animate-pulse" />}>
                                <NavbarCollections />
                            </Suspense>
                        </nav>
                    </div>

                    {/* ── Right: search + pickers + cart + user ── */}
                    <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">

                        {/* Search — desktop only */}
                        <div className="hidden lg:flex mr-1">
                            <Suspense fallback={<SearchInputSkeleton />}>
                                <SearchInput />
                            </Suspense>
                        </div>

                        {/* Language — hidden on xs, visible sm+ */}
                        <div className="hidden sm:flex">
                            <Suspense fallback={<IconFallback icon={Globe} />}>
                                <LanguagePicker />
                            </Suspense>
                        </div>

                        {/* Currency — hidden on xs+sm, visible md+ */}
                        <div className="hidden md:flex">
                            <Suspense fallback={<div />}>
                                <CurrencyPickerWrapper />
                            </Suspense>
                        </div>

                        {/* Theme switcher */}
                        <Suspense fallback={<IconFallback icon={Sun} />}>
                            <ThemeSwitcher />
                        </Suspense>

                        {/* Cart */}
                        <Suspense fallback={<IconFallback icon={ShoppingCart} />}>
                            <NavbarCart />
                        </Suspense>

                        {/* User / Sign in */}
                        <Suspense fallback={<NavbarUserSkeleton />}>
                            <NavbarUser />
                        </Suspense>
                    </div>

                </div>
            </div>
        </header>
    );
}
