
import { Star, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const vendors = [
  {
    id: 1,
    name: "Royal Palace Venue",
    category: "Venue",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 156,
    location: "Delhi",
    price: "₹75,000 - ₹3,50,000",
    featured: true
  },
  {
    id: 2,
    name: "Mehta Catering",
    category: "Catering",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 124,
    location: "Mumbai",
    price: "₹950 - ₹1,500 per plate",
    featured: true
  },
  {
    id: 3,
    name: "Joshi Photography",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 98,
    location: "Bangalore",
    price: "₹75,000 - ₹1,25,000",
    featured: true
  }
];

const FeaturedVendors = () => {
  return (
    <section id="vendors" className="wedding-section">
      <div className="wedding-container">
        <h2 className="wedding-section-title">Featured <span className="text-wedding-red">Vendors</span></h2>
        <p className="wedding-section-subtitle">
          Discover our hand-picked selection of top-rated wedding vendors who consistently deliver exceptional service
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="wedding-card group">
              <div className="relative">
                <img 
                  src={vendor.image} 
                  alt={vendor.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-wedding-red text-white px-3 py-1 rounded-full text-xs font-medium">
                  {vendor.category}
                </div>
                {vendor.featured && (
                  <div className="absolute top-4 right-4 bg-wedding-gold text-white px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-wedding-dark group-hover:text-wedding-red transition-colors">
                    {vendor.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-wedding-gold fill-wedding-gold" />
                    <span className="text-sm font-medium ml-1">{vendor.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{vendor.location}</span>
                  <span className="mx-2">•</span>
                  <span>{vendor.reviews} reviews</span>
                </div>
                <div className="mb-4">
                  <span className="text-wedding-dark font-medium">{vendor.price}</span>
                </div>
                <div className="flex gap-2">
                  <Button className="w-full bg-white border border-wedding-red text-wedding-red hover:bg-wedding-red hover:text-white transition-colors">
                    View Profile
                  </Button>
                  <Button className="w-full bg-wedding-red hover:bg-wedding-red/90 text-white">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="border-wedding-red text-wedding-red hover:bg-wedding-red hover:text-white inline-flex items-center gap-2">
            View All Vendors
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;
