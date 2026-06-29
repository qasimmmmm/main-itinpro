import Hero from "@/components/Hero";
import TrustBand from "@/components/TrustBand";
import WhichService from "@/components/WhichService";
import WhyItin from "@/components/WhyItin";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import Comparison from "@/components/Comparison";
import Guarantee from "@/components/Guarantee";
import TrustWhy from "@/components/TrustWhy";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

// Geo personalization happens in small client islands (Hero) reading the
// middleware-set cookie, so this stays a fully static, cached route.

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBand />
      <WhichService />
      <WhyItin />
      <Services />
      <Pricing />
      <Process />
      <Comparison />
      <Guarantee />
      <TrustWhy />
      <FAQ />
      <CTA />
    </>
  );
}
