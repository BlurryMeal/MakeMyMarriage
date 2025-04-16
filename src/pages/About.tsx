import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Check, Heart, Users, Trophy, Clock, Star, Building2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-wedding-red/10 to-wedding-ivory py-16">
          <div className="wedding-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair mb-6">
                About MakeMyMarriage
              </h1>
              <p className="text-gray-700 text-lg mb-8">
                We're on a mission to make wedding planning simple, stress-free, and joyful for couples across India.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Story Section */}
        <div className="py-16">
          <div className="wedding-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Couple planning wedding" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  MakeMyMarriage was born out of a simple frustration - wedding planning is complex, often stressful, and can take away from the joy of the celebration itself.
                </p>
                <p className="text-gray-700 mb-4">
                  We started in 2018 with a small team passionate about making wedding planning accessible and enjoyable. Today, we've helped over 15,000 couples create their dream weddings by connecting them with trusted vendors across India.
                </p>
                <p className="text-gray-700 mb-6">
                  Our platform brings together the best venues, photographers, caterers, decorators, and more, all in one place. We carefully vet each vendor to ensure quality, reliability, and value.
                </p>
                <div className="flex items-center">
                  <div className="flex -space-x-4 mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/32.jpg" 
                      alt="Founder" 
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <img 
                      src="https://randomuser.me/api/portraits/men/44.jpg" 
                      alt="Founder" 
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <img 
                      src="https://randomuser.me/api/portraits/women/67.jpg" 
                      alt="Founder" 
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                  </div>
                  <p className="text-gray-600 text-sm">Founded by Purvi, Sagar & Aditi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* What We Offer Section */}
        <div className="bg-gray-50 py-16">
          <div className="wedding-container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-4">What We Offer</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform brings together everything you need to plan your wedding, all in one place.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="h-12 w-12 text-wedding-red mb-4" />
                <h3 className="text-xl font-bold mb-3">For Couples</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Access to 4,000+ verified vendors</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Detailed profiles with real reviews</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Direct messaging with vendors</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Secure online booking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Wedding planning tools & checklists</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Heart className="h-12 w-12 text-wedding-red mb-4" />
                <h3 className="text-xl font-bold mb-3">For Vendors</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Access to thousands of potential clients</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Customizable business profile</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Booking management system</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Instant notification for inquiries</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Analytics and performance insights</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Trophy className="h-12 w-12 text-wedding-red mb-4" />
                <h3 className="text-xl font-bold mb-3">Our Difference</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Strict vendor verification process</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Authentic reviews from real couples</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>No hidden fees or commissions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Dedicated customer support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Focus on Indian wedding traditions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistics Section */}
        <div className="py-16">
          <div className="wedding-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="bg-wedding-red/10 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-wedding-red" />
                </div>
                <h3 className="text-3xl font-bold font-playfair mb-2">15,000+</h3>
                <p className="text-gray-600">Happy Couples</p>
              </div>
              
              <div>
                <div className="bg-wedding-red/10 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-10 w-10 text-wedding-red" />
                </div>
                <h3 className="text-3xl font-bold font-playfair mb-2">4,000+</h3>
                <p className="text-gray-600">Trusted Vendors</p>
              </div>
              
              <div>
                <div className="bg-wedding-red/10 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-10 w-10 text-wedding-red" />
                </div>
                <h3 className="text-3xl font-bold font-playfair mb-2">5+ Years</h3>
                <p className="text-gray-600">Industry Experience</p>
              </div>
              
              <div>
                <div className="bg-wedding-red/10 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-10 w-10 text-wedding-red" />
                </div>
                <h3 className="text-3xl font-bold font-playfair mb-2">4.8/5</h3>
                <p className="text-gray-600">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="bg-gray-50 py-16">
          <div className="wedding-container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-4">Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the passionate team behind MakeMyMarriage, dedicated to transforming wedding planning across India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Purvi Handa', role: 'Founder & CEO', image: 'https://randomuser.me/api/portraits/women/32.jpg' },
                { name: 'Sagar Gupta', role: 'Co-Founder & COO', image: 'https://randomuser.me/api/portraits/men/44.jpg' },
                { name: 'Aditi Kumar', role: 'CTO', image: 'https://randomuser.me/api/portraits/women/67.jpg' },
                { name: 'Lavanya Raichandani', role: 'Head of Vendor Relations', image: 'https://randomuser.me/api/portraits/women/48.jpg' },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative mx-auto w-40 h-40 mb-4">
                    <div className="absolute inset-0 rounded-full bg-wedding-red/20 transform rotate-6"></div>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="relative z-10 rounded-full w-full h-full object-cover border-4 border-white"
                    />
                  </div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-wedding-red py-16">
          <div className="wedding-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-playfair mb-6">
                Ready to Start Your Wedding Journey?
              </h2>
              <p className="text-white/90 mb-8">
                Join thousands of couples who have made their wedding planning journey smooth and enjoyable with MakeMyMarriage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-wedding-red hover:bg-white/90"
                  onClick={() => navigate('/signin')}
                >
                  Join as a Couple
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/20"
                  onClick={() => navigate('/list-your-service')}
                >
                  Register as a Vendor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
