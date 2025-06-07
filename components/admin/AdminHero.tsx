'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import type { SiteContent } from '@/lib/content-config'

interface AdminHeroProps {
  content: SiteContent
  onContentChange: (content: SiteContent) => void
}

export default function AdminHero({ content, onContentChange }: AdminHeroProps) {
  const [heroData, setHeroData] = useState(content.hero)

  const handleChange = (field: keyof typeof heroData, value: string) => {
    const updatedHero = { ...heroData, [field]: value }
    setHeroData(updatedHero)
    
    const updatedContent = {
      ...content,
      hero: updatedHero
    }
    onContentChange(updatedContent)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Hero Section</h2>
        <p className="text-gray-600">Edit the main hero section content that appears at the top of your website.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
          <CardDescription>
            This is the first thing visitors see on your website. Make it compelling!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Main Title</Label>
              <Textarea
                id="title"
                value={heroData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter main title"
                rows={3}
              />
              <p className="text-xs text-gray-500">The primary headline visitors will see</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={heroData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                placeholder="Enter subtitle"
              />
              <p className="text-xs text-gray-500">A short tagline or subtitle</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={heroData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter description"
              rows={4}
            />
            <p className="text-xs text-gray-500">A longer description of your services and value proposition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="badgeText">Badge Text</Label>
              <Input
                id="badgeText"
                value={heroData.badgeText}
                onChange={(e) => handleChange('badgeText', e.target.value)}
                placeholder="Enter badge text"
              />
              <p className="text-xs text-gray-500">Small badge text (e.g., "🇬🇧 UK Specialist")</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ctaButton">Primary Button Text</Label>
              <Input
                id="ctaButton"
                value={heroData.ctaButton}
                onChange={(e) => handleChange('ctaButton', e.target.value)}
                placeholder="Enter primary button text"
              />
              <p className="text-xs text-gray-500">Main call-to-action button</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryButton">Secondary Button Text</Label>
              <Input
                id="secondaryButton"
                value={heroData.secondaryButton}
                onChange={(e) => handleChange('secondaryButton', e.target.value)}
                placeholder="Enter secondary button text"
              />
              <p className="text-xs text-gray-500">Secondary action button</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            This is how your hero section will appear on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-b from-orange-50 to-white p-8 rounded-lg border">
            <div className="text-center max-w-4xl">
              {heroData.badgeText && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 mb-4">
                  {heroData.badgeText}
                </div>
              )}
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {heroData.title}
              </h1>
              
              {heroData.subtitle && (
                <h2 className="text-xl text-orange-600 font-semibold mb-6">
                  {heroData.subtitle}
                </h2>
              )}
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {heroData.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-orange-200 hover:bg-orange-300 text-gray-900">
                  {heroData.ctaButton}
                </Button>
                <Button variant="outline">
                  {heroData.secondaryButton}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}