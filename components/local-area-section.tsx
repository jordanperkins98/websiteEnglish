import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Car, Train, Coffee } from "lucide-react"
import Image from "next/image"

export default function LocalAreaSection() {
  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            English Tutoring in Beautiful South Devon
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based in the stunning English Riviera, I offer both in-person and online lessons to students throughout
            South Devon and beyond.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Torquay harbour and English Riviera coastline"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Learn English in the Heart of the English Riviera</h3>
            <p className="text-lg text-gray-600 mb-6">
              There's something special about learning in such a beautiful setting. Whether we meet in a cosy café in
              Torquay, a quiet library in Newton Abbot, or by the seafront in Teignmouth, the inspiring South Devon
              landscape provides the perfect backdrop for your English learning journey.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Coffee className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Relaxed café sessions available</span>
              </div>
              <div className="flex items-center gap-3">
                <Car className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Easy parking throughout South Devon</span>
              </div>
              <div className="flex items-center gap-3">
                <Train className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Accessible by public transport</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Torquay</CardTitle>
              <CardDescription>The heart of the English Riviera</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Meet in the town centre, harbour area, or one of the many welcoming cafés. Perfect for conversational
                English with a sea view!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Newton Abbot</CardTitle>
              <CardDescription>Gateway to Dartmoor</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Convenient town centre location with excellent transport links. Ideal for focused academic writing and
                exam preparation sessions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-teal-600" />
              </div>
              <CardTitle>Teignmouth</CardTitle>
              <CardDescription>Historic port town</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Beautiful riverside setting perfect for relaxed learning. Great for building confidence in a peaceful
                environment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
