import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ITIN-Pro collects, uses, stores and protects your personal information when you use our website and services.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="June 2026"
      intro={
        <p>
          This Privacy Policy explains how {company.legalEntity}, operating as {company.brand} (&quot;we&quot;,
          &quot;us&quot;, &quot;our&quot;), collects, uses, and protects your personal information
          when you visit {company.domain} or use our services. We take your privacy seriously and
          handle your information responsibly.
        </p>
      }
      blocks={[
        {
          heading: "Information we collect",
          paras: ["Depending on how you interact with us, we may collect the following categories of information:"],
          bullets: [
            "Identity and contact details you provide — such as your name, email address, phone or WhatsApp number, and country of residence.",
            "Application information necessary to deliver our services — such as passport details, business information, and the documents required for ITIN, EIN, or company-formation filings.",
            "Payment information — processed by our third-party payment providers; we do not store full card numbers on our own systems.",
            "Technical and usage data — such as IP address, approximate country, browser type, and pages visited, collected automatically to operate and improve the Website.",
          ],
        },
        {
          heading: "How we use your information",
          paras: ["We use your information only for legitimate business purposes, including:"],
          bullets: [
            "Preparing, certifying, and submitting the applications you have engaged us to handle.",
            "Communicating with you about your order, answering your questions, and providing support.",
            "Processing payments and maintaining records required for accounting and legal compliance.",
            "Improving our Website and services, and — where permitted — sending you relevant updates you can opt out of at any time.",
          ],
        },
        {
          heading: "Country detection",
          paras: [
            "Our Website may detect your approximate country from your IP address in order to display relevant information, such as showing content tailored to visitors from your region. This detection is approximate, is not used to identify you personally, and does not store your precise location.",
          ],
        },
        {
          heading: "How we share information",
          paras: [
            "We do not sell your personal information. We share it only as needed to deliver our services — for example, with the relevant government agencies to submit your applications, with payment processors to take payment, and with trusted service providers who help us operate (such as hosting and communication tools), all under appropriate confidentiality obligations. We may also disclose information where required by law.",
          ],
        },
        {
          heading: "Data security and retention",
          paras: [
            "We implement reasonable technical and organizational measures to protect your information against unauthorized access, loss, or misuse. We retain your information only as long as necessary to provide our services and to meet our legal, tax, and record-keeping obligations, after which it is securely deleted or anonymized.",
          ],
        },
        {
          heading: "Your rights",
          paras: [
            "Depending on your jurisdiction, you may have the right to access, correct, or delete the personal information we hold about you, to object to or restrict certain processing, and to withdraw consent where processing is based on consent. To exercise any of these rights, contact us using the details below and we will respond in line with applicable law.",
          ],
        },
        {
          heading: "Cookies and analytics",
          paras: [
            "We use cookies and similar technologies to make the Website work, remember your preferences, and understand how it is used. We may also use analytics and advertising tools, including Google services, to measure performance and the effectiveness of our marketing. You can control cookies through your browser settings; disabling some cookies may affect how the Website functions.",
          ],
        },
        {
          heading: "Changes to this policy",
          paras: [
            "We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date at the top of this page. We encourage you to review it periodically.",
          ],
        },
      ]}
    />
  );
}
