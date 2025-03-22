'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Editor from '@/components/Editor'
import { toast } from 'sonner'

export default function NotePage() {
  const params = useParams()
  const [note, setNote] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const verifyPassword = async () => {
    if (!password) return

    setIsVerifying(true)
    try {
      const response = await fetch(`/api/notes/${params.id}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        const data = await response.json()
        setNote(data)
        setShowPasswordModal(false)
      } else {
        toast.error('Incorrect password')
      }
    } catch (error) {
      toast.error('Error verifying password')
    } finally {
      setIsVerifying(false)
    }
  }

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/notes/${params.id}`)
        if (!response.ok) throw new Error('Note not found')
        const data = await response.json()
        
        if (data.isProtected) {
          setShowPasswordModal(true)
        } else {
          setNote(data)
        }
      } catch (error) {
        console.error('Error loading note:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  if (showPasswordModal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="card p-6 w-full max-w-md animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">This note is protected</h2>
          <p className="text-muted-foreground mb-4">Enter the password to access the content.</p>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full"
              onKeyDown={(e) => e.key === 'Enter' && verifyPassword()}
            />
            <button
              onClick={verifyPassword}
              disabled={isVerifying || !password}
              className="btn-primary w-full"
            >
              {isVerifying ? 'Verifying...' : 'Access Note'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-destructive">Note not found</div>
      </div>
    )
  }

  return <Editor initialContent={note.content} noteId={note.id} isProtected={note.isProtected} />
} 