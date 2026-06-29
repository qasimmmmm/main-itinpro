import { headers } from "next/headers";
import { resolveGeo } from "@/lib/geo";
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

// Geo depends on a per-request header, so render dynamically.
export const dynamic = "force-dynamic";

export default function HomePage() {
  const country = headers().get("x-user-country");
  const geo = resolveGeo(country);

  return (
    <>
      <Hero geo={geo} />
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
