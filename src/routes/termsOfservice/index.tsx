import { component$ } from '@builder.io/qwik';
import { Footer } from '~/components/footer/Footer';
import { Navigation } from '~/components/navigation/Navigation';

export default component$(() => {
  return (
  <>
    <Navigation/>
      <div class="flex flex-col bg-gray-900 text-white px-8 py-12 md:px-16 lg:px-32">
        <h1 class="text-4xl font-bold mb-6">Terms of Service</h1>
        <div class="border-b border-white border-opacity-30 mb-8"></div>

        <div class="space-y-6 text-lg leading-relaxed">
          <section>
            <h2 class="text-xl font-bold">1. Acceptance of Terms</h2>
            <p>By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.</p>
          </section>

          <section>
            <h2 class="text-xl font-bold">2. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. Any changes will be effective immediately upon posting. It is your responsibility to review the terms periodically for updates.</p>
          </section>

          <section>
            <h2 class="text-xl font-bold">3. User Responsibilities</h2>
            <ul class="list-disc pl-6 space-y-2">
              <li>You agree to use our services only for lawful purposes.</li>
              <li>You must not engage in any activity that disrupts or interferes with our services or the networks connected to them.</li>
              <li>You are responsible for maintaining the confidentiality of your account information.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold">4. Intellectual Property</h2>
            <p>All content, trademarks, and materials provided through our services are the property of their respective owners. Unauthorized use is prohibited.</p>
          </section>

          <section>
            <h2 class="text-xl font-bold">5. Limitation of Liability</h2>
            <p>We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
          </section>

          <section>
            <h2 class="text-xl font-bold">6. Termination</h2>
            <p>We reserve the right to suspend or terminate your access to our services for violations of these Terms of Service or at our sole discretion.</p>
          </section>

          <section>
            <h2 class="text-xl font-bold">7. Governing Law</h2>
            <p>These Terms of Service are governed by and construed in accordance with the laws of Thailand, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2 class="text-xl font-bold">8. Privacy Policy Reference</h2>
            <p>
              Your use of our services is also governed by our{' '}
              <a
                href="https://privacylink"
                class="text-sky-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>. Please review it to understand how we collect, use, and protect your information.
            </p>
          </section>

          <p class="text-sm text-gray-400 mt-6">Last Updated: February 9, 2025</p>
        </div>
      </div>
      <Footer/>
  </>
  );
});
