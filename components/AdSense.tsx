'use client'

import { useEffect } from 'react'

interface AdSenseProps {
  slot: string
  style?: React.CSSProperties
}

export default function AdSense({ slot, style = {} }: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: 'block',
        minHeight: '280px',
        ...style
      }}
      data-ad-client="ca-pub-7740044248569632"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
} 