import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search, MapPin, Star, Filter, Calendar, Heart as HeartIcon,
  Building, UtensilsCrossed, Camera, Music, Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Vendor {
  id: number;
  name: string;
  category: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: string;
  priceRange: number[]; // optional placeholder for slider
  featured: boolean;
  tags: string[];
}

const categories = [
  { id: 'venue', name: 'Venue', icon: Building },
  { id: 'catering', name: 'Catering', icon: UtensilsCrossed },
  { id: 'photography', name: 'Photography', icon: Camera },
  { id: 'entertainment', name: 'Entertainment', icon: Music },
  { id: 'decoration', name: 'Decorations', icon: Palette },
];

const locations = ['All Locations', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Jaipur'];

const VendorListing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [eventDate, setEventDate] = useState('');
  const [sortOption, setSortOption] = useState('featured');

  const actualMinPrice = priceRange[0] * 5000;
  const actualMaxPrice = priceRange[1] * 5000;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) setActiveCategory(categoryParam);
  }, [location]);

  useEffect(() => {
    fetch('http://tramway.proxy.rlwy.net/api/vendor-listings')
      .then(res => res.json())
      .then(data => {
        setVendors(data);
      })
      .catch(err => {
        console.error('Failed to fetch vendor listings:', err);
      });
  }, []);

  const filteredVendors = vendors.filter(vendor => {
    if (activeCategory !== 'all' && vendor.category !== activeCategory) return false;
    if (searchTerm && !vendor.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedLocation !== 'All Locations' && vendor.location !== selectedLocation) return false;
    if (vendor.priceRange?.length === 2 && (vendor.priceRange[0] > actualMaxPrice || vendor.priceRange[1] < actualMinPrice)) return false;
    if (selectedRatings.length > 0 && !selectedRatings.some(rating => vendor.rating >= rating)) return false;
    return true;
  });

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    switch (sortOption) {
      case 'featured': return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
      case 'rating-high': return b.rating - a.rating;
      case 'price-low': return a.priceRange[0] - b.priceRange[0];
      case 'price-high': return b.priceRange[0] - a.priceRange[0];
      default: return 0;
    }
  });

  const toggleRating = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-8">
        <div className="wedding-container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-playfair mb-2">Find the Perfect Vendors</h1>
              <p className="text-gray-600">Browse our curated list of top wedding professionals</p>
            </div>
            <div className="mt-4 md:mt-0 relative w-full md:w-80">
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md ${activeCategory === 'all' ? 'bg-wedding-red/10 text-wedding-red' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveCategory('all')}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeCategory === cat.id ? 'bg-wedding-red/10 text-wedding-red' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveCategory(cat.id)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold mb-4">Filters</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Location</h4>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-3">Price Range</h4>
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{actualMinPrice.toLocaleString()}</span>
                      <span>₹{actualMaxPrice.toLocaleString()}+</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-3">Rating</h4>
                    <div className="space-y-2">
                      {[5, 4, 3, 2].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`rating-${rating}`}
                            className="mr-2"
                            checked={selectedRatings.includes(rating)}
                            onChange={() => toggleRating(rating)}
                          />
                          <label htmlFor={`rating-${rating}`} className="flex items-center">
                            {Array.from({ length: rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            ))}
                            {Array.from({ length: 5 - rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-gray-300" />
                            ))}
                            <span className="ml-1 text-sm">& Up</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vendor Cards */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-gray-600 mb-2 sm:mb-0">
                    <span className="font-medium">{sortedVendors.length}</span> vendors found
                  </p>
                  <div className="flex items-center">
                    <label className="text-sm mr-2">Sort by:</label>
                    <select
                      className="bg-gray-100 border border-gray-300 rounded-md py-1 px-2 text-sm"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="featured">Featured</option>
                      <option value="rating-high">Rating High to Low</option>
                      <option value="price-low">Price Low to High</option>
                      <option value="price-high">Price High to Low</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedVendors.map((vendor) => (
                  <Card key={vendor.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative">
                    <img
  src={vendor.image || 'https://source.unsplash.com/featured/?wedding,' + vendor.category}
  alt={vendor.name}
  className="w-full h-48 object-cover"
/>
                      <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow">
                        <HeartIcon className="h-5 w-5 text-gray-400 hover:text-wedding-red" />
                      </button>
                      {vendor.featured && (
                        <Badge className="absolute top-3 left-3 bg-wedding-red">Featured</Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{vendor.name}</h3>
                          <p className="text-gray-600 text-sm flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {vendor.location}
                          </p>
                        </div>
                        <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="font-medium text-sm">{vendor.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{vendor.price}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vendor.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" className="text-wedding-red border-wedding-red hover:bg-wedding-red hover:text-white">
                          Contact
                        </Button>
                        <Button size="sm" className="bg-wedding-red hover:bg-wedding-red/90" onClick={() => navigate(`/vendors/${vendor.id}`)}>
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {sortedVendors.length === 0 && (
                <div className="text-center p-10 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium mb-2">No vendors found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                  <Button onClick={() => window.location.reload()} className="bg-wedding-red hover:bg-wedding-red/90">
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VendorListing;
