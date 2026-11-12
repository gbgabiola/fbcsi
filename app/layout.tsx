import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { church } from "../lib/church";
import { themeScript } from "./theme";
import { ThemeSwitch } from "./theme-switch";
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
      <Image src={church.logo} alt="" width={96} height={55} />
      <span>Fundamental Baptist Church<small>San Isidro</small></span>
    </Link>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <header className="site-header">
          <div className="header wrap">
            <Brand />
            <nav className="main-nav" aria-label="Main navigation">
              <a className="nav-visit" href="/#visit">Plan a visit</a>
              <a href="/#updates">Updates</a>
              <a href="/#beliefs">Beliefs</a>
              <a href="/#bible">Bible guide</a>
            </nav>
            <ThemeSwitch />
          </div>
        </header>
        {children}
        <footer className="footer-shell">
          <div className="footer wrap">
            <Brand />
            <a href={church.facebook}>Facebook <span aria-hidden="true">↗</span></a>
          </div>
        </footer>
      </body>
    </html>
  );
}
