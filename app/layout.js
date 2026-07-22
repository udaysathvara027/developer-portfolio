import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
import { personalData } from "@/utils/data/personal-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://uday-sathvara.vercel.app/"),
  title: `Portfolio of ${personalData.name} - ${personalData.designation}`,
  description: personalData.description,
  openGraph: {
    title: `Portfolio of ${personalData.name} - ${personalData.designation}`,
    description: personalData.description,
    url: process.env.NEXT_PUBLIC_APP_URL || "https://uday-sathvara.vercel.app/",
    siteName: `Portfolio of ${personalData.name}`,
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: `${personalData.name} - ${personalData.designation}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Portfolio of ${personalData.name} - ${personalData.designation}`,
    description: personalData.description,
    images: ["/profile.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ToastContainer position="top-right" autoClose={4000} newestOnTop />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
