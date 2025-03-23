'use client'

import { useEffect, useState } from 'react'
import { FiSave, FiCopy, FiDownload, FiTrash2, FiClock, FiLock, FiLink, FiShare2, FiCheck, FiMinus, FiPlus } from 'react-icons/fi'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface EditorProps {
  initialContent?: string
  isProtected?: boolean
  noteId?: string
}

export default function Editor({ initialContent = '', isProtected = false, noteId }: EditorProps) {
  const router = useRouter()
  const [content, setContent] = useState(initialContent)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isPasswordProtected, setIsPasswordProtected] = useState(isProtected)
  const [password, setPassword] = useState('')
  const [customUrl, setCustomUrl] = useState('')
  const [temporaryUrl, setTemporaryUrl] = useState('')
  const [showFormatting, setShowFormatting] = useState(false)
  const [isUrlAvailable, setIsUrlAvailable] = useState<boolean | null>(null)
  const [fontSize, setFontSize] = useState(16)

  useEffect(() => {
    // Gera uma URL temporária única para a nota
    const tempId = noteId || Math.random().toString(36).substring(7)
    setTemporaryUrl(`${window.location.origin}/note/${tempId}`)
  }, [noteId])

  // Verificar disponibilidade da URL quando ela mudar
  useEffect(() => {
    const checkUrlAvailability = async () => {
      if (!customUrl) {
        setIsUrlAvailable(null)
        return
      }

      try {
        const response = await fetch('/api/check-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: customUrl }),
        })

        const data = await response.json()
        setIsUrlAvailable(data.available)
      } catch (error) {
        setIsUrlAvailable(false)
      }
    }

    const debounceTimer = setTimeout(checkUrlAvailability, 500)
    return () => clearTimeout(debounceTimer)
  }, [customUrl])

  const handleSave = async () => {
    try {
      const noteId = noteId || Math.random().toString(36).substring(7)
      const response = await fetch('/api/notes.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: noteId,
          content: content,
          isProtected: false
        }),
      })

      if (response.ok) {
        router.push(`/note/${noteId}`)
      }
    } catch (error) {
      console.error('Failed to save note:', error)
    }
  }

  const handleCustomUrl = async () => {
    if (!customUrl) {
      toast.error('Please enter a custom URL')
      return
    }
    
    if (!isUrlAvailable) {
      toast.error('This URL is not available')
      return
    }

    await handleSave()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    toast.success('Content copied!')
  }

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'note.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Note downloaded!')
  }

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the content?')) {
      setContent('')
      setLastSaved(null)
      toast.success('Content cleared!')
    }
  }

  const handleShare = () => {
    const shareUrl = customUrl ? `${window.location.origin}/note/${customUrl}` : temporaryUrl
    navigator.clipboard.writeText(shareUrl)
    toast.success('Link copied!')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSave()
    }
  }

  const adjustFontSize = (delta: number) => {
    setFontSize(prev => Math.max(12, Math.min(24, prev + delta)))
  }

  return (
    <div className="container py-4 md:py-8 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="card p-4 md:p-8 space-y-4 md:space-y-6">
          {/* Barra superior com informações e ações principais */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass rounded-xl p-4">
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="flex items-center space-x-2 text-sm font-medium">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FiClock className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground/80">
                  {lastSaved
                    ? `Last saved: ${lastSaved.toLocaleTimeString()}`
                    : 'No changes saved'}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSave}
                className="btn-primary"
                title="Save (Ctrl+S)"
              >
                <FiSave className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Save</span>
              </button>
              <button
                onClick={handleCopy}
                className="icon-btn glass"
                title="Copy"
              >
                <FiCopy className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownload}
                className="icon-btn glass"
                title="Download"
              >
                <FiDownload className="w-4 h-4" />
              </button>
              <button
                onClick={handleShare}
                className="icon-btn glass"
                title="Share"
              >
                <FiShare2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleClear}
                className="icon-btn glass text-destructive hover:text-destructive/80"
                title="Clear"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Área do editor */}
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowFormatting(true)}
              placeholder="Type your note here..."
              style={{ fontSize: `${fontSize}px` }}
              className="w-full h-[calc(100vh-20rem)] resize-none rounded-xl border border-input bg-white/50 dark:bg-black/50 px-6 py-4 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all font-sans"
            />

            {/* Barra de formatação flutuante */}
            {showFormatting && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 glass rounded-xl p-2 shadow-lg animate-slide-up">
                <div className="flex items-center gap-2 border-r border-border pr-2">
                  <button
                    onClick={() => adjustFontSize(-1)}
                    className="icon-btn glass"
                    title="Decrease font size"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium">{fontSize}px</span>
                  <button
                    onClick={() => adjustFontSize(1)}
                    className="icon-btn glass"
                    title="Increase font size"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Custom URL"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className={`input h-8 text-sm w-40 pr-8 ${
                        customUrl && (isUrlAvailable === true ? 'border-green-500' : isUrlAvailable === false ? 'border-red-500' : '')
                      }`}
                    />
                    {customUrl && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        {isUrlAvailable === true && <FiCheck className="w-4 h-4 text-green-500" />}
                        {isUrlAvailable === false && <FiLink className="w-4 h-4 text-red-500" />}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleCustomUrl}
                    disabled={!isUrlAvailable}
                    className={`icon-btn ${!isUrlAvailable ? 'opacity-50 cursor-not-allowed' : 'glass'}`}
                    title="Set URL"
                  >
                    <FiCheck className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsPasswordProtected(!isPasswordProtected)}
                    className={`icon-btn ${isPasswordProtected ? 'bg-primary text-primary-foreground' : 'glass'}`}
                    title="Password Protect"
                  >
                    <FiLock className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Campo de senha (se protegido) */}
          {isPasswordProtected && (
            <div className="glass rounded-xl p-4 animate-fade-in">
              <div className="flex items-center gap-4">
                <input
                  type="password"
                  placeholder="Enter password to protect the note"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input flex-1"
                />
                <button
                  onClick={handleSave}
                  className="btn-primary"
                  disabled={!password}
                >
                  Protect Note
                </button>
              </div>
            </div>
          )}

          {/* URL atual */}
          <div className="text-sm text-muted-foreground">
            Current URL: <span className="font-mono">{customUrl ? `${window.location.origin}/note/${customUrl}` : temporaryUrl}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 