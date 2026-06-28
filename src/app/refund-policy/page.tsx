import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "ITIN-Pro's refund policy, including our money-back guarantee: if your ITIN application is rejected after we file it, we refund 110% of your service fee.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPage() {
  return (
    <LegalLayout
      title="Refund Policy"
      updated="June 2026"
      intro={
        <p>
          We want you to feel confident choosing {company.brand}. This Refund Policy explains when
          you are entitled to a refund, including our money-back guarantee on ITIN applications. It
          forms part of our Terms &amp; Conditions.
        </p>
      }
      blocks={[
        {
          heading: "Our ITIN money-back guarantee",
          paras: [
            "We stand behind our work. If we prepare and submit your ITIN application and it is rejected by the IRS for reasons within our control, we will refund 110% of the service fee you paid us for that application.",
            "This guarantee reflects our confidence: because our Certifying Acceptance Agents review every application before filing, rejections are rare. The guarantee applies to our service fee and does not extend to any third-party or government fees, which are outside our control.",
          ],
        },
        {
          heading: "Before work begins",
          paras: [
            "If you have paid for a service but we have not yet begun preparing your documents or incurred any third-party or government costs on your behalf, you may request a full refund of your service fee. Simply contact us and we will process it.",
          ],
        },
        {
          heading: "After work has begun",
          paras: [
            "Once we have started preparing your application or have incurred costs on your behalf (for example, paying a state filing fee or a registered-agent cost), those amounts are non-refundable because they have already been spent on your behalf. Any remaining portion of your service fee that relates to work not yet performed may be refundable at our discretion, assessed fairly based on the stage your order has reached.",
          ],
        },
        {
          heading: "Government fees are non-refundable",
          paras: [
            "State filing fees, registered-agent fees, and any other government or third-party charges are paid directly to those parties and cannot be recovered by us once paid. These are always shown separately from our service fee so you know exactly what is and isn't refundable.",
          ],
        },
        {
          heading: "What's not covered",
          paras: ["Our guarantee and refunds do not apply where:"],
          bullets: [
            "Information or documents you provided were inaccurate, incomplete, or not your own.",
            "You did not respond to our requests in time, preventing us from completing or correctly filing your application.",
            "A bank or payment platform declines to open an account or approve you — these are independent decisions no provider can guarantee.",
            "Delays are caused solely by government processing times, which are outside our control.",
          ],
        },
        {
          heading: "How to request a refund",
          paras: [
            `To request a refund or claim under our guarantee, email us at ${company.email} with your order details and, where relevant, the rejection notice you received. We aim to review and respond to refund requests promptly, and approved refunds are issued to your original payment method.`,
          ],
        },
        {
          heading: "Renewals",
          paras: [
            "Recurring services, such as the registered agent and US business address, renew annually. You may cancel a renewal before it is charged. Once a renewal period has begun and the service has been provided for that period, the renewal fee is non-refundable.",
          ],
        },
      ]}
      footnote={
        <p>
          <strong className="font-semibold text-ink">In short:</strong> we offer a 110% money-back
          guarantee on the service fee if your ITIN is rejected for reasons within our control, full
          refunds before work begins, and fair, pro-rated treatment afterward. Government and
          third-party fees already spent on your behalf are not refundable.
        </p>
      }
    />
  );
}
