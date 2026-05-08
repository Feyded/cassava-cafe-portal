import AboutSection from "../components/about-section";
import FeaturedProducts from "../components/featured-products";
import HeroSection from "../components/hero-section";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <HeroSection />
        <FeaturedProducts />
        <AboutSection />
      </div>
    </div>
  );
}
