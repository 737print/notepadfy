import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Notepadfy | Your Online Notepad Solution',
  description: 'Learn about Notepadfy, the secure and efficient online notepad service. Our mission is to provide a seamless note-taking experience for users worldwide.',
  keywords: 'notepadfy, online notepad, about us, secure notes, digital notes',
  openGraph: {
    title: 'About Us - Notepadfy | Your Online Notepad Solution',
    description: 'Learn about Notepadfy, the secure and efficient online notepad service.',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">About Notepadfy</h1>
      
      <div className="prose prose-invert max-w-none space-y-6">
        <p className="text-lg text-muted-foreground">
          Welcome to Notepadfy, your go-to solution for seamless online note-taking. We believe in making digital note-taking simple, secure, and accessible to everyone.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Our Mission</h2>
        <p>
          Our mission is to provide a reliable and user-friendly platform where people can create, store, and share their notes with complete privacy and security.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What Sets Us Apart</h2>
        <ul>
          <li>Instant Access: No registration required to start taking notes</li>
          <li>Privacy First: End-to-end encryption for your sensitive information</li>
          <li>Custom URLs: Create memorable links for your important notes</li>
          <li>Password Protection: Additional security for sensitive content</li>
          <li>Clean Interface: Distraction-free writing environment</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Performance & Security</h2>
        <p>
          We prioritize both speed and security. Our platform is built using cutting-edge technologies to ensure fast load times and optimal performance. Your notes are protected with industry-standard security measures.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Contact Us</h2>
        <p>
          Have questions or suggestions? We'd love to hear from you. Visit our <a href="/contact" className="text-primary hover:underline">Contact page</a> to get in touch with our team.
        </p>
      </div>
    </div>
  )
} 