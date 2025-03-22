import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Notepadfy | Online Note Taking',
  description: 'Read our Terms of Service to understand your rights and responsibilities when using Notepadfy, the secure online notepad service.',
  keywords: 'terms of service, user agreement, notepadfy terms, legal, conditions of use',
  openGraph: {
    title: 'Terms of Service - Notepadfy | Online Note Taking',
    description: 'Read our Terms of Service to understand your rights and responsibilities.',
    type: 'website',
  },
}

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert max-w-none space-y-6">
        <p className="text-lg text-muted-foreground">
          By using Notepadfy, you agree to these terms. Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Acceptance of Terms</h2>
        <p>
          By accessing or using Notepadfy, you agree to be bound by these Terms of Service and all applicable laws and regulations.
        </p>

        <h2 className="text-2xl font-semibold mt-8">2. Service Description</h2>
        <p>
          Notepadfy provides an online platform for creating, storing, and sharing text notes. We offer both free and premium features.
        </p>

        <h2 className="text-2xl font-semibold mt-8">3. User Responsibilities</h2>
        <ul>
          <li>You are responsible for all content you create and share</li>
          <li>You must not use the service for illegal activities</li>
          <li>You must not attempt to breach our security measures</li>
          <li>You must not interfere with other users' access to the service</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">4. Content Guidelines</h2>
        <p>
          You agree not to create or share content that:
        </p>
        <ul>
          <li>Is illegal or promotes illegal activities</li>
          <li>Infringes on others' intellectual property rights</li>
          <li>Contains malware or harmful code</li>
          <li>Violates others' privacy rights</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">5. Service Availability</h2>
        <p>
          While we strive for 100% uptime, we do not guarantee uninterrupted access to the service. We reserve the right to modify or discontinue features at any time.
        </p>

        <h2 className="text-2xl font-semibold mt-8">6. Intellectual Property</h2>
        <p>
          The Notepadfy service, including its design and features, is protected by copyright and other intellectual property laws.
        </p>

        <h2 className="text-2xl font-semibold mt-8">7. Limitation of Liability</h2>
        <p>
          Notepadfy is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.
        </p>

        <h2 className="text-2xl font-semibold mt-8">8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Contact</h2>
        <p>
          If you have any questions about these terms, please <a href="/contact" className="text-primary hover:underline">contact us</a>.
        </p>

        <div className="text-sm text-muted-foreground mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  )
} 