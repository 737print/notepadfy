import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Notepadfy | Secure Online Notes',
  description: 'Learn about how Notepadfy protects your privacy and handles your data. Our comprehensive privacy policy ensures transparency and security.',
  keywords: 'privacy policy, data protection, security, notepadfy privacy, online notes privacy',
  openGraph: {
    title: 'Privacy Policy - Notepadfy | Secure Online Notes',
    description: 'Learn about how Notepadfy protects your privacy and handles your data.',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none space-y-6">
        <p className="text-lg text-muted-foreground">
          At Notepadfy, we take your privacy seriously. This policy outlines how we collect, use, and protect your information.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Information Collection</h2>
        <p>
          We collect minimal information necessary to provide our service:
        </p>
        <ul>
          <li>Note content (when you save a note)</li>
          <li>Custom URLs (if you choose to create one)</li>
          <li>Passwords (for protected notes, stored securely)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Data Security</h2>
        <p>
          Your data security is our priority:
        </p>
        <ul>
          <li>All data is encrypted in transit and at rest</li>
          <li>We use industry-standard security measures</li>
          <li>Password-protected notes use additional encryption</li>
          <li>We never share your data with third parties</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Cookies & Analytics</h2>
        <p>
          We use essential cookies to improve your experience and analytics to understand how our service is used. You can opt out of non-essential cookies.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Advertising</h2>
        <p>
          We may display ads to keep our service free. These ads are managed by Google AdSense and follow their privacy policies.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul>
          <li>Access your data</li>
          <li>Delete your notes</li>
          <li>Request information about your data</li>
          <li>Opt out of analytics</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Contact Us</h2>
        <p>
          If you have any questions about our privacy policy, please <a href="/contact" className="text-primary hover:underline">contact us</a>.
        </p>

        <div className="text-sm text-muted-foreground mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  )
} 