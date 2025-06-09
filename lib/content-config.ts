// Content management configuration for Word & Wonder English Tutoring
export interface SiteContent {
  hero: {
    title: string
    subtitle: string
    description: string
    badgeText: string
    ctaButton: string
    secondaryButton: string
  }
  about: {
    title: string
    subtitle: string
    description: string
    experience: string
    qualifications: string[]
    image: string
  }
  services: ServiceItem[]
  pricing: {
    title: string
    subtitle: string
    plans: PricingPlan[]
  }
  testimonials: {
    title: string
    subtitle: string
    reviews: TestimonialItem[]
  }
  contact: {
    title: string
    subtitle: string
    email: string
    phone: string
    location: string
    hours: string
  }
  navigation: {
    logo: string
    menuItems: NavItem[]
  }
  footer: {
    description: string
    socialLinks: SocialLink[]
  }
}

export interface ServiceItem {
  id: string
  icon: string
  title: string
  description: string
  features: string[]
  image: string
  order: number
}

export interface PricingPlan {
  id: string
  name: string
  price: string
  duration: string
  description: string
  features: string[]
  isPopular: boolean
  order: number
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image: string
  order: number
}

export interface NavItem {
  id: string
  label: string
  href: string
  order: number
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string
}

// Default content configuration
export const defaultContent: SiteContent = {
  hero: {
    title: "Unlock Your Potential with Expert English Tutoring",
    subtitle: "For UK Students",
    description: "Personalised GCSE, A-Level, and 11+ preparation with proven results. Join hundreds of successful UK students who've achieved their academic goals.",
    badgeText: "🇬🇧 UK Curriculum Specialist",
    ctaButton: "Book Free Consultation",
    secondaryButton: "View Our Services"
  },
  about: {
    title: "About Word & Wonder",
    subtitle: "Your Partner in Academic Excellence",
    description: "With over 8 years of experience in UK education, I specialise in helping students excel in their GCSEs, A-Levels, and university applications. My approach combines proven teaching methods with personalised attention to each student's unique learning style.",
    experience: "8+ years of experience",
    qualifications: [
      "MA in English Literature (Oxford University)",
      "PGCE Secondary English (Cambridge University)",
      "Qualified Teacher Status (QTS)",
      "Level 3 Award in Education and Training",
      "GCSE & A-Level Examiner (AQA Board)"
    ],
    image: "/about-image.jpg"
  },
  services: [
    {
      id: "gcse-a-level",
      icon: "BookOpen",
      title: "GCSE & A-Level Preparation",
      description: "Comprehensive support for English Literature and Language GCSEs and A-Levels with exam-focused strategies.",
      features: [
        "Past paper practice and analysis",
        "Essay writing techniques",
        "Poetry and prose analysis",
        "Exam technique and time management",
        "Grade improvement guarantee"
      ],
      image: "/service-gcse.jpg",
      order: 1
    },
    {
      id: "university-application",
      icon: "Users",
      title: "University Application Support",
      description: "Expert guidance through UCAS applications, personal statements, and interview preparation.",
      features: [
        "Personal statement writing",
        "UCAS application guidance",
        "Interview preparation",
        "University selection advice",
        "Scholarship application support"
      ],
      image: "/service-university.jpg",
      order: 2
    },
    {
      id: "entrance-exams",
      icon: "Clock",
      title: "11+ & 13+ Preparation",
      description: "Specialised coaching for grammar school and independent school entrance examinations.",
      features: [
        "Verbal reasoning practice",
        "Creative writing development",
        "Comprehension techniques",
        "Mock exam sessions",
        "School-specific preparation"
      ],
      image: "/service-entrance.jpg",
      order: 3
    },
    {
      id: "key-stage-support",
      icon: "Star",
      title: "Key Stage 3 & 4 Support",
      description: "Building strong foundations in English for Years 7-11 students following the National Curriculum.",
      features: [
        "National Curriculum alignment",
        "Reading comprehension",
        "Creative and analytical writing",
        "Speaking and listening skills",
        "Progress tracking and reports"
      ],
      image: "/service-keystage.jpg",
      order: 4
    },
    {
      id: "adult-learning",
      icon: "Users",
      title: "Adult English Courses",
      description: "Professional development and personal enrichment English courses for adult learners.",
      features: [
        "Business English skills",
        "Academic writing",
        "Conversation practice",
        "Literature appreciation",
        "Flexible scheduling"
      ],
      image: "/service-adult.jpg",
      order: 5
    },
    {
      id: "special-needs",
      icon: "BookOpen",
      title: "SEN & Learning Support",
      description: "Specialised support for students with dyslexia, ADHD, and other learning differences.",
      features: [
        "Multi-sensory teaching methods",
        "Personalised learning plans",
        "Confidence building",
        "Assistive technology training",
        "Parent guidance and support"
      ],
      image: "/service-sen.jpg",
      order: 6
    }
  ],
  pricing: {
    title: "Flexible Pricing Plans",
    subtitle: "Choose the perfect plan for your learning journey",
    plans: [
      {
        id: "individual",
        name: "Individual Tutoring",
        price: "£45",
        duration: "per hour",
        description: "One-on-one personalised sessions",
        features: [
          "Personalised lesson plans",
          "Flexible scheduling",
          "Regular progress reports",
          "Exam preparation materials",
          "Email support between sessions"
        ],
        isPopular: false,
        order: 1
      },
      {
        id: "intensive",
        name: "Intensive Programme",
        price: "£180",
        duration: "per month",
        description: "Weekly sessions with additional support",
        features: [
          "4 one-hour sessions per month",
          "Homework support via email",
          "Monthly progress reports",
          "Exam technique workshops",
          "Priority booking",
          "Resource library access"
        ],
        isPopular: true,
        order: 2
      },
      {
        id: "group",
        name: "Small Group Sessions",
        price: "£25",
        duration: "per hour",
        description: "Learn with 2-4 other students",
        features: [
          "Maximum 4 students per group",
          "Collaborative learning environment",
          "Shared resources and materials",
          "Peer discussion and feedback",
          "Cost-effective option"
        ],
        isPopular: false,
        order: 3
      }
    ]
  },
  testimonials: {
    title: "What Our Students Say",
    subtitle: "Real success stories from real students",
    reviews: [
      {
        id: "emma",
        name: "Emma Thompson",
        role: "GCSE Student",
        content: "Thanks to the amazing tutoring, I improved my English Literature grade from a C to an A*! The personalised approach really helped me understand complex texts and write better essays.",
        rating: 5,
        image: "/testimonial-emma.jpg",
        order: 1
      },
      {
        id: "oliver",
        name: "Oliver Davis",
        role: "A-Level Student",
        content: "The A-Level preparation was exceptional. I went from predicted BBC to achieving AAB, which got me into my first-choice university. Couldn't recommend highly enough!",
        rating: 5,
        image: "/testimonial-oliver.jpg",
        order: 2
      },
      {
        id: "sophie",
        name: "Sophie Williams",
        role: "Year 6 Parent",
        content: "Our daughter passed her 11+ exam for grammar school thanks to the excellent preparation. The tutor made learning fun and built her confidence significantly.",
        rating: 5,
        image: "/testimonial-sophie.jpg",
        order: 3
      }
    ]
  },
  contact: {
    title: "Ready to Start Your Journey?",
    subtitle: "Get in touch for a free consultation",
    email: "hello@wordandwonder.co.uk",
    phone: "+44 7123 456789",
    location: "Online & Home Visits (Greater London)",
    hours: "Monday - Saturday: 9:00 AM - 8:00 PM"
  },
  navigation: {
    logo: "/word-and-wonder-logo.svg",
    menuItems: [
      { id: "about", label: "About", href: "#about", order: 1 },
      { id: "services", label: "Services", href: "#services", order: 2 },
      { id: "pricing", label: "Pricing", href: "#pricing", order: 3 },
      { id: "testimonials", label: "Reviews", href: "#testimonials", order: 4 },
      { id: "contact", label: "Contact", href: "#contact", order: 5 }
    ]
  },
  footer: {
    description: "Word & Wonder English Tutoring - Empowering UK students to achieve academic excellence through personalised English instruction.",
    socialLinks: [
      { id: "facebook", platform: "Facebook", url: "https://facebook.com/wordandwonder", icon: "Facebook" },
      { id: "twitter", platform: "Twitter", url: "https://twitter.com/wordandwonder", icon: "Twitter" },
      { id: "linkedin", platform: "LinkedIn", url: "https://linkedin.com/company/wordandwonder", icon: "LinkedIn" }
    ]
  }
}

// Content management functions - Server-side API calls
export const getContent = async (): Promise<SiteContent> => {
  try {
    const response = await fetch('/api/content', {
      cache: 'no-store' // Ensure we always get the latest content
    })
    
    if (!response.ok) {
      console.error('Failed to fetch content:', response.statusText)
      return defaultContent
    }
    
    const content = await response.json()
    return content
  } catch (error) {
    console.error('Error fetching content:', error)
    return defaultContent
  }
}

// Client-side version for backwards compatibility
export const getContentClient = (): SiteContent => {
  // For client-side, we'll use a fallback to localStorage until the async version is implemented
  if (typeof window === 'undefined') return defaultContent
  
  const savedContent = localStorage.getItem('wordandwonder-content')
  if (savedContent) {
    try {
      return JSON.parse(savedContent)
    } catch (error) {
      console.error('Error parsing saved content:', error)
      return defaultContent
    }
  }
  return defaultContent
}

export const saveContent = async (content: SiteContent): Promise<boolean> => {
  try {
    const response = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    })
    
    if (!response.ok) {
      console.error('Failed to save content:', response.statusText)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error saving content:', error)
    return false
  }
}

export const resetContent = async (): Promise<boolean> => {
  return await saveContent(defaultContent)
}

// Admin authentication functions
export const checkAdminAuth = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'check' }),
    })
    
    if (!response.ok) {
      return false
    }
    
    const result = await response.json()
    return result.authenticated
  } catch (error) {
    console.error('Error checking authentication:', error)
    return false
  }
}

export const adminLogin = async (password: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'login', password }),
    })
    
    const result = await response.json()
    return result.success && result.authenticated
  } catch (error) {
    console.error('Error during login:', error)
    return false
  }
}

export const adminLogout = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'logout' }),
    })
    
    const result = await response.json()
    return result.success
  } catch (error) {
    console.error('Error during logout:', error)
    return false
  }
}

// Client-side authentication check - now uses server-side session validation
export const checkAdminAuthClient = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'check' }),
    })
    
    const result = await response.json()
    return result.success && result.authenticated
  } catch (error) {
    console.error('Error checking client authentication:', error)
    return false
  }
}

export const setAdminAuth = (isAuthenticated: boolean): void => {
  // This function is now deprecated as authentication is handled server-side via secure cookies
  // Keeping for backwards compatibility, but it no longer affects authentication state
  if (typeof window === 'undefined') return
  
  if (isAuthenticated) {
    localStorage.setItem('wordandwonder-admin-auth', 'true')
  } else {
    localStorage.removeItem('wordandwonder-admin-auth')
  }
}

// Password verification is now handled server-side for security
export const verifyAdminPassword = (password: string): boolean => {
  // This function is deprecated - password verification now happens server-side
  // Keeping for backwards compatibility but always returns false
  console.warn('verifyAdminPassword is deprecated - use server-side authentication')
  return false
}
