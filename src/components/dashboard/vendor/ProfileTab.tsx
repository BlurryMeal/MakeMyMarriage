
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';

const ProfileTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Business Profile</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-48 bg-gray-200 relative">
          <img
            src="https://images.unsplash.com/photo-1609151376730-f246ec0b99e5?q=80&w=1974&auto=format&fit=crop"
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4">
            <Button variant="outline" className="bg-white">
              <Edit className="h-4 w-4 mr-2" />
              Change Cover
            </Button>
          </div>
        </div>
        
        <div className="p-6 relative">
          <div className="absolute -top-16 left-6 w-24 h-24 bg-wedding-red rounded-full border-4 border-white flex items-center justify-center text-white text-3xl font-bold">
            VP
          </div>
          
          <div className="ml-28">
            <h3 className="text-2xl font-bold">Vibrant Photography</h3>
            <p className="text-gray-600">Premium Wedding Photography Services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Basic Information</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input id="business-name" defaultValue="Vibrant Photography" />
                </div>
                <div>
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea 
                    id="description" 
                    defaultValue="Premium wedding photography services with over 8 years of experience. We specialize in candid and traditional wedding photography across India."
                    className="h-32"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" defaultValue="Photography" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="contact@vibrantphotography.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+91 98765 43210" />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="www.vibrantphotography.com" />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="address" 
                    defaultValue="123 Wedding Street, Photographer's Lane, Mumbai - 400001"
                    className="h-[76px]"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4">Social Media Links</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" defaultValue="@vibrant_photography" />
              </div>
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" defaultValue="facebook.com/vibrantphotography" />
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button variant="outline" className="mr-2">Cancel</Button>
            <Button className="bg-wedding-red hover:bg-wedding-red/90">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
