import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Bookmark, 
  Calendar, 
  Heart, 
  Home, 
  LogOut, 
  MessageSquare, 
  Search, 
  Settings, 
  Star,
  User,
  Send
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import MessagesTab from '@/components/dashboard/vendor/MessagesTab';

interface Vendor {
  id: number;
  name: string;
  category: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: string;
  priceRange: number[];
  featured: boolean;
  tags: string[];
}




const categories = [
  { id: 'venues', name: 'Venues', icon: Home },
  { id: 'catering', name: 'Catering', icon: Home },
  { id: 'photography', name: 'Photography', icon: Home },
  { id: 'entertainment', name: 'Entertainment', icon: Home },
  { id: 'planning', name: 'Wedding Planning', icon: Home },
];

const locations = ['All Locations', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Jaipur'];



const mockMessages = [
  {
    id: 1,
    sender: "Royal Palace Banquet",
    lastMessage: "Thank you for your inquiry. Would you like to schedule a venue tour?",
    time: "10:30 AM",
    unread: true
  },
  {
    id: 2,
    sender: "Sharma Photography",
    lastMessage: "I've sent the quotation for your event as requested.",
    time: "Yesterday",
    unread: false
  },
  {
    id: 3,
    sender: "Spice Delight Catering",
    lastMessage: "Would you like to schedule a tasting session?",
    time: "Yesterday",
    unread: true
  }
];

const mockConversation = [
  {
    id: 1,
    sender: "Royal Palace Banquet",
    message: "Hello! Thanks for your interest in Royal Palace Banquet for your wedding.",
    time: "10:20 AM"
  },
  {
    id: 2,
    sender: "me",
    message: "Hi! I'm looking for venue options for a wedding in June next year.",
    time: "10:25 AM"
  },
  {
    id: 3,
    sender: "Royal Palace Banquet",
    message: "Thank you for your inquiry. Would you like to schedule a venue tour?",
    time: "10:30 AM"
  }
];

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [vendors, setVendors] = useState<Vendor[]>([]); 
  const { toast } = useToast();

  const [ratingModal, setRatingModal] = useState<{ show: boolean, bookingId: number, serviceId: number, serviceType: string } | null>(null);
const [ratingValue, setRatingValue] = useState<number>(5); // default rating

const [showDeleteModal, setShowDeleteModal] = useState(false);


  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortOption, setSortOption] = useState('featured');

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [likedVendors, setLikedVendors] = useState<number[]>([]);

  const [user, setUser] = useState(null);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/signin'); // or redirect if not logged in
    }
  }, []);

  useEffect(() => {
    fetch('http://tramway.proxy.rlwy.net/api/vendor-listings')
      .then(res => res.json())
      .then(data => setVendors(data))
      .catch(err => console.error('Error fetching vendors:', err));
  }, []);
  

  
  useEffect(() => {
    
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData({
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phoneNumber || '', // adjust if your DB field is `PhoneNumber`
        address: parsed.address || ''    // only if you're storing address, otherwise skip this field
      });
    }
    
    if (!storedUser) {
      navigate('/signin'); // Redirect to login if not logged in
      return;
    }
  
    const user = JSON.parse(storedUser);
    console.log('Logged in as:', user); // You can now use this user data to personalize the dashboard
  }, []);

  useEffect(() => {
    const savedLikedVendors = localStorage.getItem('likedVendors');
    if (savedLikedVendors) {
      setLikedVendors(JSON.parse(savedLikedVendors));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('likedVendors', JSON.stringify(likedVendors));
  }, [likedVendors]);
  
  const handleLogout = () => {
    navigate('/');
  };

  const actualMinPrice = priceRange[0] * 5000;
  const actualMaxPrice = priceRange[1] * 5000;
  
  const filteredVendors = vendors.filter(vendor => {
    if (selectedCategory !== 'all' && vendor.category !== selectedCategory) return false;
    
    if (searchTerm && !vendor.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    if (selectedLocation !== 'All Locations' && vendor.location !== selectedLocation) return false;
    
    if (vendor.priceRange[0] > actualMaxPrice || vendor.priceRange[1] < actualMinPrice) return false;
    
    return true;
  });
  
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    switch (sortOption) {
      case 'featured':
        return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
      case 'rating-high':
        return b.rating - a.rating;
      case 'price-low':
        return a.priceRange[0] - b.priceRange[0];
      case 'price-high':
        return b.priceRange[0] - a.priceRange[0];
      default:
        return 0;
    }
  });
  
  const handleLikeVendor = (vendorId: number) => {
    setLikedVendors(prev => {
      if (prev.includes(vendorId)) {
        toast({
          title: "Vendor removed",
          description: "Vendor removed from saved vendors.",
        });
        return prev.filter(id => id !== vendorId);
      } 
      else {
        toast({
          title: "Vendor saved",
          description: "Vendor added to saved vendors.",
        });
        return [...prev, vendorId];
      }
    });
  };
  
  const savedVendors = vendors.filter(vendor => likedVendors.includes(vendor.id));

  const [messageText, setMessageText] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(1);

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
    
    setMessageText('');
  };

  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (!storedUser) {
      navigate('/signin');
      return;
    }
  
    const { id } = JSON.parse(storedUser);
  
    fetch(`http://tramway.proxy.rlwy.net/api/user/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.UserID) {
          // normalize keys
          const normalizedUser = {
            id: data.UserID,
            name: data.Name,
            email: data.Email,
            phoneNumber: data.PhoneNumber,
            address: data.Address || '', // in case you add Address later
          };
  
          setUser(normalizedUser);
          localStorage.setItem('loggedInUser', JSON.stringify(normalizedUser));
        } else {
          console.error("Invalid user data", data);
        }
      })
      .catch(err => console.error("Failed to fetch user details", err));
  }, []);
  
  
  


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="w-64 bg-white h-screen shadow-sm fixed">
          <div className="flex items-center justify-center h-16 border-b">
            <span className="text-xl font-bold font-playfair" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>MakeMyMarriage</span>
          </div>
          <div className="py-4 flex flex-col h-[calc(100%-4rem)] justify-between">
            <div>
              <div className="px-4 py-2">
                <p className="text-gray-500 text-xs uppercase font-semibold">Dashboard</p>
              </div>
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'overview' ? 'bg-wedding-red/10 text-wedding-red border-r-4 border-wedding-red' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('overview')}
              >
                <Home className="h-5 w-5 mr-3" />
                <span>Overview</span>
              </button>
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'findVendors' ? 'bg-wedding-red/10 text-wedding-red border-r-4 border-wedding-red' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('findVendors')}
              >
                <Search className="h-5 w-5 mr-3" />
                <span>Find Vendors</span>
              </button>
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'bookings' ? 'bg-wedding-red/10 text-wedding-red border-r-4 border-wedding-red' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('bookings')}
              >
                <Calendar className="h-5 w-5 mr-3" />
                <span>My Bookings</span>
              </button>
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'favorites' ? 'bg-wedding-red/10 text-wedding-red border-r-4 border-wedding-red' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('favorites')}
              >
                <Bookmark className="h-5 w-5 mr-3" />
                <span>Saved Vendors</span>
              </button>
              
              <div className="px-4 py-2 mt-6">
                <p className="text-gray-500 text-xs uppercase font-semibold">Account</p>
              </div>
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'profile' ? 'bg-wedding-red/10 text-wedding-red border-r-4 border-wedding-red' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('profile')}
              >
                <User className="h-5 w-5 mr-3" />
                <span>My Profile</span>
              </button>
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'settings' ? 'bg-wedding-red/10 text-wedding-red border-r-4 border-wedding-red' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </button>
            </div>
            
            <div className="mt-auto px-4 py-6">
              <button 
                className="flex items-center px-4 py-3 w-full text-left text-gray-600 hover:bg-gray-100 rounded-md"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="ml-64 flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold font-playfair">Client Dashboard</h1>
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center">
                    <div className="w-10 h-10 bg-wedding-red rounded-full flex items-center justify-center text-white font-bold mr-2">
                      AC
                    </div>
                    <span className="text-gray-700">{user?.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab('profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab('settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Your scheduled bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">2</p>
                  <Button 
                    variant="link" 
                    className="p-0 text-wedding-red"
                    onClick={() => setActiveTab('bookings')}
                  >
                    View all bookings
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Saved Vendors</CardTitle>
                  <CardDescription>Vendors you've bookmarked</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{likedVendors.length}</p>
                  <Button 
                    variant="link" 
                    className="p-0 text-wedding-red"
                    onClick={() => setActiveTab('favorites')}
                  >
                    View saved vendors
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>New Messages</CardTitle>
                  <CardDescription>Unread vendor communications</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">3</p>
                  <Button 
                    variant="link" 
                    className="p-0 text-wedding-red"
                    onClick={() => setActiveTab('messages')}
                  >
                    View all messages
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === 'findVendors' && (
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Find Vendors</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Search Vendors</label>
                    <div className="relative">
                      <Input
                        placeholder="Search vendors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      {locations.map((location) => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Price Range</label>
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
                
                <div className="flex justify-between items-center">
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
                  
                  <Button 
                    className="bg-wedding-red hover:bg-wedding-red/90"
                    onClick={() => navigate('/vendors')}
                  >
                    View All Vendors
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedVendors.map((vendor) => (
                  <Card key={vendor.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img 
                        src={vendor.image} 
                        alt={vendor.name} 
                        className="w-full h-48 object-cover"
                      />
                      <button 
                        className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow hover:bg-gray-50 transition-colors"
                        onClick={() => handleLikeVendor(vendor.id)}
                        aria-label={likedVendors.includes(vendor.id) ? "Remove from saved vendors" : "Add to saved vendors"}
                      >
                        <Heart 
                          className={`h-5 w-5 ${likedVendors.includes(vendor.id) ? "text-wedding-red fill-wedding-red" : "text-gray-400"}`} 
                        />
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
                            <Search className="h-3 w-3 mr-1" />
                            {vendor.location}
                          </p>
                        </div>
                        <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="font-medium text-sm">{vendor.rating}</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm text-gray-600">{vendor.price}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vendor.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-wedding-red border-wedding-red hover:bg-wedding-red hover:text-white"
                        onClick={() => {
                          setSelectedVendor(vendor);
                          setShowBookingModal(true);
                        }}
                      >
                        Contact
                      </Button>


                        <Button 
                          size="sm"
                          className="bg-wedding-red hover:bg-wedding-red/90"
                          onClick={() => navigate(`/vendors/${vendor.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'bookings' && (
            <div>
            <h2 className="text-xl font-bold mb-4">My Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-500">No bookings found.</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.BookingID}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                        <h3 className="font-bold text-lg">{booking.ServiceName}</h3>
                          <p className="text-gray-600">Date: {new Date(booking.EventDate).toDateString()}</p>
                          <p className="text-gray-600">Location: {booking.Location}</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold tracking-wide ${
                            booking.BookingStatus === "Confirmed" ? "bg-green-100 text-green-800" :
                            booking.BookingStatus === "Cancelled" ? "bg-red-100 text-red-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {booking.BookingStatus}
                          </span>
                          <div className="mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate(`/vendors/${booking.ServiceID}`)}
                            >
                              View Details
                            </Button>

                            {new Date(booking.EventDate) <= new Date() && (
                            <Button
                              size="sm"
                              variant="default"
                              className="mt-2 bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => {
                                setRatingModal({ show: true, bookingId: booking.BookingID, serviceId: booking.ServiceID, serviceType: booking.ServiceType });
                              }}
                            >
                              Complete
                            </Button>
                          )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          )}
          
          {activeTab === 'favorites' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Saved Vendors</h2>
              {savedVendors.length === 0 ? (
                <div className="bg-white p-8 rounded-lg text-center shadow-sm">
                  <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Saved Vendors</h3>
                  <p className="text-gray-600 mb-4">You haven't saved any vendors yet. Browse vendors and click the heart icon to save them.</p>
                  <Button 
                    className="bg-wedding-red hover:bg-wedding-red/90"
                    onClick={() => setActiveTab('findVendors')}
                  >
                    Find Vendors
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedVendors.map((vendor) => (
                    <Card key={vendor.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img 
                          src={vendor.image} 
                          alt={vendor.name} 
                          className="w-full h-48 object-cover"
                        />
                        <button 
                          className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow hover:bg-gray-50 transition-colors"
                          onClick={() => handleLikeVendor(vendor.id)}
                          aria-label="Remove from saved vendors"
                        >
                          <Heart className="h-5 w-5 text-wedding-red fill-wedding-red" />
                        </button>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg">{vendor.name}</h3>
                            <p className="text-gray-600 text-sm">{vendor.location}</p>
                          </div>
                          <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="font-medium text-sm">{vendor.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{vendor.price}</p>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm"
                            className="flex-1 bg-wedding-red hover:bg-wedding-red/90"
                            onClick={() => navigate(`/vendors/${vendor.id}`)}
                          >
                            View Details
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1"
                            onClick={() => handleLikeVendor(vendor.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          
          
          {activeTab === 'profile' && (

            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>My Profile</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-wedding-red rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          AC
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{user?.name}</h3>
                        <p className="text-gray-600 mb-3">{user?.email || 'youremail@example.com'}</p>  
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                      />

                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <Input
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <Input defaultValue="123 Wedding Lane, Mumbai, India" />
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                    <Button
                      className="bg-wedding-red hover:bg-wedding-red/90"
                      onClick={async () => {
                        if (!user?.id) {
                          toast({ title: "Error", description: "User ID missing" });
                          return;
                        }
  
                if (isEditing) {
                  // Save changes
                  try {
                    const res = await fetch(`http://tramway.proxy.rlwy.net/api/user/${user.id}`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(formData)
                    });
              
                    if (res.ok) {
                      toast({ title: "Profile updated successfully!" });
                      const updated = { ...user, ...formData };
                      setUser(updated);
                      localStorage.setItem('loggedInUser', JSON.stringify(updated));
                      setIsEditing(false);
                    } else {
                      toast({ title: "Failed to update profile", description: "Server error." });
                    }
                  } catch (err) {
                    console.error(err);
                    toast({ title: "Error", description: "Could not save changes." });
                  }
                } else {
                  // Enable edit mode
                  setIsEditing(true);
                }
              }}
  
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>

                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-600">Receive email updates about your bookings</p>
                          </div>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-gray-600">Receive text messages for important updates</p>
                          </div>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Marketing Communications</p>
                            <p className="text-sm text-gray-600">Receive offers and promotions from our partners</p>
                          </div>
                          <input type="checkbox" className="toggle" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Security</h3>
                      <div className="space-y-4">
                      <Button 
                      variant="outline" 
                      className="w-full justify-start text-red-600 hover:text-red-700"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      Delete Account
                    </Button>

                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button className="bg-wedding-red hover:bg-wedding-red/90">Save Preferences</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      {showBookingModal && selectedVendor && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative p-6">
          <button 
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
            onClick={() => setShowBookingModal(false)}
          >
            ✕
          </button>
          <h2 className="text-xl font-bold mb-4">Book {selectedVendor.name}</h2>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const target = e.target as typeof e.target & {
                eventDate: { value: string };
              };
              const eventDate = target.eventDate.value;
              const userData = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

              const formData = new FormData(e.target as HTMLFormElement);

              const bookingData = {
                user_id: userData.id,              // ✅ matches UserID in DB
                service_id: selectedVendor.id,     // ✅ matches ServiceID
                event_date: eventDate,
                booking_date: new Date().toISOString().split('T')[0]
              };
              


              try {
                const res = await fetch('http://tramway.proxy.rlwy.net/api/bookings', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(bookingData)
                });
                if (res.ok) {
                  toast({ title: 'Booking confirmed!' });
                  setShowBookingModal(false);
                } else {
                  toast({ title: 'Error', description: 'Booking failed.' });
                }
              } catch (err) {
                console.error('Booking failed', err);
              }
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Event Date</label>
              <input type="date" name="eventDate" required className="w-full border p-2 rounded" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <select className="w-full border p-2 rounded" disabled>
                <option>Cash on Delivery</option>
              </select>
            </div>

            <Button type="submit" className="bg-wedding-red hover:bg-wedding-red/90 w-full">
              Confirm Booking
            </Button>
          </form>
        </div>
      </div>

      
    )}

{showDeleteModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-full max-w-sm relative shadow-md">
      <button
        className="absolute top-3 right-3 text-gray-600 hover:text-black"
        onClick={() => setShowDeleteModal(false)}
      >
        ✕
      </button>
      <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete your account?</h2>
      <p className="text-sm text-gray-600 mb-6">This action is permanent and cannot be undone.</p>
      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={() => setShowDeleteModal(false)}>No</Button>
        <Button 
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={async () => {
            if (!user?.id) {
              toast({ title: "Error", description: "User ID not found" });
              return;
            }

            try {
              const res = await fetch(`http://tramway.proxy.rlwy.net/api/user/${user.id}`, {
                method: 'DELETE'
              });

              if (res.ok) {
                toast({ title: "Account deleted successfully" });
                localStorage.removeItem('loggedInUser');
                navigate('/'); // or navigate to signup/login
              } else {
                toast({ title: "Error", description: "Could not delete account" });
              }
            } catch (err) {
              console.error("Delete error:", err);
              toast({ title: "Error", description: "Something went wrong" });
            }
          }}
        >
          Yes, Delete
        </Button>
      </div>
    </div>
  </div>
)}




{ratingModal?.show && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
      <h3 className="text-xl font-semibold mb-4">Rate this Service</h3>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Rating (1 to 5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={ratingValue}
          onChange={(e) => setRatingValue(parseInt(e.target.value))}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setRatingModal(null)}>Cancel</Button>
        <Button
          className="bg-wedding-red hover:bg-wedding-red/90 text-white"
          onClick={async () => {
            try {
              const res = await fetch('http://tramway.proxy.rlwy.net/api/complete-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  bookingId: ratingModal.bookingId,
                  serviceId: ratingModal.serviceId,
                  serviceType: ratingModal.serviceType,
                  rating: ratingValue
                })
              });

              if (res.ok) {
                toast({ title: 'Thanks for rating!' });
                setBookings(prev => prev.filter(b => b.BookingID !== ratingModal.bookingId));
  setRatingModal(null);
              } else {
                toast({ title: 'Error', description: 'Could not complete booking.' });
              }
            } catch (err) {
              console.error(err);
            }
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  </div>
)}

    </div>

    
  );

  
};

export default ClientDashboard;
