
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Clipboard, Music, UtensilsCrossed, Building, Users, Heart, Gift, Car, Palette, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const serviceCategories = [
  { 
    id: 'venues', 
    name: 'Venues', 
    icon: Building,
    description: 'Find the perfect venue for your wedding, from luxury hotels to garden resorts.',
    count: 248
  },
  { 
    id: 'catering', 
    name: 'Catering', 
    icon: UtensilsCrossed,
    description: 'Discover catering services offering a wide variety of cuisines for your special day.',
    count: 156
  },
  { 
    id: 'photography', 
    name: 'Photography & Videography', 
    icon: Camera,
    description: 'Capture your wedding memories with professional photographers and videographers.',
    count: 189
  },
  { 
    id: 'entertainment', 
    name: 'Entertainment', 
    icon: Music,
    description: 'Book bands, DJs, dancers and other entertainment for your wedding celebrations.',
    count: 102
  },
  { 
    id: 'decor', 
    name: 'Decor & Design', 
    icon: Palette,
    description: 'Transform your venue with stunning decorations, flowers, and lighting.',
    count: 134
  },
  { 
    id: 'beauty', 
    name: 'Makeup & Beauty', 
    icon: Heart,
    description: 'Book talented makeup artists, hairstylists, and beauty services for your big day.',
    count: 112
  },
  { 
    id: 'transport', 
    name: 'Transportation', 
    icon: Car,
    description: 'Choose from luxury cars, vintage vehicles, or themed transportation options.',
    count: 67
  },
  { 
    id: 'gifts', 
    name: 'Gifts & Favors', 
    icon: Gift,
    description: 'Find unique wedding favors, return gifts, and custom creations for your guests.',
    count: 91
  },
  {
    id: 'lighting',
    name: 'Lighting & Effects',
    icon: Sparkles,
    description: 'Enhance your venue with professional lighting solutions and special effects.',
    count: 76
  }
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 py-12">
        <div className="wedding-container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-4">Our Wedding Services</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              From venues to photographers, caterers to decorators, find everything you need to plan your perfect Indian wedding. Browse our curated selection of premium vendors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="p-6 flex items-center">
                    <div className="bg-wedding-red/10 rounded-lg p-3 mr-4">
                      <Icon className="h-8 w-8 text-wedding-red" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{category.name}</h3>
                      <Badge variant="outline">{category.count} vendors</Badge>
                    </div>
                  </div>
                  <CardContent className="px-6 pt-0 pb-4">
                    <p className="text-gray-600 text-sm">
                      {category.description}
                    </p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-2">
                    <Button 
                      className="w-full bg-wedding-red hover:bg-wedding-red/90"
                      onClick={() => navigate(`/vendors?category=${category.id}`)}
                    >
                      Browse Vendors
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
          
          <div className="mt-16 bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold font-playfair mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our wedding specialists are here to help you find the perfect vendors for your special day. Let us know what you're looking for and we'll guide you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                className="border-wedding-red text-wedding-red hover:bg-wedding-red hover:text-white"
              >
                Contact Our Specialists
              </Button>
              <Button 
                className="bg-wedding-red hover:bg-wedding-red/90"
                onClick={() => navigate('/vendors')}
              >
                View All Vendors
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Services;
