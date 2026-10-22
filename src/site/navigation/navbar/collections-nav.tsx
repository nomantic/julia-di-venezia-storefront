'use client';

import {useState} from 'react';
import {NavigationLink} from '@/site/navigation/navigation-link';
import {ChevronDown, Sparkles, ArrowRight} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

interface Collection {
    id: string;
    name: string;
    slug: string;
}

interface CollectionsNavProps {
    collections: Collection[];
}

export function CollectionsNav({collections}: CollectionsNavProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center gap-1 lg:gap-2">
            <NavigationLink
                href="/search"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-secondary/60"
            >
                Gallery
            </NavigationLink>

            {collections.length > 0 && (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1 rounded-full text-foreground/80 hover:text-primary hover:bg-secondary/60 px-3 py-1.5 font-medium text-sm transition-colors"
                            >
                                <span>Collections</span>
                                <ChevronDown
                                    className={`size-3.5 opacity-70 transition-transform duration-200 ${
                                        open ? 'rotate-180' : ''
                                    }`}
                                />
                            </Button>
                        }
                    />
                    <DropdownMenuContent
                        align="start"
                        sideOffset={8}
                        className="w-64 p-2 bg-popover/95 backdrop-blur-md border border-border shadow-lg rounded-xl z-50"
                    >
                        <DropdownMenuLabel className="font-serif text-xs uppercase tracking-wider text-primary/80 px-2 py-1">
                            Artisan Collections
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {collections.map((collection) => (
                            <DropdownMenuItem
                                key={collection.slug}
                                render={<NavigationLink href={`/collection/${collection.slug}`} />}
                                className="cursor-pointer py-2 px-2.5 rounded-lg hover:bg-secondary/60 hover:text-primary transition-colors text-sm flex items-center gap-2"
                                onClick={() => setOpen(false)}
                            >
                                <Sparkles className="size-3.5 text-primary/70 shrink-0" />
                                <span className="truncate">{collection.name}</span>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            render={<NavigationLink href="/search" />}
                            className="cursor-pointer py-1.5 px-2.5 rounded-lg hover:bg-secondary/60 text-primary text-xs font-medium flex items-center justify-between"
                            onClick={() => setOpen(false)}
                        >
                            <span>Browse All Artworks</span>
                            <ArrowRight className="size-3.5" />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
}
