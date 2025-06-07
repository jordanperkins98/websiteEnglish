'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, X, ChevronUp, ChevronDown, Trash2, Crown } from "lucide-react"
import type { SiteContent, PricingPlan } from '@/lib/content-config'

interface AdminPricingProps {
  content: SiteContent
  onContentChange: (content: SiteContent) => void
}

export default function AdminPricing({ content, onContentChange }: AdminPricingProps) {
  const [pricingData, setPricingData] = useState(content.pricing)
  const [plans, setPlans] = useState([...content.pricing.plans].sort((a, b) => a.order - b.order))
  const [editingPlan, setEditingPlan] = useState<string | null>(null)

  const updatePricingData = (field: 'title' | 'subtitle', value: string) => {
    const updatedPricing = { ...pricingData, [field]: value }
    setPricingData(updatedPricing)
    
    const updatedContent = {
      ...content,
      pricing: { ...updatedPricing, plans }
    }
    onContentChange(updatedContent)
  }

  const updatePlans = (newPlans: PricingPlan[]) => {
    setPlans(newPlans)
    const updatedContent = {
      ...content,
      pricing: { ...pricingData, plans: newPlans }
    }
    onContentChange(updatedContent)
  }

  const addPlan = () => {
    const newPlan: PricingPlan = {
      id: `plan-${Date.now()}`,
      name: 'New Plan',
      price: '£0',
      duration: 'per hour',
      description: 'Enter plan description',
      features: ['Feature 1', 'Feature 2'],
      isPopular: false,
      order: plans.length + 1
    }
    updatePlans([...plans, newPlan])
    setEditingPlan(newPlan.id)
  }

  const updatePlan = (id: string, updatedPlan: Partial<PricingPlan>) => {
    const newPlans = plans.map(plan =>
      plan.id === id ? { ...plan, ...updatedPlan } : plan
    )
    updatePlans(newPlans)
  }

  const deletePlan = (id: string) => {
    if (confirm('Are you sure you want to delete this plan?')) {
      const newPlans = plans.filter(plan => plan.id !== id)
      updatePlans(newPlans)
    }
  }

  const movePlan = (id: string, direction: 'up' | 'down') => {
    const currentIndex = plans.findIndex(plan => plan.id === id)
    if (currentIndex === -1) return

    const newPlans = [...plans]
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (targetIndex < 0 || targetIndex >= newPlans.length) return

    [newPlans[currentIndex], newPlans[targetIndex]] = [newPlans[targetIndex], newPlans[currentIndex]]
    
    newPlans.forEach((plan, index) => {
      plan.order = index + 1
    })

    updatePlans(newPlans)
  }

  const addFeature = (planId: string) => {
    const plan = plans.find(p => p.id === planId)
    if (plan) {
      updatePlan(planId, {
        features: [...plan.features, 'New feature']
      })
    }
  }

  const updateFeature = (planId: string, featureIndex: number, value: string) => {
    const plan = plans.find(p => p.id === planId)
    if (plan) {
      const newFeatures = [...plan.features]
      newFeatures[featureIndex] = value
      updatePlan(planId, { features: newFeatures })
    }
  }

  const removeFeature = (planId: string, featureIndex: number) => {
    const plan = plans.find(p => p.id === planId)
    if (plan) {
      const newFeatures = plan.features.filter((_, index) => index !== featureIndex)
      updatePlan(planId, { features: newFeatures })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Pricing Section</h2>
        <p className="text-gray-600">Manage your pricing plans and section content.</p>
      </div>

      {/* Section Header */}
      <Card>
        <CardHeader>
          <CardTitle>Section Header</CardTitle>
          <CardDescription>Edit the pricing section title and subtitle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pricingTitle">Section Title</Label>
              <Input
                id="pricingTitle"
                value={pricingData.title}
                onChange={(e) => updatePricingData('title', e.target.value)}
                placeholder="Enter section title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pricingSubtitle">Subtitle</Label>
              <Input
                id="pricingSubtitle"
                value={pricingData.subtitle}
                onChange={(e) => updatePricingData('subtitle', e.target.value)}
                placeholder="Enter subtitle"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Pricing Plans</h3>
        <Button onClick={addPlan} className="bg-orange-200 hover:bg-orange-300 text-gray-900">
          <Plus className="h-4 w-4 mr-2" />
          Add Plan
        </Button>
      </div>

      <div className="grid gap-4">
        {plans.map((plan, index) => (
          <Card key={plan.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <Button
                      onClick={() => movePlan(plan.id, 'up')}
                      disabled={index === 0}
                      size="sm"
                      variant="outline"
                      className="p-1 h-6 w-6"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={() => movePlan(plan.id, 'down')}
                      disabled={index === plans.length - 1}
                      size="sm"
                      variant="outline"
                      className="p-1 h-6 w-6"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {plan.name}
                        {plan.isPopular && <Crown className="h-4 w-4 text-orange-600" />}
                      </CardTitle>
                      <CardDescription>{plan.price} {plan.duration}</CardDescription>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setEditingPlan(editingPlan === plan.id ? null : plan.id)}
                    variant="outline"
                    size="sm"
                  >
                    {editingPlan === plan.id ? 'Close' : 'Edit'}
                  </Button>
                  <Button
                    onClick={() => deletePlan(plan.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {editingPlan === plan.id && (
              <CardContent className="space-y-6 border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Plan Name</Label>
                    <Input
                      value={plan.name}
                      onChange={(e) => updatePlan(plan.id, { name: e.target.value })}
                      placeholder="Enter plan name"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`popular-${plan.id}`}
                      checked={plan.isPopular}
                      onCheckedChange={(checked) => updatePlan(plan.id, { isPopular: checked })}
                    />
                    <Label htmlFor={`popular-${plan.id}`}>Mark as Popular</Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      value={plan.price}
                      onChange={(e) => updatePlan(plan.id, { price: e.target.value })}
                      placeholder="£45"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={plan.duration}
                      onChange={(e) => updatePlan(plan.id, { duration: e.target.value })}
                      placeholder="per hour"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={plan.description}
                    onChange={(e) => updatePlan(plan.id, { description: e.target.value })}
                    placeholder="Enter plan description"
                    rows={2}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Features</Label>
                    <Button
                      type="button"
                      onClick={() => addFeature(plan.id)}
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature(plan.id, featureIndex, e.target.value)}
                          placeholder="Enter feature"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={() => removeFeature(plan.id, featureIndex)}
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

            {editingPlan !== plan.id && (
              <CardContent>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="space-y-2">
                  {plan.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                  {plan.features.length > 3 && (
                    <p className="text-xs text-gray-500">+{plan.features.length - 3} more features</p>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {plans.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No pricing plans added yet.</p>
            <Button onClick={addPlan} className="bg-orange-200 hover:bg-orange-300 text-gray-900">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Plan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}