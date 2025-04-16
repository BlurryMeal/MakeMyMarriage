
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceCategories from '@/components/ServiceCategories';
import FeaturedVendors from '@/components/FeaturedVendors';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ServiceCategories />
      <FeaturedVendors />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
