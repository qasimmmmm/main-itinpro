import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions that govern your use of the ITIN-Pro website and the purchase of our ITIN, LLC, and EIN services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      updated="June 2026"
      intro={
        <p>
          These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of {company.domain}{" "}
          and the services provided by {company.legalEntity}, operating as {company.brand}. By using
          our Website or purchasing our services, you agree to these Terms. Please read them
          carefully.
        </p>
      }
      blocks={[
        {
          heading: "Who we are",
          paras: [
            `${company.brand} is a brand of ${company.legalEntity}, a private company providing professional assistance with US tax-identification and company-formation processes. We are an independent third-party service provider and are not a government agency. Please see our Disclaimer for important details about our relationship to the IRS and government processes.`,
          ],
        },
        {
          heading: "Our services",
          paras: [
            "We provide preparation, certification (where we act as Certifying Acceptance Agents), submission, and support services in connection with ITIN applications, US company formation, EIN registration, and related needs. The specific scope of what you purchase is described on the relevant service and pricing pages and confirmed during onboarding.",
            "We act on your behalf to prepare and submit applications. We do not make the final decision on any government application — that authority rests with the relevant agency.",
          ],
        },
        {
          heading: "Your responsibilities",
          paras: ["To deliver our services, we rely on you. You agree that:"],
          bullets: [
            "The information and documents you provide are true, accurate, complete, and your own.",
            "You will respond to our requests for information or signatures in a timely manner so we can progress your application.",
            "You are legally eligible to receive the services and are not a resident of a country we are unable to serve due to sanctions or other legal restrictions.",
            "You will use any tax IDs, company, or accounts obtained for lawful purposes only.",
          ],
        },
        {
          heading: "Fees and payment",
          paras: [
            "Our service fees are displayed on the Website and are payable in advance. Where a government filing fee applies (for example, a state's company-formation fee), this is shown in addition to our service fee. After the first year, the registered agent and US business address renew at the rate stated on our pricing pages.",
            "All fees are quoted in US dollars. You are responsible for any taxes, bank charges, or currency-conversion costs imposed by your own bank or jurisdiction.",
          ],
        },
        {
          heading: "Refunds and guarantee",
          paras: [
            "Our refund terms, including our money-back guarantee on ITIN applications, are set out in full in our Refund Policy, which forms part of these Terms.",
          ],
        },
        {
          heading: "Timelines",
          paras: [
            "Any timeframes we provide are good-faith estimates based on typical government processing and are not guarantees. Government agencies can take longer than usual, particularly during peak periods, and such delays are outside our control.",
          ],
        },
        {
          heading: "Limitation of liability",
          paras: [
            "To the maximum extent permitted by law, our total liability to you for any claim arising out of or relating to our services is limited to the amount of the service fee you paid us for the service in question. We are not liable for indirect, incidental, or consequential losses, or for the decisions, delays, or actions of government agencies, banks, or payment platforms.",
          ],
        },
        {
          heading: "Intellectual property",
          paras: [
            "All content on this Website, including text, graphics, logos, and design, is owned by or licensed to us and is protected by intellectual-property laws. You may not copy, reproduce, or reuse it without our written permission.",
          ],
        },
        {
          heading: "Governing law",
          paras: [
            "These Terms are governed by the laws of the State of New Jersey, United States, without regard to its conflict-of-laws principles. Any disputes will be subject to the exclusive jurisdiction of the courts located there, unless applicable law requires otherwise.",
          ],
        },
        {
          heading: "Changes to these Terms",
          paras: [
            "We may update these Terms from time to time. The version in effect is the one published on this page, with the “Last updated” date shown above. Continued use of our Website or services after changes constitutes acceptance of the revised Terms.",
          ],
        },
      ]}
    />
  );
}
