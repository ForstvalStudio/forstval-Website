import HeroSection from '@/components/sections/HeroSection'
import ServicesPreview from '@/components/sections/ServicesPreview'
import PortfolioPreview from '@/components/sections/PortfolioPreview'
import CallToAction from '@/components/sections/CallToAction'

export default function Home() {
  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-tech-pattern opacity-30 pointer-events-none" />
      
      <HeroSection />
      <ServicesPreview />
      <PortfolioPreview />
      <CallToAction />
    </div>
  )
}
