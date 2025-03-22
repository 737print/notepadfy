import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Notepadfy | Get in Touch',
  description: 'Contact the Notepadfy team for support, feedback, or business inquiries. We are here to help you with any questions about our online note-taking service.',
  keywords: 'contact, support, help, feedback, notepadfy contact, get in touch',
  openGraph: {
    title: 'Contact Us - Notepadfy | Get in Touch',
    description: 'Get in touch with the Notepadfy team. We are here to help!',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="prose prose-invert max-w-none space-y-6">
        <p className="text-lg text-muted-foreground">
          Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </p>

        <div className="grid gap-8 mt-8">
          <form className="space-y-6">
            <div className="grid gap-4">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-lg bg-background border border-input"
                required
              />
            </div>

            <div className="grid gap-4">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 rounded-lg bg-background border border-input"
                required
              />
            </div>

            <div className="grid gap-4">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="What is this about?"
                className="w-full px-4 py-2 rounded-lg bg-background border border-input"
                required
              />
            </div>

            <div className="grid gap-4">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message"
                className="w-full px-4 py-2 rounded-lg bg-background border border-input min-h-[150px]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 font-medium text-center text-white bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>

          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold">Other Ways to Reach Us</h2>
            
            <div className="grid gap-4">
              <h3 className="text-xl font-medium">Email</h3>
              <p className="text-muted-foreground">
                For direct inquiries: support@notepadfy.com
              </p>
            </div>

            <div className="grid gap-4">
              <h3 className="text-xl font-medium">Social Media</h3>
              <p className="text-muted-foreground">
                Follow us on Twitter: <a href="https://twitter.com/notepadfy" className="text-primary hover:underline">@notepadfy</a>
              </p>
            </div>

            <div className="grid gap-4">
              <h3 className="text-xl font-medium">Business Hours</h3>
              <p className="text-muted-foreground">
                Monday - Friday: 9:00 AM - 6:00 PM (UTC)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 