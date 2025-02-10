import { component$ } from "@builder.io/qwik";
import { PolicySection } from "./PolicySection";

export interface PrivacyPolicyProps {
  lastUpdated: string;
}

export const PrivacyPolicy = component$((props: PrivacyPolicyProps) => {
  const policySections = [
    {
      title: "We collect the following types of information when you use our website:",
      items: [
        {
          subtitle: "a. Personal Information",
          list: ["Name", "Email address", "Profile information", "Contact details"]
        },
        {
          subtitle: "b. Usage Data",
          list: ["IP address", "Browser type and version", "Pages visited", "Time spent on pages", "Other diagnostic data"]
        },
        {
          subtitle: "c. Cookies and Tracking Technologies",
          content: "We use cookies and similar tracking technologies to enhance your experience. You can manage your cookie preferences in your browser settings."
        }
      ]
    },
    {
      title: "1. How We Use Your Information",
      content: "We use the collected data for the following purposes:",
      list: [
        "To provide and improve our services",
        "To communicate with you regarding updates or support",
        "To personalize your experience",
        "To detect and prevent fraudulent activities",
        "To comply with legal obligations"
      ]
    },
    {
      title: "2. How We Share Your Information",
      content: "We do not sell or trade your personal data. However, we may share it with:",
      list: [
        "Service Providers: Trusted third parties who help us operate our website",
        "Legal Authorities: If required by law or to protect our rights",
        "Collaborators: If necessary for team collaboration features on our platform"
      ]
    },
    {
      title: "3. Data Security",
      content: "We implement security measures to protect your personal data. However, no method of transmission over the internet is 100% secure. Please use our services with caution."
    },
    {
      title: "4. Your Rights and Choices",
      content: "Depending on your location, you may have rights such as:",
      list: [
        "Accessing, updating, or deleting your personal data",
        "Opting out of marketing communications",
        "Requesting data portability"
      ]
    },
    {
      title: "5. Third-Party Links",
      content: "Our website may contain links to third-party websites. We are not responsible for their privacy practices, so please review their policies separately."
    },
    {
      title: "6. Changes to This Privacy Policy",
      content: "We may update this policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically."
    }
  ];

  return (
    <div class="flex overflow-hidden flex-col bg-gray-900">
      <div class="self-start mt-9 ml-40 text-6xl font-bold text-white max-md:max-w-full max-md:text-4xl">
        Privacy Policy
      </div>
      <div class="mt-8 w-full border-2 border-solid border-white border-opacity-30 min-h-[2px] max-md:max-w-full"></div>
      <div class="self-start mt-14 ml-36 text-3xl text-white max-md:mt-10 max-md:max-w-full">
        {policySections.map((section, index) => (
          <PolicySection key={index} {...section} />
        ))}
        By using our website, you agree to this Privacy Policy.
        <br />
        This Privacy Policy is designed to comply with GDPR, CCPA, and other relevant data protection laws where applicable.
        <br />
        <br />
        Last Updated: {props.lastUpdated}
      </div>
    </div>
  );
});