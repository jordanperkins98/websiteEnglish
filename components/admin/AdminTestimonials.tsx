'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Plus, ChevronUp, ChevronDown, Trash2, Star } from "lucide-react"
import type { SiteContent, TestimonialItem } from '@/lib/content-config'

interface AdminTestimonialsProps {
  content: SiteContent
  onContentChange: (content: SiteContent) => void
}

export default function AdminTestimonials({ content, onContentChange }: AdminTestimonialsProps) {
  const [testimonialsData, setTestimonialsData] = useState(content.testimonials)
  const [testimonials, setTestimonials] = useState([...content.testimonials.reviews].sort((a, b) => a.order - b.order))
  const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null)

  const updateTestimonialsData = (field: 'title' | 'subtitle', value: string) => {
    const updatedTestimonials = { ...testimonialsData, [field]: value }
    setTestimonialsData(updatedTestimonials)
    
    const updatedContent = {
      ...content,
      testimonials: { ...updatedTestimonials, reviews: testimonials }
    }
    onContentChange(updatedContent)
  }

  const updateTestimonials = (newTestimonials: TestimonialItem[]) => {
    setTestimonials(newTestimonials)
    const updatedContent = {
      ...content,
      testimonials: { ...testimonialsData, reviews: newTestimonials }
    }
    onContentChange(updatedContent)
  }

  const addTestimonial = () => {
    const newTestimonial: TestimonialItem = {
      id: `testimonial-${Date.now()}`,
      name: 'New Customer',
      role: 'Student',
      content: 'Enter testimonial content here...',
      rating: 5,
      image: '/testimonial-placeholder.jpg',
      order: testimonials.length + 1
    }
    updateTestimonials([...testimonials, newTestimonial])
    setEditingTestimonial(newTestimonial.id)
  }

  const updateTestimonial = (id: string, updatedTestimonial: Partial<TestimonialItem>) => {
    const newTestimonials = testimonials.map(testimonial =>
      testimonial.id === id ? { ...testimonial, ...updatedTestimonial } : testimonial
    )
    updateTestimonials(newTestimonials)
  }

  const deleteTestimonial = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      const newTestimonials = testimonials.filter(testimonial => testimonial.id !== id)
      updateTestimonials(newTestimonials)
    }
  }

  const moveTestimonial = (id: string, direction: 'up' | 'down') => {
    const currentIndex = testimonials.findIndex(testimonial => testimonial.id === id)
    if (currentIndex === -1) return

    const newTestimonials = [...testimonials]
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (targetIndex < 0 || targetIndex >= newTestimonials.length) return

    [newTestimonials[currentIndex], newTestimonials[targetIndex]] = [newTestimonials[targetIndex], newTestimonials[currentIndex]]
    
    newTestimonials.forEach((testimonial, index) => {
      testimonial.order = index + 1
    })

    updateTestimonials(newTestimonials)
  }

  const renderStars = (rating: number, onRatingChange: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`p-1 rounded transition-colors ${
              star <= rating 
                ? 'text-yellow-400 hover:text-yellow-500' 
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <Star className={`h-5 w-5 ${star <= rating ? 'fill-current' : ''}`} />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Testimonials Section</h2>
        <p className="text-gray-600">Manage customer testimonials and reviews.</p>
      </div>

      {/* Section Header */}
      <Card>
        <CardHeader>
          <CardTitle>Section Header</CardTitle>
          <CardDescription>Edit the testimonials section title and subtitle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="testimonialsTitle">Section Title</Label>
              <Input
                id="testimonialsTitle"
                value={testimonialsData.title}
                onChange={(e) => updateTestimonialsData('title', e.target.value)}
                placeholder="Enter section title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonialsSubtitle">Subtitle</Label>
              <Input
                id="testimonialsSubtitle"
                value={testimonialsData.subtitle}
                onChange={(e) => updateTestimonialsData('subtitle', e.target.value)}
                placeholder="Enter subtitle"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Customer Testimonials</h3>
        <Button onClick={addTestimonial} className="bg-orange-200 hover:bg-orange-300 text-gray-900">
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <Card key={testimonial.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <Button
                      onClick={() => moveTestimonial(testimonial.id, 'up')}
                      disabled={index === 0}
                      size="sm"
                      variant="outline"
                      className="p-1 h-6 w-6"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={() => moveTestimonial(testimonial.id, 'down')}
                      disabled={index === testimonials.length - 1}
                      size="sm"
                      variant="outline"
                      className="p-1 h-6 w-6"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      {testimonial.role}
                      <div className="flex">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setEditingTestimonial(editingTestimonial === testimonial.id ? null : testimonial.id)}
                    variant="outline"
                    size="sm"
                  >
                    {editingTestimonial === testimonial.id ? 'Close' : 'Edit'}
                  </Button>
                  <Button
                    onClick={() => deleteTestimonial(testimonial.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {editingTestimonial === testimonial.id && (
              <CardContent className="space-y-6 border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Customer Name</Label>
                    <Input
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(testimonial.id, { name: e.target.value })}
                      placeholder="Enter customer name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Role/Title</Label>
                    <Input
                      value={testimonial.role}
                      onChange={(e) => updateTestimonial(testimonial.id, { role: e.target.value })}
                      placeholder="e.g., GCSE Student, Parent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Testimonial Content</Label>
                  <Textarea
                    value={testimonial.content}
                    onChange={(e) => updateTestimonial(testimonial.id, { content: e.target.value })}
                    placeholder="Enter testimonial content"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Rating</Label>
                    {renderStars(testimonial.rating, (rating) => 
                      updateTestimonial(testimonial.id, { rating })
                    )}
                    <p className="text-xs text-gray-500">Click stars to set rating</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Profile Image URL</Label>
                    <Input
                      value={testimonial.image}
                      onChange={(e) => updateTestimonial(testimonial.id, { image: e.target.value })}
                      placeholder="/path/to/customer-photo.jpg"
                    />
                  </div>
                </div>
              </CardContent>
            )}

            {editingTestimonial !== testimonial.id && (
              <CardContent>
                <blockquote className="text-gray-600 italic mb-4">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                    {testimonial.image ? 'IMG' : 'No IMG'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No testimonials added yet.</p>
            <Button onClick={addTestimonial} className="bg-orange-200 hover:bg-orange-300 text-gray-900">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Testimonial
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
