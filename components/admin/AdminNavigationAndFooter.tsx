'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Plus, X, ChevronUp, ChevronDown, Trash2, Menu } from "lucide-react"
import type { SiteContent, NavItem, SocialLink } from '@/lib/content-config'

interface AdminNavigationAndFooterProps {
  content: SiteContent
  onContentChange: (content: SiteContent) => void
}

export default function AdminNavigationAndFooter({ content, onContentChange }: AdminNavigationAndFooterProps) {
  const [navigationData, setNavigationData] = useState(content.navigation)
  const [footerData, setFooterData] = useState(content.footer)
  const [menuItems, setMenuItems] = useState([...content.navigation.menuItems].sort((a, b) => a.order - b.order))
  const [socialLinks, setSocialLinks] = useState([...content.footer.socialLinks])

  const updateNavigationData = (field: 'logo', value: string) => {
    const updatedNavigation = { ...navigationData, [field]: value }
    setNavigationData(updatedNavigation)
    updateContent({ navigation: { ...updatedNavigation, menuItems } })
  }

  const updateFooterData = (field: 'description', value: string) => {
    const updatedFooter = { ...footerData, [field]: value }
    setFooterData(updatedFooter)
    updateContent({ footer: { ...updatedFooter, socialLinks } })
  }

  const updateContent = (updates: Partial<SiteContent>) => {
    const updatedContent = { ...content, ...updates }
    onContentChange(updatedContent)
  }

  const updateMenuItems = (newMenuItems: NavItem[]) => {
    setMenuItems(newMenuItems)
    updateContent({ 
      navigation: { ...navigationData, menuItems: newMenuItems }
    })
  }

  const updateSocialLinks = (newSocialLinks: SocialLink[]) => {
    setSocialLinks(newSocialLinks)
    updateContent({ 
      footer: { ...footerData, socialLinks: newSocialLinks }
    })
  }

  // Menu item functions
  const addMenuItem = () => {
    const newItem: NavItem = {
      id: `nav-${Date.now()}`,
      label: 'New Page',
      href: '#new-page',
      order: menuItems.length + 1
    }
    updateMenuItems([...menuItems, newItem])
  }

  const updateMenuItem = (id: string, updatedItem: Partial<NavItem>) => {
    const newMenuItems = menuItems.map(item =>
      item.id === id ? { ...item, ...updatedItem } : item
    )
    updateMenuItems(newMenuItems)
  }

  const deleteMenuItem = (id: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      const newMenuItems = menuItems.filter(item => item.id !== id)
      updateMenuItems(newMenuItems)
    }
  }

  const moveMenuItem = (id: string, direction: 'up' | 'down') => {
    const currentIndex = menuItems.findIndex(item => item.id === id)
    if (currentIndex === -1) return

    const newMenuItems = [...menuItems]
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (targetIndex < 0 || targetIndex >= newMenuItems.length) return

    [newMenuItems[currentIndex], newMenuItems[targetIndex]] = [newMenuItems[targetIndex], newMenuItems[currentIndex]]
    
    newMenuItems.forEach((item, index) => {
      item.order = index + 1
    })

    updateMenuItems(newMenuItems)
  }

  // Social link functions
  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: `social-${Date.now()}`,
      platform: 'New Platform',
      url: 'https://example.com',
      icon: 'Globe'
    }
    updateSocialLinks([...socialLinks, newLink])
  }

  const updateSocialLink = (id: string, updatedLink: Partial<SocialLink>) => {
    const newSocialLinks = socialLinks.map(link =>
      link.id === id ? { ...link, ...updatedLink } : link
    )
    updateSocialLinks(newSocialLinks)
  }

  const deleteSocialLink = (id: string) => {
    if (confirm('Are you sure you want to delete this social link?')) {
      const newSocialLinks = socialLinks.filter(link => link.id !== id)
      updateSocialLinks(newSocialLinks)
    }
  }

  const iconOptions = ['Facebook', 'Twitter', 'LinkedIn', 'Instagram', 'YouTube', 'Globe', 'Mail']

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Navigation & Footer</h2>
        <p className="text-gray-600">Manage your website navigation menu and footer content.</p>
      </div>

      {/* Navigation Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Settings</CardTitle>
          <CardDescription>Configure your website logo and navigation menu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              value={navigationData.logo}
              onChange={(e) => updateNavigationData('logo', e.target.value)}
              placeholder="/path/to/logo.svg"
            />
            <p className="text-xs text-gray-500">Path to your logo file</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Menu Items</Label>
              <Button
                onClick={addMenuItem}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Menu Item
              </Button>
            </div>
            
            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <Button
                        onClick={() => moveMenuItem(item.id, 'up')}
                        disabled={index === 0}
                        size="sm"
                        variant="outline"
                        className="p-1 h-6 w-6"
                      >
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                      <Button
                        onClick={() => moveMenuItem(item.id, 'down')}
                        disabled={index === menuItems.length - 1}
                        size="sm"
                        variant="outline"
                        className="p-1 h-6 w-6"
                      >
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        value={item.label}
                        onChange={(e) => updateMenuItem(item.id, { label: e.target.value })}
                        placeholder="Menu label"
                      />
                      <Input
                        value={item.href}
                        onChange={(e) => updateMenuItem(item.id, { href: e.target.value })}
                        placeholder="Link (e.g., #about)"
                      />
                    </div>

                    <Button
                      onClick={() => deleteMenuItem(item.id)}
                      size="sm"
                      variant="outline"
                      className="px-3"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Footer Settings</CardTitle>
          <CardDescription>Configure your footer content and social links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="footerDescription">Footer Description</Label>
            <Textarea
              id="footerDescription"
              value={footerData.description}
              onChange={(e) => updateFooterData('description', e.target.value)}
              placeholder="Enter footer description"
              rows={3}
            />
            <p className="text-xs text-gray-500">A brief description of your business for the footer</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Social Media Links</Label>
              <Button
                onClick={addSocialLink}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Social Link
              </Button>
            </div>
            
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <Card key={link.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Input
                        value={link.platform}
                        onChange={(e) => updateSocialLink(link.id, { platform: e.target.value })}
                        placeholder="Platform name"
                      />
                      <Input
                        value={link.url}
                        onChange={(e) => updateSocialLink(link.id, { url: e.target.value })}
                        placeholder="https://..."
                      />
                      <select
                        value={link.icon}
                        onChange={(e) => updateSocialLink(link.id, { icon: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      >
                        {iconOptions.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>

                    <Button
                      onClick={() => deleteSocialLink(link.id)}
                      size="sm"
                      variant="outline"
                      className="px-3"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>How your navigation and footer will appear</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Navigation Preview */}
          <div className="border rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Menu className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">Logo: {navigationData.logo}</span>
              </div>
              <div className="hidden md:flex items-center gap-4">
                {menuItems.map((item) => (
                  <span key={item.id} className="text-sm text-gray-600 hover:text-orange-800 cursor-pointer">
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Preview */}
          <div className="border rounded-lg p-6 bg-white">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                {footerData.description}
              </p>
              <div className="flex justify-center gap-4">
                {socialLinks.map((link) => (
                  <div key={link.id} className="flex items-center gap-1 text-xs text-gray-500">
                    <span>{link.icon}</span>
                    <span>{link.platform}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
