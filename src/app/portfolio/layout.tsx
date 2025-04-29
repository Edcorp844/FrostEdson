import Header from "../components/header";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main className="min-h-screen font-sans ">{children}</main>
            </body>
        </html>
    );
}
