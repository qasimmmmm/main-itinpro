import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important disclaimer regarding ITIN-Pro's services. We are a private third-party service provider and are not affiliated with, endorsed by, or connected to the IRS or any government agency.",
  alternates: { canonical: "/disclaimer" },
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  return (
    <LegalLayout
      title="Disclaimer"
      updated="June 2026"
      intro={
        <p>
          Please read this disclaimer carefully before using {company.brand} (the &quot;Website&quot;)
          or purchasing any of our services. By using this Website, you acknowledge and agree to the
          statements set out below.
        </p>
      }
      blocks={[
        {
          heading: "Not a government agency",
          paras: [
            `${company.brand} is a brand operated by ${company.legalEntity}, a private third-party service provider. We are NOT affiliated with, endorsed by, sponsored by, or in any way officially connected to the United States Internal Revenue Service (IRS), the United States government, or any of its agencies or departments.`,
            "All references to the IRS, government forms (such as Form W-7), or government processes are made solely to describe the services we help our clients with. The official IRS website is available at irs.gov.",
          ],
        },
        {
          heading: "We charge a service fee",
          paras: [
            "We charge a fee for our professional services, which include preparing your documents, certifying your identity as Certifying Acceptance Agents where applicable, submitting applications on your behalf, and supporting you throughout the process.",
            "You are not required to use a third-party provider to obtain an ITIN, EIN, or to form a US company. These applications can be submitted directly to the relevant government agency, in many cases for free or for only the government's own filing fee. For example, an ITIN application can be filed directly with the IRS at no cost by submitting Form W-7 yourself. You are paying us for the convenience, expertise, and time savings our service provides.",
          ],
        },
        {
          heading: "No guarantee of government outcomes",
          paras: [
            "While we use our professional experience to maximize the likelihood that your application is accepted, final decisions on ITINs, EINs, company filings, bank accounts, and payment-platform approvals rest entirely with the relevant government agency or third party. We do not and cannot control or guarantee their decisions or processing times.",
            "Our money-back guarantee, described in our Refund Policy, is our own commercial commitment to you and is separate from any government process.",
          ],
        },
        {
          heading: "Not legal, tax, or financial advice",
          paras: [
            "The information on this Website and provided through our services is for general informational purposes only and does not constitute legal, tax, accounting, or financial advice. Every individual's circumstances are different. You should consult a qualified attorney, accountant, or tax professional before making decisions about your specific situation.",
          ],
        },
        {
          heading: "Third-party names and trademarks",
          paras: [
            "Names such as Stripe, PayPal, Amazon, Payoneer, Mercury, Wise and others are trademarks of their respective owners. Their use on this Website is purely descriptive — to explain what our clients are typically able to do once set up — and does not imply any partnership, sponsorship, or endorsement by those companies unless explicitly stated.",
          ],
        },
        {
          heading: "Accuracy of information",
          paras: [
            "Government fees, processing times, and procedures change from time to time. We make reasonable efforts to keep the information on this Website current and accurate, but we make no warranty that it is complete, error-free, or up to date at all times. Figures such as state filing fees and processing times are indicative and will be confirmed during onboarding.",
          ],
        },
      ]}
      footnote={
        <p>
          <strong className="font-semibold text-ink">Summary:</strong> {company.brand} is a private
          agency that charges a fee to help you with US tax-ID and company-formation processes. We
          are not the IRS or any government body, and these applications can be made directly with
          the government yourself, in some cases for free. You are paying for our professional
          assistance and convenience.
        </p>
      }
    />
  );
}
