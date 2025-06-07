'use client'

import { useState, useEffect } from 'react'
import AdminLogin from '@/components/admin/AdminLogin'
import AdminNavigation from '@/components/admin/AdminNavigation'
import AdminHero from '@/components/admin/AdminHero'
import AdminAbout from '@/components/admin/AdminAbout'
import AdminServices from '@/components/admin/AdminServices'
import AdminPricing from '@/components/admin/AdminPricing'
import AdminTestimonials from '@/components/admin/AdminTestimonials'
import AdminContact from '@/components/admin/AdminContact'
import AdminNavigationAndFooter from '@/components/admin/AdminNavigationAndFooter'
import AdminPreview from '@/components/admin/AdminPreview'
import { checkAdminAuthClient, getContentClient, saveContent, adminLogout, setAdminAuth, type SiteContent } from '@/lib/content-config'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const [content, setContent] = useState<SiteContent | null>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await checkAdminAuthClient()
        setIsAuthenticated(authStatus)
        
        if (authStatus) {
          const currentContent = getContentClient()
          setContent(currentContent)
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        setIsAuthenticated(false)
      }
      
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    const currentContent = getContentClient()
    setContent(currentContent)
  }

  const handleLogout = async () => {
    try {
      await adminLogout()
      setAdminAuth(false)
    } catch (error) {
      console.error('Error during logout:', error)
      // Still logout locally if server request fails
      setAdminAuth(false)
    }
    
    setIsAuthenticated(false)
    setContent(null)
    setActiveSection('hero')
    setIsPreviewMode(false)
  }

  const handleContentChange = async (newContent: SiteContent) => {
    setContent(newContent)
    // Auto-save changes to server
    const success = await saveContent(newContent)
    if (!success) {
      console.error('Failed to save content to server')
      // You could show a toast notification here
    }
  }

  const handlePreview = () => {
    setIsPreviewMode(true)
  }

  const handleBackToEdit = () => {
    setIsPreviewMode(false)
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  // Show main admin interface
  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    )
  }

  const renderActiveSection = () => {
    if (isPreviewMode) {
      return <AdminPreview content={content} onBackToEdit={handleBackToEdit} />
    }

    switch (activeSection) {
      case 'hero':
        return <AdminHero content={content} onContentChange={handleContentChange} />
      case 'about':
        return <AdminAbout content={content} onContentChange={handleContentChange} />
      case 'services':
        return <AdminServices content={content} onContentChange={handleContentChange} />
      case 'pricing':
        return <AdminPricing content={content} onContentChange={handleContentChange} />
      case 'testimonials':
        return <AdminTestimonials content={content} onContentChange={handleContentChange} />
      case 'contact':
        return <AdminContact content={content} onContentChange={handleContentChange} />
      case 'navigation':
        return <AdminNavigationAndFooter content={content} onContentChange={handleContentChange} />
      default:
        return <AdminHero content={content} onContentChange={handleContentChange} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <AdminNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
        content={content}
        onContentChange={handleContentChange}
        onPreview={handlePreview}
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-8">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  )
}