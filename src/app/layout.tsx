import type { Metadata } from "next";
import Script from "next/script";
import { Hanken_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { company, googleAdsId, pricing } from "@/lib/content";

const display = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || googleAdsId;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: "ITIN-Pro — ITIN, US LLC & EIN for Non-Residents | Apply Online",
    template: "%s | ITIN-Pro",
  },
  description: `Get your ITIN, form a US LLC and get your EIN — 100% online, nothing mailed to the US. Get paid on Stripe, Amazon and PayPal. IRS Certifying Acceptance Agents. From $${pricing.llc.price}.`,
  keywords: [
    "ITIN application",
    "ITIN for non residents",
    "US LLC for non residents",
    "EIN application",
    "ITIN for Amazon sellers",
    "ITIN for Stripe",
    "form US company online",
    "Certifying Acceptance Agent",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: company.url,
    siteName: "ITIN-Pro",
    title: "ITIN-Pro — ITIN, US LLC & EIN for Non-Residents",
    description:
      "Your US Tax ID, LLC and EIN — done online. Get paid on Stripe, PayPal and Amazon. IRS Certifying Acceptance Agents.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ITIN-Pro" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ITIN-Pro — ITIN, US LLC & EIN for Non-Residents",
    description:
      "Your US Tax ID, LLC and EIN — done online. Get paid on Stripe, PayPal and Amazon.",
    images: [{ url: "/og-image.png", alt: "ITIN-Pro — ITIN, US LLC & EIN for non-residents" }],
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ITIN-Pro",
  legalName: company.legalEntity,
  url: company.url,
  email: company.email,
  description:
    "ITIN application assistance, US LLC formation and EIN services for non-US residents. IRS Certifying Acceptance Agents.",
  address: {
    "@type": "PostalAddress",
    streetAddress: company.addressLine1,
    addressLocality: "Jersey City",
    addressRegion: "NJ",
    postalCode: "07306",
    addressCountry: "US",
  },
  areaServed: "Worldwide",
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {/* Google Ads / gtag */}
        {adsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${adsId}');`}
            </Script>
          </>
        ) : null}

        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
