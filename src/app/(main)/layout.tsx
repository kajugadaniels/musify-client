import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "~/components/providers";
import { Toaster } from "~/components/ui/sonner";
import { SidebarProvider } from "~/components/ui/sidebar";

export const metadata: Metadata = {
    title: "Musify",
    description: "Music Generator App",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
});

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${geist.variable}`}>
            <body>
                <Providers>
                    <SidebarProvider></SidebarProvider>
                    <Toaster />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
