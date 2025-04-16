
import { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  FileText, 
  Briefcase, 
  DollarSign, 
  BarChart3, 
  Bookmark,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  X,
  Mail
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset
} from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AdminHeader from '@/components/dashboard/AdminHeader';

const bookingsData = [
  { date: '2023-06-15', count: 28 },
  { date: '2023-07-12', count: 25 },
  { date: '2023-08-03', count: 22 },
  { date: '2023-05-22', count: 20 },
  { date: '2023-09-10', count: 18 },
];  


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedVendor, setExpandedVendor] = useState<number | null>(null);
  const [contactMessages, setContactMessages] = useState([]);
  const [allBookings, setAllBookings] = useState<any[]>([]);

  const [allClients, setAllClients] = useState<any[]>([]);

  const [vendorServices, setVendorServices] = useState<any[]>([]);

  useEffect(() => {
  if (activeTab === 'vendors') {
    fetch('http://tramway.proxy.rlwy.net:57255/api/admin/vendors')
      .then(res => res.json())
      .then(data => setVendorServices(data))
      .catch(err => console.error('Failed to fetch vendors:', err));
  }
}, [activeTab]);


  useEffect(() => {
    if (activeTab === 'clients') {
      fetch('http://tramway.proxy.rlwy.net:57255/api/clients')
        .then(res => res.json())
        .then(data => setAllClients(data))
        .catch(err => console.error('Failed to fetch clients:', err));
    }
  }, [activeTab]);
  

  useEffect(() => {
    if (activeTab === 'bookings') {
      fetch('http://tramway.proxy.rlwy.net:57255/api/bookings')
        .then(res => res.json())
        .then(data => {
          setAllBookings(data);
        })
        .catch(err => console.error('Failed to fetch bookings:', err));
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'messages') {
      fetch('http://tramway.proxy.rlwy.net:57255/api/messages')
        .then(res => res.json())
        .then(data => setContactMessages(data))
        .catch(err => console.error('Failed to fetch messages:', err));
    }
  }, [activeTab]);
  
  // Client filters state
  const [clientFilters, setClientFilters] = useState({
    search: '',
    minBookings: 0,
    maxBookings: 10,
    minSpent: 0,
    maxSpent: 100000,
    locations: [] as string[],
    showFilters: false
  });
  
  const uniqueLocations = useMemo(() => {
    return [...new Set(allClients.map(client => client.location))];
  }, []);
  
  // Handle client filter changes
  const handleFilterChange = (key: string, value: any) => {
    setClientFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Toggle location filter
  const toggleLocationFilter = (location: string) => {
    setClientFilters(prev => {
      const newLocations = prev.locations.includes(location)
        ? prev.locations.filter(loc => loc !== location)
        : [...prev.locations, location];
      
      return {
        ...prev,
        locations: newLocations
      };
    });
  };
  
  // Reset filters
  const resetFilters = () => {
    setClientFilters({
      search: '',
      minBookings: 0,
      maxBookings: 10,
      minSpent: 0,
      maxSpent: 100000,
      locations: [],
      showFilters: false
    });
  };

  
  
  
  // Filtered clients based on current filters
  const filteredClients = useMemo(() => {
    return allClients.filter(client => {
      // Search filter
      if (clientFilters.search && 
          !client.name.toLowerCase().includes(clientFilters.search.toLowerCase()) &&
          !client.email.toLowerCase().includes(clientFilters.search.toLowerCase())) {
        return false;
      }
      
      // Bookings range filter
      if (client.bookings < clientFilters.minBookings || 
          client.bookings > clientFilters.maxBookings) {
        return false;
      }
      
      // Spent range filter
      if (client.totalSpent < clientFilters.minSpent || 
          client.totalSpent > clientFilters.maxSpent) {
        return false;
      }
      
      // Location filter
      if (clientFilters.locations.length > 0 && 
          !clientFilters.locations.includes(client.location)) {
        return false;
      }
      
      return true;
    });
  }, [clientFilters, allClients]);

  const toggleVendorExpand = (vendorId: number) => {
    if (expandedVendor === vendorId) {
      setExpandedVendor(null);
    } else {
      setExpandedVendor(vendorId);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="flex items-center px-4 py-2">
            <h1 className="text-xl font-semibold pl-2">Admin Panel</h1>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Analytics</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeTab === 'overview'}
                    onClick={() => setActiveTab('overview')}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    <span>Overview</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeTab === 'bookings'}
                    onClick={() => setActiveTab('bookings')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Bookings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeTab === 'clients'}
                    onClick={() => setActiveTab('clients')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    <span>Clients</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeTab === 'vendors'}
                    onClick={() => setActiveTab('vendors')}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>Vendors</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={activeTab === 'messages'} onClick={() => setActiveTab('messages')}>
                    <Mail className="h-4 w-4 mr-2" />
                    <span>Messages</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t">
            <div className="px-4 py-2">
              <p className="text-xs text-gray-500">Logged in as Admin</p>
              <p className="text-sm font-medium">admin@makemymarriage.com</p>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="p-4 md:p-6">
          <div className="space-y-6 w-full max-w-6xl mx-auto">
            <AdminHeader setActiveTab={setActiveTab} />

            {activeTab === 'overview' && (
              <>
                <h1 className="text-2xl md:text-3xl font-bold">Dashboard Overview</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Total Bookings</CardTitle>
                      <CardDescription>All time bookings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Bookmark className="h-8 w-8 text-blue-500 mr-2" />
                        <span className="text-3xl font-bold">{allBookings.length}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Active Vendors</CardTitle>
                      <CardDescription>Vendors on platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Briefcase className="h-8 w-8 text-wedding-red mr-2" />
                        <span className="text-3xl font-bold">{vendorServices.length}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Total Revenue</CardTitle>
                      <CardDescription>All time earnings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <DollarSign className="h-8 w-8 text-green-500 mr-2" />
                        <span className="text-3xl font-bold">₹{vendorServices.reduce((sum, vendor) => sum + vendor.totalRevenue, 0).toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Most Booked Days</CardTitle>
                      <CardDescription>Top days by booking count</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {bookingsData.map((day, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>
                                {new Date(day.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium mr-2">{day.count}</span>
                              <span className="text-xs text-muted-foreground">bookings</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Vendors By Revenue</CardTitle>
                      <CardDescription>Highest earning vendors</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {vendorServices
                          .sort((a, b) => b.totalRevenue - a.totalRevenue)
                          .slice(0, 5)
                          .map((vendor, i) => (
                            <div key={i} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{vendor.name}</span>
                                <span className="text-sm">₹{vendor.totalRevenue.toLocaleString()}</span>
                              </div>
                              <Progress 
                                value={(vendor.totalRevenue / vendorServices[0].totalRevenue) * 100} 
                                className="h-2" 
                              />
                            </div>
                          ))
                        }
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
            
            {activeTab === 'bookings' && (
              <>
                <h1 className="text-2xl md:text-3xl font-bold">All Bookings</h1>
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Details</CardTitle>
                    <CardDescription>Complete details for all client bookings across all vendors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Vendor</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      {Array.isArray(allBookings) && allBookings.map((booking) => (
  <TableRow key={booking.BookingID}>
<TableCell>{booking.ClientName}</TableCell>
<TableCell>{booking.VendorName}</TableCell>
<TableCell>{booking.ServiceName}</TableCell>
<TableCell>{booking.ServiceType}</TableCell>
<TableCell>{new Date(booking.EventDate).toLocaleDateString()}</TableCell>
<TableCell>
  <Badge variant={booking.BookingStatus === 'Confirmed' ? 'default' : 'secondary'}>
    {booking.BookingStatus}
  </Badge>
</TableCell>

  </TableRow>
))}


                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}

{activeTab === 'messages' && (
              <>
                <h1 className="text-2xl md:text-3xl font-bold">User Messages</h1>
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Submissions</CardTitle>
                    <CardDescription>Messages sent via the contact form</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Submitted</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contactMessages.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
                              No messages found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          contactMessages.map((msg) => (
                            <TableRow key={msg.MessageID}>
                              <TableCell>{msg.MessageID}</TableCell>
                              <TableCell>{msg.Name}</TableCell>
                              <TableCell>{msg.Email}</TableCell>
                              <TableCell>{msg.Phone || '-'}</TableCell>
                              <TableCell>{msg.Subject}</TableCell>
                              <TableCell className="max-w-xs truncate">{msg.Message}</TableCell>
                              <TableCell>{new Date(msg.SubmittedAt).toLocaleString()}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}

            
            {activeTab === 'clients' && (
              <>
                <h1 className="text-2xl md:text-3xl font-bold">All Clients</h1>
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <CardTitle>Client Listing</CardTitle>
                        <CardDescription>Complete details of all clients registered on the platform</CardDescription>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleFilterChange('showFilters', !clientFilters.showFilters)}
                        >
                          <Filter className="h-4 w-4 mr-2" />
                          Filters
                          {clientFilters.showFilters ? 
                            <ChevronUp className="h-4 w-4 ml-2" /> : 
                            <ChevronDown className="h-4 w-4 ml-2" />
                          }
                        </Button>
                        
                        {(clientFilters.search !== '' || 
                          clientFilters.minBookings > 0 || 
                          clientFilters.maxBookings < 10 ||
                          clientFilters.minSpent > 0 ||
                          clientFilters.maxSpent < 100000 ||
                          clientFilters.locations.length > 0) && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={resetFilters}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Clear
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <Collapsible open={clientFilters.showFilters} className="w-full">
                    <CollapsibleContent>
                      <div className="px-6 py-4 border-b border-t bg-muted/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="search-clients">Search</Label>
                            <div className="relative">
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="search-clients"
                                placeholder="Search by name or email"
                                className="pl-8"
                                value={clientFilters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Bookings Range</Label>
                            <div className="flex items-center gap-2">
                              <Select 
                                value={clientFilters.minBookings.toString()}
                                onValueChange={(value) => handleFilterChange('minBookings', parseInt(value))}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Min" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0">Any</SelectItem>
                                  <SelectItem value="1">1+</SelectItem>
                                  <SelectItem value="2">2+</SelectItem>
                                  <SelectItem value="3">3+</SelectItem>
                                  <SelectItem value="4">4+</SelectItem>
                                  <SelectItem value="5">5+</SelectItem>
                                </SelectContent>
                              </Select>
                              <span>to</span>
                              <Select 
                                value={clientFilters.maxBookings.toString()}
                                onValueChange={(value) => handleFilterChange('maxBookings', parseInt(value))}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Max" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                  <SelectItem value="10">10</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Amount Spent (₹)</Label>
                            <div className="flex items-center gap-2">
                              <Select 
                                value={clientFilters.minSpent.toString()}
                                onValueChange={(value) => handleFilterChange('minSpent', parseInt(value))}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Min" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0">Any</SelectItem>
                                  <SelectItem value="10000">₹10,000+</SelectItem>
                                  <SelectItem value="20000">₹20,000+</SelectItem>
                                  <SelectItem value="50000">₹50,000+</SelectItem>
                                  <SelectItem value="75000">₹75,000+</SelectItem>
                                </SelectContent>
                              </Select>
                              <span>to</span>
                              <Select 
                                value={clientFilters.maxSpent.toString()}
                                onValueChange={(value) => handleFilterChange('maxSpent', parseInt(value))}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Max" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="20000">₹20,000</SelectItem>
                                  <SelectItem value="50000">₹50,000</SelectItem>
                                  <SelectItem value="75000">₹75,000</SelectItem>
                                  <SelectItem value="100000">₹100,000</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>
                              <div className="flex items-center">
                                Bookings
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-5 w-5 p-0 ml-1"
                                  onClick={() => {
                                    const sorted = [...filteredClients].sort((a, b) => b.bookings - a.bookings);
                                    setClientFilters(prev => ({
                                      ...prev,
                                      sortedClients: sorted,
                                      sortBy: 'bookings'
                                    }));
                                  }}
                                >
                                  <ChevronDown className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableHead>
                            <TableHead>Total Spent</TableHead>
                            <TableHead>Last Booking</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredClients.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                No clients match the current filters
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredClients.map((client, index) => (
                              <TableRow key={client.id} isStriped={true}>
                                <TableCell className="font-medium">{client.id}</TableCell>
                                <TableCell>{client.name}</TableCell>
                                <TableCell>{client.email}</TableCell>
                                <TableCell>
                                  <Badge 
                                    variant={client.bookings > 1 ? "default" : "outline"} 
                                    className={client.bookings > 1 ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : "bg-gray-100"}
                                  >
                                    {client.bookings} {client.bookings === 1 ? 'booking' : 'bookings'}
                                  </Badge>
                                </TableCell>
                                <TableCell>₹{client.totalSpent.toLocaleString()}</TableCell>
                                <TableCell>
                                  {new Date(client.lastBooking).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-sm text-muted-foreground">
                        Showing {filteredClients.length} of {allClients.length} clients
                      </p>
                      {filteredClients.length > 0 && (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" disabled>Previous</Button>
                          <Button variant="outline" size="sm" disabled>Next</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            
            {activeTab === 'vendors' && (
              <>
                <h1 className="text-2xl md:text-3xl font-bold">Vendor Services</h1>
                <Card>
                  <CardHeader>
                    <CardTitle>All Vendors with Services</CardTitle>
                    <CardDescription>Detailed list of all vendors and the services they offer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vendorServices.map((vendor) => (
                        <div key={vendor.id} className="border rounded-lg overflow-hidden">
                          <div 
                            className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                            onClick={() => toggleVendorExpand(vendor.id)}
                          >
                            <div>
                              <h3 className="font-medium">{vendor.name}</h3>
                              <p className="text-sm text-muted-foreground">{vendor.category} - {vendor.services.length} services</p>
                            </div>
                            <Button variant="ghost" size="icon">
                              {expandedVendor === vendor.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          
                          {expandedVendor === vendor.id && (
                            <div className="p-4 border-t">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Service Name</TableHead>
                                    <TableHead>Price Range</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {vendor.services.map((service, idx) => (
                                    <TableRow key={idx}>
                                      <TableCell>{service.name}</TableCell>
                                      <TableCell>{service.price}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            
           
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );

  
};



export default AdminDashboard;
