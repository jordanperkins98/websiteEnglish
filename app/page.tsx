import { getContent } from "@/lib/content-config"
import ClientHomePage from "@/components/ClientHomePage"

export default async function HomePage() {
  const initialContent = await getContent()
  
  return <ClientHomePage initialContent={initialContent} />
}
