'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, ChevronUp, ChevronDown, Trash2 } from "lucide-react"
import type { SiteContent, ServiceItem } from '@/lib/content-config'

interface AdminServicesProps {
  content: SiteContent
  onContentChange: (content: SiteContent) => void
}

const iconOptions = [
  'BookOpen', 'Users', 'Clock', 'Star', 'Award', 'Target', 
  'Lightbulb', 'Graduation', 'FileText', 'Zap', 'Heart', 'Shield'
]

export default function AdminServices({ content, onContentChange }: AdminServicesProps) {
  const [services, setServices] = useState([...content.services].sort((a, b) => a.order - b.order))
  const [editingService, setEditingService] = useState<string | null>(null)

  const updateServices = (newServices: ServiceItem[]) => {
    setServices(newServices)
    const updatedContent = {
      ...content,
      services: newServices
    }
    onContentChange(updatedContent)
  }

  const addService = () => {
    const newService: ServiceItem = {
      id: `service-${Date.now()}`,
      icon: 'BookOpen',
      title: 'New Service',
      description: 'Enter service description',
      features: ['Feature 1', 'Feature 2'],
      image: '/service-image.jpg',
      order: services.length + 1
    }
    updateServices([...services, newService])
    setEditingService(newService.id)
  }

  const updateService = (id: string, updatedService: Partial<ServiceItem>) => {
    const newServices = services.map(service =>
      service.id === id ? { ...service, ...updatedService } : service
    )
    updateServices(newServices)
  }

  const deleteService = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const newServices = services.filter(service => service.id !== id)
      updateServices(newServices)
    }
  }

  const moveService = (id: string, direction: 'up' | 'down') => {
    const currentIndex = services.findIndex(service => service.id === id)
    if (currentIndex === -1) return

    const newServices = [...services]
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (targetIndex < 0 || targetIndex >= newServices.length) return

    // Swap services
    [newServices[currentIndex], newServices[targetIndex]] = [newServices[targetIndex], newServices[currentIndex]]
    
    // Update order numbers
    newServices.forEach((service, index) => {
      service.order = index + 1
    })

    updateServices(newServices)
  }

  const addFeature = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId)
    if (service) {
      updateService(serviceId, {
        features: [...service.features, 'New feature']
      })
    }
  }

  const updateFeature = (serviceId: string, featureIndex: number, value: string) => {
    const service = services.find(s => s.id === serviceId)
    if (service) {
      const newFeatures = [...service.features]
      newFeatures[featureIndex] = value
      updateService(serviceId, { features: newFeatures })
    }
  }

  const removeFeature = (serviceId: string, featureIndex: number) => {
    const service = services.find(s => s.id === serviceId)
    if (service) {
      const newFeatures = service.features.filter((_, index) => index !== featureIndex)
      updateService(serviceId, { features: newFeatures })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Services</h2>
          <p className="text-gray-600">Manage your service offerings and their details.</p>
        </div>
        <Button onClick={addService} className="bg-orange-200 hover:bg-orange-300 text-gray-900">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="space-y-4">
        {services.map((service, index) => (
          <Card key={service.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <Button
                      onClick={() => moveService(service.id, 'up')}
                      disabled={index === 0}
                      size="sm"
                      variant="outline"
                      className="p-1 h-6 w-6"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={() => moveService(service.id, 'down')}
                      disabled={index === services.length - 1}
                      size="sm"
                      variant="outline"
                      className="p-1 h-6 w-6"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription>Order: {service.order}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setEditingService(editingService === service.id ? null : service.id)}
                    variant="outline"
                    size="sm"
                  >
                    {editingService === service.id ? 'Close' : 'Edit'}
                  </Button>
                  <Button
                    onClick={() => deleteService(service.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {editingService === service.id && (
              <CardContent className="space-y-6 border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Service Title</Label>
                    <Input
                      value={service.title}
                      onChange={(e) => updateService(service.id, { title: e.target.value })}
                      placeholder="Enter service title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <Select
                      value={service.icon}
                      onValueChange={(value) => updateService(service.id, { icon: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map(icon => (
                          <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={service.description}
                    onChange={(e) => updateService(service.id, { description: e.target.value })}
                    placeholder="Enter service description"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={service.image}
                    onChange={(e) => updateService(service.id, { image: e.target.value })}
                    placeholder="/path/to/service-image.jpg"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Features</Label>
                    <Button
                      type="button"
                      onClick={() => addFeature(service.id)}
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature(service.id, featureIndex, e.target.value)}
                          placeholder="Enter feature"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={() => removeFeature(service.id, featureIndex)}
                          size="sm"
                          variant="outline"
                          className="px-3"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}

            {editingService !== service.id && (
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="text-xs text-gray-500">+{service.features.length - 3} more</span>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {services.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No services added yet.</p>
            <Button onClick={addService} className="bg-orange-200 hover:bg-orange-300 text-gray-900">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Service
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}