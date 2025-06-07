'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { 
  Home, 
  User, 
  Settings, 
  FileText, 
  PoundSterling, 
  MessageSquare, 
  Mail, 
  LogOut,
  Eye,
  Save,
  RotateCcw
} from "lucide-react"
import { setAdminAuth, saveContent, resetContent, adminLogout } from '@/lib/content-config'
import type { SiteContent } from '@/lib/content-config'

interface AdminNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
  onLogout: () => void
  content: SiteContent
  onContentChange: (content: SiteContent) => void
  onPreview: () => void
}

const navigationItems = [
  { id: 'hero', label: 'Hero Section', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'services', label: 'Services', icon: Settings },
  { id: 'pricing', label: 'Pricing', icon: PoundSterling },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'navigation', label: 'Navigation', icon: FileText },
]

export default function AdminNavigation({ 
  activeSection, 
  onSectionChange, 
  onLogout,
  content,
  onContentChange,
  onPreview
}: AdminNavigationProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const success = await saveContent(content)
      if (success) {
        // Show success feedback
        setTimeout(() => setIsSaving(false), 1000)
      } else {
        console.error('Failed to save content to server')
        setIsSaving(false)
      }
    } catch (error) {
      console.error('Error saving content:', error)
      setIsSaving(false)
    }
  }

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all content to defaults? This cannot be undone.')) {
      setIsResetting(true)
      try {
        const success = await resetContent()
        if (success) {
          window.location.reload() // Reload to get default content
        } else {
          console.error('Failed to reset content')
          setIsResetting(false)
        }
      } catch (error) {
        console.error('Error resetting content:', error)
        setIsResetting(false)
      }
    }
  }

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout? Make sure to save your changes first.')) {
      try {
        await adminLogout()
        setAdminAuth(false) // Clear local state too
        onLogout()
      } catch (error) {
        console.error('Error during logout:', error)
        // Still logout locally if server request fails
        setAdminAuth(false)
        onLogout()
      }
    }
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Content Manager</h1>
        <p className="text-sm text-gray-500">Word & Wonder Admin</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === item.id
                  ? 'bg-orange-100 text-orange-800 border border-orange-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button
          onClick={onPreview}
          variant="outline"
          className="w-full"
          size="sm"
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview Site
        </Button>
        
        <Button
          onClick={handleSave}
          className="w-full bg-orange-200 hover:bg-orange-300 text-gray-900"
          size="sm"
          disabled={isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>

        <Button
          onClick={handleReset}
          variant="outline"
          className="w-full text-red-600 border-red-200 hover:bg-red-50"
          size="sm"
          disabled={isResetting}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          {isResetting ? 'Resetting...' : 'Reset All'}
        </Button>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full text-gray-500 hover:text-gray-700"
          size="sm"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}