import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { church } from "../lib/church";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(church.url),
  title: {
    default: church.title,
    template: "%s | Fundamental Baptist Church",
  },
  description: church.description,
};

function Brand() {
  return (
    <Link className="brand" href="/">
      <Image src={church.logo} alt="" width={68} height={39} />
      <span>Fundamental Baptist Church<small>San Isidro</small></span>
    </Link>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <header className="header wrap">
          <Brand />
          <nav aria-label="Main navigation">
            <Link href="/#beliefs">Beliefs</Link>
            <Link href="/#bible">Bible guide</Link>
            <Link className="nav-visit" href="/#visit">Plan a visit</Link>
          </nav>
        </header>
        {children}
        <footer className="footer wrap">
          <Brand />
          <a href={church.facebook}>Facebook <span aria-hidden="true">↗</span></a>
        </footer>
      </body>
    </html>
  );
}
