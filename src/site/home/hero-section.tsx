import {Button} from "@/components/ui/button";
import { Link } from '@/platform/i18n/navigation';
import {getTranslations} from 'next-intl/server';
import {getRouteLocale} from '@/platform/i18n/server';
import {Sparkles, ArrowRight, Palette, ShieldCheck, Heart} from "lucide-react";

export async function HeroSection() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Hero'});

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/40 via-background to-background pt-24 sm:pt-28 pb-16 md:pb-24">
            {/* Artistic Ethereal Aura & Watercolor Ambient Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-primary/15 via-accent/20 to-secondary/30 blur-3xl pointer-events-none rounded-full opacity-70 -z-10" />
            <div className="absolute top-1/4 right-5 w-72 h-72 bg-primary/10 blur-3xl rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/25 blur-3xl rounded-full pointer-events-none -z-10" />

            {/* Subtle Venetian texture overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--color-primary)/6,transparent_65%)] pointer-events-none -z-10" />

            <div className="container relative mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Atelier Artist Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/80 border border-primary/20 text-xs sm:text-sm font-medium text-foreground tracking-wide shadow-2xs backdrop-blur-xs">
                        <Sparkles className="size-3.5 text-primary shrink-0" />
                        <span>{t('badge')}</span>
                    </div>

                    {/* Romantic Serif Headline */}
                    <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-foreground leading-[1.12]">
                        {t('title')}{" "}
                        <span className="italic font-serif text-primary underline decoration-primary/30 decoration-wavy underline-offset-8">
                            {t('titleHighlight')}
                        </span>
                    </h1>

                    {/* Evocative Subtitle */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                        {t('subtitle')}
                    </p>

                    {/* Call to Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2 sm:pt-4">
                        <Button
                            render={<Link href="/search" />}
                            nativeButton={false}
                            size="lg"
                            className="min-w-[220px] text-base h-12 shadow-sm shadow-primary/25 hover:shadow-md hover:shadow-primary/30 transition-all gap-2 group"
                        >
                            <span>{t('shopNow')}</span>
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button
                            render={<Link href="/search" />}
                            nativeButton={false}
                            variant="outline"
                            size="lg"
                            className="min-w-[220px] text-base h-12 border-primary/30 hover:bg-secondary/50 transition-colors"
                        >
                            {t('viewCollections')}
                        </Button>
                    </div>

                    {/* Artist Trust Ribbon */}
                    <div className="pt-10 sm:pt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border/60 text-left text-xs sm:text-sm text-muted-foreground max-w-3xl mx-auto">
                        <div className="flex items-center gap-2.5 justify-center sm:justify-start">
                            <Palette className="size-4 text-primary shrink-0" />
                            <span>Archival 100% Cotton Rag Paper</span>
                        </div>
                        <div className="flex items-center gap-2.5 justify-center">
                            <Heart className="size-4 text-primary shrink-0" />
                            <span>Hand-Signed with Certificate</span>
                        </div>
                        <div className="flex items-center gap-2.5 justify-center sm:justify-end">
                            <ShieldCheck className="size-4 text-primary shrink-0" />
                            <span>Insured Custom Art Packaging</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
