
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-wedding-red/90 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20 z-[-1]"></div>
      
      <div className="wedding-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-playfair">
            Ready to Create Your Dream Wedding?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of couples who have made their wedding planning journey smooth and enjoyable with MakeMyMarriage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-wedding-red hover:bg-white/90 gap-2 py-6 px-8"
              onClick={() => navigate('/signin')}
            >
              Get Started Now
              <ArrowRight size={18} />
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/20 py-6 px-8"
              onClick={() => navigate('/list-your-service')}
            >
              List as a Vendor
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
            <div className="text-center">
              <p className="text-3xl font-bold font-playfair">4,000+</p>
              <p className="text-white/80">Trusted Vendors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold font-playfair">15,000+</p>
              <p className="text-white/80">Happy Couples</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold font-playfair">25+</p>
              <p className="text-white/80">Service Categories</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold font-playfair">100+</p>
              <p className="text-white/80">Cities Covered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
