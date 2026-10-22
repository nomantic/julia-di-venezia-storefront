import {getRouteLocale} from '@/platform/i18n/server';
import {cacheLife, cacheTag} from 'next/cache';
import {getTopCollections} from '@/features/collections/data';
import {CollectionsNav} from '@/site/navigation/navbar/collections-nav';

export async function NavbarCollections() {
    "use cache";
    cacheLife('days');

    const locale = await getRouteLocale();
    cacheTag(`navbar-collections-${locale}`);

    const collections = await getTopCollections(locale);

    return <CollectionsNav collections={collections} />;
}
