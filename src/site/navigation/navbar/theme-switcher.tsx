"use client";

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {Moon, Sun, Monitor} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme} = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                disabled
                className="rounded-full text-foreground/85 hover:text-primary hover:bg-secondary/60 shrink-0"
            >
                <Sun className="size-4" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative rounded-full text-foreground/85 hover:text-primary hover:bg-secondary/60 shrink-0"
                    />
                }
            >
                <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32 bg-popover/95 backdrop-blur-md border border-border shadow-lg rounded-xl z-50">
                <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer gap-2">
                    <Sun className="size-4" />
                    <span>Light</span>
                    {theme === "light" && <span className="ml-auto text-xs text-primary font-bold">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer gap-2">
                    <Moon className="size-4" />
                    <span>Dark</span>
                    {theme === "dark" && <span className="ml-auto text-xs text-primary font-bold">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer gap-2">
                    <Monitor className="size-4" />
                    <span>System</span>
                    {theme === "system" && <span className="ml-auto text-xs text-primary font-bold">✓</span>}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
