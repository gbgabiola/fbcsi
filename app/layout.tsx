import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { church, churchContact } from "../lib/church";
import { FooterIcon } from "./footer-icon";
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

function SiteFooter() {
  const { phone, email, youtube, instagram } = churchContact;
  const socials = [
    { icon: "youtube", label: "YouTube", href: youtube },
    { icon: "facebook", label: "Facebook", href: church.facebook },
    { icon: "instagram", label: "Instagram", href: instagram },
  ] as const;

  return (
    <footer className="footer-shell">
      <div className="footer wrap">
        <Brand />
        <address className="footer-contact">
          <a href={church.map}>
            <FooterIcon name="address" />
            <span>{church.street}<br />{church.locality}, {church.region}, Philippines</span>
          </a>
          {phone && (
            <a href={`tel:${phone.dial}`}>
              <FooterIcon name="phone" />
              <span>{phone.label}</span>
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`}>
              <FooterIcon name="email" />
              <span>{email}</span>
            </a>
          )}
        </address>
        <nav className="footer-social" aria-label="Church social media">
          {socials.map(({ icon, label, href }) => href && (
            <a key={icon} href={href} aria-label={label} title={label}>
              <FooterIcon name={icon} />
            </a>
          ))}
        </nav>
      </div>
    </footer>
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
        <SiteFooter />
      </body>
    </html>
  );
}
