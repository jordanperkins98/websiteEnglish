"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { submitContactForm } from "@/app/actions"
import { useActionState } from "react"

export default function ContactForm() {
  const [state, action, isPending] = useActionState(submitContactForm, null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Your Free Consultation</CardTitle>
        <CardDescription>
          Fill out the form below and I'll get back to you within 24 hours to schedule your free trial lesson. Available
          in-person throughout South Devon or online worldwide.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" name="firstName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" name="lastName" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="englishLevel">Current English Level</Label>
            <Select name="englishLevel">
              <SelectTrigger>
                <SelectValue placeholder="Select your level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="elementary">Elementary</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="upper-intermediate">Upper Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="native">Native/Near Native</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lessonType">Preferred Lesson Type</Label>
            <Select name="lessonType">
              <SelectTrigger>
                <SelectValue placeholder="Select lesson type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-person-torquay">In-person - Torquay area</SelectItem>
                <SelectItem value="in-person-newton-abbot">In-person - Newton Abbot area</SelectItem>
                <SelectItem value="in-person-teignmouth">In-person - Teignmouth area</SelectItem>
                <SelectItem value="in-person-other">In-person - Other South Devon location</SelectItem>
                <SelectItem value="online">Online lessons</SelectItem>
                <SelectItem value="flexible">Flexible (mix of both)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Learning Goals</Label>
            <Textarea
              id="goals"
              name="goals"
              placeholder="Tell me about your English learning goals and what you'd like to focus on..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability">Preferred Lesson Times</Label>
            <Textarea
              id="availability"
              name="availability"
              placeholder="Let me know your preferred days and times for lessons (please specify GMT)..."
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" name="newsletter" />
            <Label htmlFor="newsletter" className="text-sm">
              I'd like to receive English learning tips and updates via email
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Sending..." : "Book Free Consultation"}
          </Button>

          {state?.success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-sm">{state.message}</p>
            </div>
          )}

          {state?.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{state.message}</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
