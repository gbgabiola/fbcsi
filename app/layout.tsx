import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Fundamental Baptist Church | San Isidro",
    template: "%s | Fundamental Baptist Church",
  },
  description: "Get to know Fundamental Baptist Church in San Isidro, explore Baptist beliefs and practices, and connect with the church before your visit.",
};

function Brand() {
  return (
    <Link className="brand" href="/">
      <Image src="/fbcsi-logo.jpg" alt="" width={68} height={39} />
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
            <Link href="/#practices">Practices</Link>
            <Link className="nav-visit" href="/#visit">Plan a visit</Link>
          </nav>
        </header>
        {children}
        <footer className="footer wrap">
          <Brand />
          <a href="https://www.facebook.com/fbcsi4Christ">Facebook <span aria-hidden="true">↗</span></a>
        </footer>
      </body>
    </html>
  );
}
