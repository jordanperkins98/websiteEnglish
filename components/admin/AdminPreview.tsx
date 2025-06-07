'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, ExternalLink } from "lucide-react"
import type { SiteContent } from '@/lib/content-config'

interface AdminPreviewProps {
  content: SiteContent
  onBackToEdit: () => void
}

export default function AdminPreview({ content, onBackToEdit }: AdminPreviewProps) {
  const openInNewTab = () => {
    // In a real implementation, you'd generate a preview URL
    window.open('/', '_blank')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Preview Website</h2>
          <p className="text-gray-600">Review how your website will look with the current content.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onBackToEdit} variant="outline">
            Back to Editor
          </Button>
          <Button onClick={openInNewTab} className="bg-orange-200 hover:bg-orange-300 text-gray-900">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in New Tab
          </Button>
        </div>
      </div>

      {/* Preview Cards */}
      <div className="grid gap-6">
        {/* Hero Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Hero Section
            </CardTitle>
            <CardDescription>Main landing section</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-b from-orange-50 to-white p-8 rounded-lg border">
              <div className="text-center max-w-4xl">
                {content.hero.badgeText && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 mb-4">
                    {content.hero.badgeText}
                  </div>
                )}
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {content.hero.title}
                </h1>
                
                {content.hero.subtitle && (
                  <h2 className="text-xl text-orange-600 font-semibold mb-6">
                    {content.hero.subtitle}
                  </h2>
                )}
                
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  {content.hero.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-orange-200 hover:bg-orange-300 text-gray-900">
                    {content.hero.ctaButton}
                  </Button>
                  <Button variant="outline">
                    {content.hero.secondaryButton}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              About Section
            </CardTitle>
            <CardDescription>About section content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-8 rounded-lg border">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {content.about.title}
                </h2>
                <p className="text-xl text-orange-600 font-semibold">
                  {content.about.subtitle}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {content.about.description}
                  </p>
                  
                  <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
                    {content.about.experience}
                  </div>

                  {content.about.qualifications.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Qualifications</h3>
                      <ul className="space-y-2">
                        {content.about.qualifications.slice(0, 3).map((qualification, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                            {qualification}
                          </li>
                        ))}
                        {content.about.qualifications.length > 3 && (
                          <li className="text-xs text-gray-500">
                            +{content.about.qualifications.length - 3} more qualifications
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <p className="text-sm">Profile Photo</p>
                      <p className="text-xs">{content.about.image}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Services Section
            </CardTitle>
            <CardDescription>{content.services.length} services configured</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-8 rounded-lg border">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {content.services.slice(0, 6).map((service) => (
                  <div key={service.id} className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <div className="space-y-1">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                          <div className="w-1 h-1 bg-orange-600 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                      {service.features.length > 2 && (
                        <p className="text-xs text-gray-500">+{service.features.length - 2} more</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Pricing Section
            </CardTitle>
            <CardDescription>{content.pricing.plans.length} pricing plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-8 rounded-lg border">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {content.pricing.title}
                </h2>
                <p className="text-gray-600">{content.pricing.subtitle}</p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-3">
                {content.pricing.plans.map((plan) => (
                  <div key={plan.id} className={`border rounded-lg p-6 ${plan.isPopular ? 'border-orange-300 bg-orange-50' : ''}`}>
                    {plan.isPopular && (
                      <div className="text-center mb-4">
                        <span className="bg-orange-200 text-orange-800 text-xs font-medium px-2 py-1 rounded">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {plan.price} <span className="text-sm text-gray-600">{plan.duration}</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                      {plan.features.length > 3 && (
                        <li className="text-xs text-gray-500">+{plan.features.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Testimonials Section
            </CardTitle>
            <CardDescription>{content.testimonials.reviews.length} testimonials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-orange-50 p-8 rounded-lg border">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {content.testimonials.title}
                </h2>
                <p className="text-gray-600">{content.testimonials.subtitle}</p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-3">
                {content.testimonials.reviews.slice(0, 3).map((testimonial) => (
                  <div key={testimonial.id} className="bg-white p-6 rounded-lg">
                    <blockquote className="text-gray-600 text-sm mb-4 italic">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                        IMG
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{testimonial.name}</p>
                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Contact Section
            </CardTitle>
            <CardDescription>Contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-8 rounded-lg border">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {content.contact.title}
                </h2>
                <p className="text-gray-600">{content.contact.subtitle}</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-sm text-gray-600">{content.contact.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                  <p className="text-sm text-gray-600">{content.contact.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-sm text-gray-600">{content.contact.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Hours</h3>
                  <p className="text-sm text-gray-600">{content.contact.hours}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}