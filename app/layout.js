import {Geist_Mono} from "next/font/google"
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

  const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "price drop",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en">
      <body className={geistMono.className}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
