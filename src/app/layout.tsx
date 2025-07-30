import Navigation from "@/app/components/Navigation";
import './globals.css';


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`antialiased bg-gray-50 text-gray-900`}
        >
        <Navigation />
        <main className="max-w-5xl mx-auto mt-6 px-4">
            {children}
        </main>
        </body>
        </html>
    );
}
