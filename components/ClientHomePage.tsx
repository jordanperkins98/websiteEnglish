'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, BookOpen, Users, Clock, CheckCircle, Quote, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import ContactForm from "@/components/contact-form"
import { type SiteContent } from "@/lib/content-config"

interface ClientHomePageProps {
  initialContent: SiteContent
}

export default function ClientHomePage({ initialContent }: ClientHomePageProps) {
  const [content, setContent] = useState<SiteContent>(initialContent)

  // Periodically refresh content to show admin updates
  useEffect(() => {
    const refreshContent = async () => {
      try {
        // Only fetch on client side
        if (typeof window === 'undefined') return
        
        const response = await fetch('/api/content', {
          cache: 'no-store'
        })
        if (response.ok) {
          const newContent = await response.json()
          setContent(newContent)
        }
      } catch (error) {
        console.error('Error refreshing content:', error)
      }
    }

    // Refresh content every 30 seconds to catch admin updates
    const interval = setInterval(refreshContent, 30000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Image
                src={content.navigation.logo}
                alt="Word & Wonder English Tutoring"
                width={160}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {content.navigation.menuItems
                  .sort((a, b) => a.order - b.order)
                  .map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      className="text-gray-600 hover:text-orange-800 px-3 py-2 text-sm font-medium"
                    >
                      {item.label}
                    </a>
                  ))}
              </div>
            </div>
            <Button asChild className="bg-orange-200 hover:bg-orange-300 text-gray-900">
              <a href="#contact">{content.hero.ctaButton}</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-orange-100 text-orange-900 border-orange-200">{content.hero.badgeText}</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {content.hero.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {content.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" asChild className="bg-orange-200 hover:bg-orange-300 text-gray-900">
                  <a href="#contact">{content.hero.ctaButton}</a>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-orange-200 text-orange-800 hover:bg-orange-50">
                  <a href="#about">{content.hero.secondaryButton}</a>
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9/5</span> Rating
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-5 w-5 text-orange-600" />
                  <span className="font-semibold">500+</span> Students
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">5+</span> Years Experience
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src={content.about.image}
                alt="English tutor teaching"
                width={500}
                height={600}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Free Trial Lesson</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src={content.about.image}
                alt="English Tutor"
                width={400}
                height={400}
                className="rounded-full shadow-lg mx-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{content.about.title}</h2>
              <p className="text-lg text-gray-600 mb-6">
                {content.about.description}
              </p>
              <div className="space-y-4 mb-8">
                {content.about.qualifications.map((qualification, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{qualification}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild>
                <a href="#contact">{content.hero.ctaButton}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive English Services for UK Students</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're preparing for GCSEs, A-levels, or looking to improve your English skills, I offer personalized lessons tailored to the UK curriculum and your specific goals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services
              .sort((a, b) => a.order - b.order)
              .map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {service.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.pricing.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.pricing.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {content.pricing.plans
              .sort((a, b) => a.order - b.order)
              .map((plan) => (
                <Card key={plan.id} className={`relative ${plan.isPopular ? 'border-orange-200 shadow-lg' : ''}`}>
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-600 text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-center">{plan.name}</CardTitle>
                    <div className="text-center">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600">/{plan.duration}</span>
                    </div>
                    <CardDescription className="text-center">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.isPopular ? "default" : "outline"} asChild>
                      <a href="#contact">{plan.isPopular ? "Get Started" : "Choose Plan"}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.testimonials.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.testimonials.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.testimonials.reviews
              .sort((a, b) => a.order - b.order)
              .map((review) => (
                <Card key={review.id} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-orange-300 mb-4" />
                    <p className="text-gray-600 mb-4">
                      {review.content}
                    </p>
                    <div className="flex items-center gap-3">
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <p className="text-sm text-gray-600">{review.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.contact.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.contact.subtitle}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">{content.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">{content.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600">{content.contact.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Availability</h4>
                    <p className="text-gray-600">{content.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="mb-4">
                <Image
                  src={content.navigation.logo}
                  alt="Word & Wonder English Tutoring"
                  width={200}
                  height={75}
                  className="h-16 w-auto"
                />
              </div>
              <p className="text-gray-600 mb-4">
                {content.footer.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-gray-600">500+ Students</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Quick Links</h3>
              <ul className="space-y-2 text-gray-600">
                {content.navigation.menuItems
                  .sort((a, b) => a.order - b.order)
                  .map((item) => (
                    <li key={item.id}>
                      <a href={item.href} className="hover:text-orange-600">
                        {item.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Follow Us</h3>
              <div className="flex space-x-4">
                {content.footer.socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-600"
                  >
                    <span className="sr-only">{link.platform}</span>
                    {/* Social icons would be rendered here based on link.icon */}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2024 Word & Wonder English Tutoring. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
