import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { StoreProvider } from "@/app/StoreProvider";

export const metadata: Metadata = {
  title: "Activity visualising",
  description: "Visualise your acitivities!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
