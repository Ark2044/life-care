import { Roboto } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        <main className="max-w-4xl mx-auto p-4">
          {children}
          <ScrollToTopButton />
        </main>
        <Footer />
      </body>
    </html>
  );
}