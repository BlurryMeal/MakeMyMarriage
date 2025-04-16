
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-wedding-red/10 to-wedding-ivory py-16 md:py-24">
      <div className="wedding-container">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wedding-dark mb-6 font-playfair leading-tight">
              Plan Your Dream <span className="text-wedding-red">Indian Wedding</span> Seamlessly
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Connect with trusted vendors for venues, catering, photography, and more. Transform your wedding planning into a hassle-free and enjoyable experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-wedding-red hover:bg-wedding-red/90 text-white gap-2 py-6 px-8"
                onClick={() => navigate('/vendors')}
              >
                Find Vendors
                <ArrowRight size={18} />
              </Button>
              <Button 
                variant="outline" 
                className="border-wedding-red text-wedding-red hover:bg-wedding-red hover:text-white py-6 px-8"
                onClick={() => navigate('/list-your-service')}
              >
                List Your Services
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Indian Wedding Celebration"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 hidden md:block">
              <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-sm font-medium">4,000+ Trusted Vendors</p>
                </div>
                <p className="text-xs text-gray-600">All vendors are verified and rated by couples like you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
