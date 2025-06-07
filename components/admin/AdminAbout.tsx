'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"
import type { SiteContent } from '@/lib/content-config'

interface AdminAboutProps {
  content: SiteContent
  onContentChange: (content: SiteContent) => void
}

export default function AdminAbout({ content, onContentChange }: AdminAboutProps) {
  const [aboutData, setAboutData] = useState(content.about)

  const handleChange = (field: keyof typeof aboutData, value: string | string[]) => {
    const updatedAbout = { ...aboutData, [field]: value }
    setAboutData(updatedAbout)
    
    const updatedContent = {
      ...content,
      about: updatedAbout
    }
    onContentChange(updatedContent)
  }

  const addQualification = () => {
    const newQualifications = [...aboutData.qualifications, '']
    handleChange('qualifications', newQualifications)
  }

  const updateQualification = (index: number, value: string) => {
    const newQualifications = [...aboutData.qualifications]
    newQualifications[index] = value
    handleChange('qualifications', newQualifications)
  }

  const removeQualification = (index: number) => {
    const newQualifications = aboutData.qualifications.filter((_, i) => i !== index)
    handleChange('qualifications', newQualifications)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">About Section</h2>
        <p className="text-gray-600">Edit the about section content to tell your story and highlight your expertise.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Content</CardTitle>
          <CardDescription>
            Share your background, experience, and what makes you unique
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="aboutTitle">Section Title</Label>
              <Input
                id="aboutTitle"
                value={aboutData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter section title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aboutSubtitle">Subtitle</Label>
              <Input
                id="aboutSubtitle"
                value={aboutData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                placeholder="Enter subtitle"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aboutDescription">Description</Label>
            <Textarea
              id="aboutDescription"
              value={aboutData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Tell your story and highlight your expertise"
              rows={6}
            />
            <p className="text-xs text-gray-500">Share your background, teaching philosophy, and what makes you unique</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Text</Label>
              <Input
                id="experience"
                value={aboutData.experience}
                onChange={(e) => handleChange('experience', e.target.value)}
                placeholder="e.g., 8+ years of experience"
              />
              <p className="text-xs text-gray-500">Brief experience summary</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={aboutData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="/path/to/your-photo.jpg"
              />
              <p className="text-xs text-gray-500">Path to your profile photo</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Qualifications</Label>
              <Button
                type="button"
                onClick={addQualification}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Qualification
              </Button>
            </div>
            
            <div className="space-y-3">
              {aboutData.qualifications.map((qualification, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={qualification}
                    onChange={(e) => updateQualification(index, e.target.value)}
                    placeholder="Enter qualification or achievement"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={() => removeQualification(index)}
                    size="sm"
                    variant="outline"
                    className="px-3"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">Add your qualifications, certifications, and achievements</p>
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            This is how your about section will appear on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-8 rounded-lg border">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {aboutData.title}
                </h2>
                <p className="text-xl text-orange-600 font-semibold">
                  {aboutData.subtitle}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {aboutData.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                      {aboutData.experience}
                    </div>
                  </div>

                  {aboutData.qualifications.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Qualifications & Experience</h3>
                      <ul className="space-y-2">
                        {aboutData.qualifications.filter(q => q.trim()).map((qualification, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                            {qualification}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <div className="w-64 h-64 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                    {aboutData.image ? (
                      <img
                        src={aboutData.image}
                        alt="About"
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const nextEl = e.currentTarget.nextElementSibling as HTMLElement
                          if (nextEl) nextEl.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="text-gray-400 text-center">
                      <p className="text-sm">Profile Photo</p>
                      <p className="text-xs">{aboutData.image || 'No image set'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}