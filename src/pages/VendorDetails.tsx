
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  ChevronLeft, 
  Heart, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Share2, 
  Star, 
  Check,
  Image
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for a specific vendor


const VendorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendorDetails, setVendorDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`http://tramway.proxy.rlwy.net/api/vendors/${id}`)
      .then(res => res.json())
      .then(data => {
        setVendorDetails(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching vendor details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!vendorDetails) {
    return <div className="text-center py-20 text-red-600">Vendor not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 py-8">
        <div className="wedding-container">
          <button 
            className="flex items-center text-wedding-red mb-6"
            onClick={() => navigate('/vendors')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Vendors
          </button>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="relative h-[300px] md:h-[400px]">
            <img 
          src={vendorDetails.mainImage?.trim() ? vendorDetails.mainImage : "https://picsum.photos/seed/${vendorDetails.category}-${vendorDetails.id}/800/400"} 
          alt={vendorDetails.name} 
          className="w-full h-full object-cover"
/>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white font-playfair mb-2">
                      {vendorDetails.name}
                    </h1>
                    <p className="text-white/90 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {vendorDetails.location}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                      <Heart className="h-5 w-5 text-white" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                      <Share2 className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-medium">{vendorDetails.rating}</span>
                  <span className="text-gray-500 ml-1">({vendorDetails.reviewCount} reviews)</span>
                </div>
                
                <Badge className="bg-wedding-red">{vendorDetails.category.charAt(0).toUpperCase() + vendorDetails.category.slice(1)}</Badge>
                
                {vendorDetails.featured && (
                  <Badge className="bg-yellow-500">Featured</Badge>
                )}
                
                <div className="text-gray-600">
                  <span className="font-medium">Capacity:</span> {vendorDetails.capacity}
                </div>
              </div>
              
              <Tabs defaultValue="about">
  <TabsList className="mb-6">
    <TabsTrigger value="about">About</TabsTrigger>
  </TabsList>

  <TabsContent value="about" className="space-y-6">
    <div>
      <h2 className="text-xl font-bold mb-3">Description</h2>
      <p className="text-gray-700">{vendorDetails.description}</p>
    </div>

    <div>
      <h2 className="text-xl font-bold mb-3">Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
      {Array.isArray(vendorDetails.amenities) &&
      vendorDetails.amenities.map((amenity, index) => (
        <div key={index} className="flex items-center">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span>{amenity}</span>
        </div>
      ))
    }
      </div>
    </div>

    <div>
      <h2 className="text-xl font-bold mb-3">Pricing</h2>
      <p className="text-gray-700">{vendorDetails.price}</p>
      <p className="text-sm text-gray-500 mt-1">
        Price varies based on season, day of the week, and package selected.
      </p>
    </div>

    <div>
      <h2 className="text-xl font-bold mb-3">Location & Contact</h2>
      <p className="text-gray-700 mb-2">{vendorDetails.address}</p>
      <div className="flex flex-col space-y-2">
        <a 
          href={`tel:${vendorDetails.contactPhone}`} 
          className="flex items-center text-wedding-red"
        >
          <Phone className="h-4 w-4 mr-2" />
          {vendorDetails.contactPhone}
        </a>
        <a 
          href={`mailto:${vendorDetails.contactEmail}`} 
          className="flex items-center text-wedding-red"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          {vendorDetails.contactEmail}
        </a>
        <a 
          href={`https://${vendorDetails.website}`} 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-wedding-red"
        >
          <Globe className="h-4 w-4 mr-2" />
          {vendorDetails.website}
        </a>
      </div>
    </div>
  </TabsContent>
</Tabs>

            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Why Book with MakeMyMarriage?</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <Check className="h-5 w-5 text-wedding-red mr-3 shrink-0" />
                    <p>All vendors are verified and reviewed by real couples</p>
                  </div>
                  <div className="flex">
                    <Check className="h-5 w-5 text-wedding-red mr-3 shrink-0" />
                    <p>Secure booking platform with instant confirmation</p>
                  </div>
                  <div className="flex">
                    <Check className="h-5 w-5 text-wedding-red mr-3 shrink-0" />
                    <p>Dedicated support team for your wedding planning</p>
                  </div>
                  <div className="flex">
                    <Check className="h-5 w-5 text-wedding-red mr-3 shrink-0" />
                    <p>Price guarantee - no hidden costs or fees</p>
                  </div>
                </div>
                
                <div className="mt-6 border-t pt-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/32.jpg" 
                      alt="Support Agent" 
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-medium">Need help?</h4>
                      <p className="text-sm text-gray-600">Our wedding experts are here for you</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    variant="outline"
                  >
                    Chat with an Expert
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Import missing Globe icon
const Globe = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15  .3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default VendorDetails;
