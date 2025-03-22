'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-xl">
      <div className="container py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Notepadfy. All rights reserved.
          </div>
          <nav className="flex items-center gap-6">
            <Link 
              href="/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/contact" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact Us
            </Link>
            <Link 
              href="/about" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
} 