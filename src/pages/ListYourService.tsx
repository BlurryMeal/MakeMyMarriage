import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Camera,
  Clipboard,
  Music,
  UtensilsCrossed,
  Building,
  Heart,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const serviceCategories = [
  { id: 'venue', name: 'Venue', icon: Building },
  { id: 'catering', name: 'Catering', icon: UtensilsCrossed },
  { id: 'photography', name: 'Photography', icon: Camera },
  { id: 'entertainment', name: 'Entertainment', icon: Music },
  { id: 'decor', name: 'Decor', icon: Heart },
];

const ListYourService = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    email: '',
    phone: '',
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
    featured: false,
    mainImage: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://tramway.proxy.rlwy.net/api/register-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong.');
      } else {
        navigate('/dashboard/vendor');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to submit form.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-12">
        <div className="wedding-container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold font-playfair mb-4">
              List Your Wedding Services
            </h1>
            <p className="text-gray-600">
              Join thousands of vendors on MakeMyMarriage and showcase your services to
              couples planning their dream wedding.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between relative">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= i ? 'bg-wedding-red text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {i}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {i === 1 ? 'Business Info' : i === 2 ? 'Service Details' : 'Review & Submit'}
                  </p>
                </div>
              ))}
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
                <div
                  className="h-full bg-wedding-red transition-all"
                  style={{ width: `${(step - 1) * 50}%` }}
                ></div>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1
                  ? 'Business Information'
                  : step === 2
                  ? 'Service Details'
                  : 'Review Your Information'}
              </CardTitle>
              <CardDescription>
                {step === 1
                  ? 'Tell us about your business'
                  : step === 2
                  ? 'Provide details about the services you offer'
                  : 'Please review your information before submitting'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <Input name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Business Name" required />
                    <Label>Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                      <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                      <SelectContent>
                        {serviceCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <Input name="serviceName" value={formData.serviceName} onChange={handleChange} placeholder="Service Name" required />
                    <Input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                    <Input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
                    <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={4} required />
                    <Input name="pricing" value={formData.pricing} onChange={handleChange} placeholder="Pricing" required />
                    <Input name="serviceArea" value={formData.serviceArea} onChange={handleChange} placeholder="Service Area" required />
                    <Input name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
                    <Input name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Capacity (e.g., 100-300 guests)" />
                    <Input name="amenities" value={formData.amenities} onChange={handleChange} placeholder="Amenities (comma separated)" />
                    <Input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" />
                    <Input name="mainImage" value={formData.mainImage} onChange={handleChange} placeholder="Main Image URL" />
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} />
                      <Label htmlFor="featured">Mark as Featured</Label>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium mb-2">Review Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md text-sm space-y-2">
                      {Object.entries(formData).map(([key, value]) => (
                        <p key={key}><strong>{key}:</strong> {value?.toString()}</p>
                      ))}
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="terms" className="mr-2" required />
                      <Label htmlFor="terms">I agree to the <a href="#" className="text-wedding-red">Terms & Conditions</a></Label>
                    </div>
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                  </div>
                )}

                <div className="flex justify-between">
                  {step > 1 && <Button type="button" variant="outline" onClick={handleBack}>Back</Button>}
                  {step < 3 ? (
                    <Button type="button" onClick={handleNext} className="ml-auto bg-wedding-red hover:bg-wedding-red/90">Continue</Button>
                  ) : (
                    <Button type="submit" className="ml-auto bg-wedding-red hover:bg-wedding-red/90">Submit</Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListYourService;
