
import AboutSection from '../components/about-section'
import FeaturedProducts from '../components/featured-products'
import Footer from '../components/footer'
import HeroSection from '../components/hero-section'
import Navbar from '../components/navbar'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
