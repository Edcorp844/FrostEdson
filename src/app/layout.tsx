
import type { Metadata } from "next";
import "./globals.css";
import GlobalHeader from "./components/global-header";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Frost Edson",
  description: "Frost Edson's Portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalHeader />
        <main className="min-h-screen font-sans ">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
