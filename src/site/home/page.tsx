import type {Metadata} from "next";
import {Suspense} from "react";
import {getRouteLocale} from "@/platform/i18n/server";
import {HeroSection} from "@/site/home/hero-section";
import {FeaturedProducts} from '@/features/products/featured-products';
import {SITE_NAME, SITE_URL, buildCanonicalUrl} from "@/config/metadata";
import {Palette, Award, PackageCheck} from "lucide-react";
import {getTranslations} from 'next-intl/server';
import {toOgLocale} from '@/platform/i18n/locale-utils';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Home'});
    const ogLocale = toOgLocale(locale);

    return {
        title: {
            absolute: `${SITE_NAME} - ${t('pageTitle')}`,
        },
        description: t('description'),
        alternates: {
            canonical: buildCanonicalUrl("/"),
        },
        openGraph: {
            title: `${SITE_NAME} - ${t('pageTitle')}`,
            description: t('ogDescription'),
            type: "website",
            locale: ogLocale,
            url: SITE_URL,
        },
    };
}

const featureKeys = [
    {icon: Palette, key: 'highQuality'},
    {icon: Award, key: 'bestPrices'},
    {icon: PackageCheck, key: 'fastDelivery'},
] as const;

export default async function Home() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Home'});

    return (
        <div className="min-h-screen">
            <HeroSection/>
            
            <Suspense>
                <FeaturedProducts/>
            </Suspense>

            <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-secondary/25 to-secondary/35 border-t border-border/40">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                        <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">
                            Authentic Craftsmanship
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground">
                            {t('whyShopWithUs')}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {featureKeys.map((feature) => (
                            <div
                                key={feature.key}
                                className="group relative text-center space-y-5 rounded-2xl border border-border/70 bg-card/90 p-8 sm:p-10 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 backdrop-blur-xs"
                            >
                                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                                    <feature.icon className="size-7 text-primary" />
                                </div>
                                <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                                    {t(`features.${feature.key}.title`)}
                                </h3>
                                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
                                    {t(`features.${feature.key}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
