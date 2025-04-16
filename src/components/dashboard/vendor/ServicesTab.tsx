import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Service {
  id: number;
  name: string;
  price: string;
  status: string;
}



const ServicesTab = ({ services: initialServices }: { services: Service[] }) => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [filteredServices, setFilteredServices] = useState<Service[]>(initialServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  console.log(user.email, user.phone);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({
    category: '',
    serviceName: '',
    location: '',
    address: '',
    description: '',
    pricing: '',
    serviceArea: '',
    website: '',
    capacity: '',
    amenities: '',
    tags: '',
    mainImage: '',
    featured: 'active'
  });

  const { toast } = useToast();

  useEffect(() => {
    let result = services;
    if (searchQuery) {
      result = result.filter(service => service.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (statusFilter !== 'all') {
      result = result.filter(service => service.status === statusFilter);
    }
    setFilteredServices(result);
  }, [services, searchQuery, statusFilter]);

  const handleAddService = async () => {
    console.log("Payload being sent:", {
      businessName: user?.businessName,
      email: user?.email,
      phone: user?.phone,
      category: newService.category,
      serviceName: newService.serviceName,
      location: newService.location,
      address: newService.address,
      description: newService.description,
      pricing: newService.pricing,
      serviceArea: newService.serviceArea,
      website: newService.website,
      capacity: newService.capacity,
      mainImage: newService.mainImage,
      amenities: newService.amenities.split(',').map(a => a.trim()),
      tags: newService.tags.split(',').map(t => t.trim()),
      featured: newService.featured === 'active'
    });
    
    if (!newService.serviceName || !newService.pricing) {
      toast({ title: "Error", description: "Service Name and Pricing are required.", variant: "destructive" });
      return;
    }

    const newEntry = {
      id: services.length ? Math.max(...services.map(s => s.id)) + 1 : 1,
      name: newService.serviceName,
      price: `₹${newService.pricing}`,
      status: newService.featured
    };

    setServices([...services, newEntry]);
    setIsAddDialogOpen(false);
    toast({ title: "Success", description: "Service added successfully" });

    try {
      const response = await fetch('http://tramway.proxy.rlwy.net/api/register-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: user?.businessName,
          email: user?.email,
          phone: user?.phone,
          category: newService.category,
          serviceName: newService.serviceName,
          location: newService.location,
          address: newService.address,
          description: newService.description,
          pricing: newService.pricing,
          serviceArea: newService.serviceArea,
          website: newService.website,
          capacity: newService.capacity,
          mainImage: newService.mainImage,
          amenities: newService.amenities.split(',').map(a => a.trim()),
          tags: newService.tags.split(',').map(t => t.trim()),
          featured: newService.featured === 'active'
        })
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }
    
      // ✅ Show response message
      toast({
        title: 'Service Registered',
        description: `Successfully registered with ID: ${data.serviceId}`,
      });
    
    } catch (err: any) {
      console.error('Service Registration Error:', err);
      toast({
        title: 'Backend Error',
        description: err.message || 'Could not connect to server',
        variant: 'destructive',
      });
    }
    
  };

  

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Services</h2>
        <Button className="bg-wedding-red hover:bg-wedding-red/90" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add New Service
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search services..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Service List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredServices.map(service => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{service.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{service.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {service.status === 'active' ? 'Active' : 'Draft'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Service Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
  <DialogContent className="max-h-[90vh] overflow-y-scroll">
    <DialogHeader>
      <DialogTitle>Add New Service</DialogTitle>
      <DialogDescription>Fill in all required details</DialogDescription>
    </DialogHeader>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
      {/* Category Dropdown */}
      <div className="grid gap-1">
        <Label htmlFor="category">Category</Label>
        <Select
          value={newService.category}
          onValueChange={(val) =>
            setNewService((prev) => ({ ...prev, category: val }))
          }
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="venue">Venue</SelectItem>
            <SelectItem value="catering">Catering</SelectItem>
            <SelectItem value="decoration">Decoration</SelectItem>
            <SelectItem value="photography">Photography</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Other Inputs */}
      {['serviceName', 'location', 'address', 'description', 'pricing', 'serviceArea', 'website', 'capacity', 'mainImage'].map((field) => (
        <div key={field} className="grid gap-1">
          <Label htmlFor={field}>
            {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
          </Label>
          <Input
            id={field}
            name={field}
            value={(newService as any)[field]}
            onChange={handleChange}
          />
        </div>
      ))}

      {/* Amenities */}
      <div className="grid gap-1">
        <Label htmlFor="amenities">Amenities (comma-separated)</Label>
        <Input
          id="amenities"
          name="amenities"
          value={newService.amenities}
          onChange={handleChange}
        />
      </div>

      {/* Tags */}
      <div className="grid gap-1">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          name="tags"
          value={newService.tags}
          onChange={handleChange}
        />
      </div>

      {/* Status Dropdown */}
      <div className="grid gap-1">
        <Label htmlFor="featured">Status</Label>
        <Select
          value={newService.featured}
          onValueChange={(val) =>
            setNewService((prev) => ({ ...prev, featured: val }))
          }
        >
          <SelectTrigger id="featured">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <DialogFooter>
      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleAddService}>Add Service</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  );
};

export default ServicesTab;