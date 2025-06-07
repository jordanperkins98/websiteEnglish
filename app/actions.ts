// Placeholder for static build - Server Actions removed
export async function submitContactForm(prevState: any, formData: FormData) {
  return { 
    success: false, 
    error: true,
    message: "Contact form is disabled in the static version. Please email contact@wordandwonder.co.uk directly." 
  }
}
