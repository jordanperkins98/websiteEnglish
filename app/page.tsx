import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, BookOpen, Users, Clock, CheckCircle, Quote, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import ContactForm from "@/components/contact-form"
import LocalAreaSection from "@/components/local-area-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Word and Wonder</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  About
                </a>
                <a href="#services" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Services
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Pricing
                </a>
                <a href="#testimonials" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Reviews
                </a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Contact
                </a>
              </div>
            </div>
            <Button asChild>
              <a href="#contact">Book Free Consultation</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800">Certified English Tutor</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Master English with
                <span className="text-blue-600"> Word and Wonder</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Personalised English tutoring in South Devon and online. From conversation to academic writing, achieve
                your goals with expert guidance in the beautiful English Riviera.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" asChild>
                  <a href="#contact">Start Your Journey</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#about">Learn More</a>
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9/5</span> Rating
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-5 w-5 text-blue-600" />
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
                src="/placeholder.svg?height=600&width=500"
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
                src="/placeholder.svg?height=400&width=400"
                alt="Sarah Johnson - English Tutor"
                width={400}
                height={400}
                className="rounded-full shadow-lg mx-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet Your English Tutor</h2>
              <p className="text-lg text-gray-600 mb-6">
                Hello! I'm Sarah, founder of Word and Wonder. Based in the heart of South Devon, I've been helping
                students from Torquay to Newton Abbot, Teignmouth and beyond master the English language for over 5
                years.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">TESOL Certified</h3>
                    <p className="text-gray-600">Internationally recognized teaching qualification</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Master's in English Literature</h3>
                    <p className="text-gray-600">Deep understanding of language and communication</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">500+ Successful Students</h3>
                    <p className="text-gray-600">Proven track record of student success</p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <a href="#contact">Schedule a Free Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive English Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're a beginner or looking to perfect your skills, I offer personalized lessons tailored to your
              specific needs and goals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Conversational English</CardTitle>
                <CardDescription>
                  Build confidence in everyday conversations and improve your speaking fluency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Daily conversation practice</li>
                  <li>• Pronunciation improvement</li>
                  <li>• Cultural context learning</li>
                  <li>• Confidence building exercises</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Academic Writing</CardTitle>
                <CardDescription>Master essays, research papers, and academic communication</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Essay structure and organization</li>
                  <li>• Research and citation skills</li>
                  <li>• Grammar and style improvement</li>
                  <li>• Thesis and dissertation support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Test Preparation</CardTitle>
                <CardDescription>Prepare for IELTS, TOEFL, and other English proficiency exams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Exam strategy and techniques</li>
                  <li>• Practice tests and feedback</li>
                  <li>• Time management skills</li>
                  <li>• Score improvement guarantee</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Business English</CardTitle>
                <CardDescription>Professional communication for career advancement</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Email and report writing</li>
                  <li>• Presentation skills</li>
                  <li>• Meeting participation</li>
                  <li>• Interview preparation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Grammar & Vocabulary</CardTitle>
                <CardDescription>Strengthen your foundation with comprehensive language skills</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Grammar rules and usage</li>
                  <li>• Vocabulary expansion</li>
                  <li>• Sentence structure</li>
                  <li>• Common mistakes correction</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Kids & Teens</CardTitle>
                <CardDescription>Fun and engaging lessons designed for young learners</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Interactive learning games</li>
                  <li>• Age-appropriate materials</li>
                  <li>• Homework support</li>
                  <li>• Progress tracking</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Add the new Local Area Section here */}
      <LocalAreaSection />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Flexible Pricing Options</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the package that best fits your learning goals and schedule. All packages include personalized
              lesson plans and progress tracking.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-center">Trial Lesson</CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-bold">Free</span>
                </div>
                <CardDescription className="text-center">Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">30-minute session</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Skill assessment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Personalized learning plan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">No commitment required</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <a href="#contact">Book Free Trial</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative border-blue-200 shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-center">Individual Lessons</CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-bold">£35</span>
                  <span className="text-gray-600">/hour</span>
                </div>
                <CardDescription className="text-center">One-on-one personalized tutoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">60-minute sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Customized curriculum</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Homework assignments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Progress reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Email support</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <a href="#contact">Get Started</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-center">Package Deal</CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-bold">£320</span>
                  <span className="text-gray-600">/10 hours</span>
                </div>
                <CardDescription className="text-center">Save £30 with bulk purchase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">10 x 60-minute sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Flexible scheduling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">All individual lesson benefits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Priority booking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">3-month validity</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <a href="#contact">Save £30</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What My Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take my word for it. Here's what my students have achieved through our English tutoring
              sessions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-gray-300 mb-4" />
                <p className="text-gray-600 mb-4">
                  "Sarah helped me improve my IELTS score from 6.5 to 8.0 in just 3 months. Her teaching methods are
                  incredibly effective and she's so patient!"
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Maria Rodriguez"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Maria Rodriguez</p>
                    <p className="text-sm text-gray-600">University Student</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-gray-300 mb-4" />
                <p className="text-gray-600 mb-4">
                  "My business English has improved dramatically. I now feel confident in meetings and presentations.
                  Sarah's lessons are always engaging and practical."
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="James Chen"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">James Chen</p>
                    <p className="text-sm text-gray-600">Marketing Manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-gray-300 mb-4" />
                <p className="text-gray-600 mb-4">
                  "As a non-native speaker, I was struggling with academic writing. Sarah's guidance helped me excel in
                  my master's program. Highly recommended!"
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Priya Patel"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Priya Patel</p>
                    <p className="text-sm text-gray-600">Graduate Student</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Start Your English Journey?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Book your free consultation today and let's discuss how I can help you achieve your English language
              goals.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">hello@wordandwonder.co.uk</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">07123 456789</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600">South Devon (Torquay, Newton Abbot, Teignmouth)</p>
                    <p className="text-gray-600">In-person and online lessons available</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Availability</h4>
                    <p className="text-gray-600">Monday - Friday: 9:00 - 20:00 GMT</p>
                    <p className="text-gray-600">Saturday: 10:00 - 16:00 GMT</p>
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">Word and Wonder</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering students across South Devon and worldwide to master English with confidence through
                personalised, effective tutoring sessions.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">500+ Students</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#about" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-white">
                    Reviews
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Conversational English</li>
                <li>Academic Writing</li>
                <li>Test Preparation</li>
                <li>Business English</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Word and Wonder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
