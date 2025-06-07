'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import type { SiteContent } from '@/lib/content-config'

interface AdminContactProps {
  content: SiteContent
  onContentChange: (content: SiteContent) => void
}

export default function AdminContact({ content, onContentChange }: AdminContactProps) {
  const [contactData, setContactData] = useState(content.contact)

  const handleChange = (field: keyof typeof contactData, value: string) => {
    const updatedContact = { ...contactData, [field]: value }
    setContactData(updatedContact)
    
    const updatedContent = {
      ...content,
      contact: updatedContact
    }
    onContentChange(updatedContent)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Contact Section</h2>
        <p className="text-gray-600">Edit your contact information and section content.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Update your contact details that visitors will see
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactTitle">Section Title</Label>
              <Input
                id="contactTitle"
                value={contactData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter section title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactSubtitle">Subtitle</Label>
              <Input
                id="contactSubtitle"
                value={contactData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                placeholder="Enter subtitle"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={contactData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="hello@example.com"
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-gray-500">Your primary contact email</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={contactData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+44 7123 456789"
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-gray-500">Your contact phone number</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location/Service Area</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="location"
                value={contactData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Online & Home Visits (Greater London)"
                className="pl-10"
              />
            </div>
            <p className="text-xs text-gray-500">Where you provide services</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours">Business Hours</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="hours"
                value={contactData.hours}
                onChange={(e) => handleChange('hours', e.target.value)}
                placeholder="Monday - Saturday: 9:00 AM - 8:00 PM"
                className="pl-10"
              />
            </div>
            <p className="text-xs text-gray-500">Your availability hours</p>
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            This is how your contact section will appear on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-8 rounded-lg border">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {contactData.title}
              </h2>
              <p className="text-xl text-orange-600 font-semibold mb-12">
                {contactData.subtitle}
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600 text-sm">{contactData.email}</p>
                </div>

                <div className="text-center">
                  <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                  <p className="text-gray-600 text-sm">{contactData.phone}</p>
                </div>

                <div className="text-center">
                  <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600 text-sm">{contactData.location}</p>
                </div>

                <div className="text-center">
                  <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Hours</h3>
                  <p className="text-gray-600 text-sm">{contactData.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
