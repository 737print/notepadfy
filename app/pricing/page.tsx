'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { toast } from 'react-hot-toast'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const { sessionId } = await response.json()
      const stripe = await stripePromise

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          toast.error('Something went wrong')
        }
      }
    } catch (error) {
      toast.error('Failed to start checkout process')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h1>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Free</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Perfect for personal use</p>
            <p className="text-3xl font-bold mb-6">$0/month</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Unlimited Notes
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Basic Features
              </li>
              <li className="flex items-center text-gray-500">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Ads Included
              </li>
            </ul>
            <button className="w-full py-3 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-primary">
            <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-lg">
              Popular
            </div>
            <h2 className="text-2xl font-bold mb-4">Pro</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">For power users</p>
            <p className="text-3xl font-bold mb-6">$2/month</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Everything in Free
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                No Ads
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Priority Support
              </li>
            </ul>
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Upgrade to Pro'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 