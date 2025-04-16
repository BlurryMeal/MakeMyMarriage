import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SignUp = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('client');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    businessName: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        userType
      };

      const response = await fetch('http://tramway.proxy.rlwy.net:57255/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Sign up failed');
        return;
      }

      navigate('/signin');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Button 
        variant="ghost" 
        className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-gray-900"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 font-playfair">
          Join MakeMyMarriage
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 mb-4">
          Create your account to get started
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Tabs defaultValue="client" onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="client" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                Client
              </TabsTrigger>
              <TabsTrigger value="vendor" className="data-[state=active]:bg-wedding-red/10 data-[state=active]:text-wedding-red">
                Vendor
              </TabsTrigger>
            </TabsList>

            <form className="space-y-6" onSubmit={handleSignUp}>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {userType === 'vendor' && (
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" className={`w-full ${userType === 'vendor' ? 'bg-wedding-red hover:bg-wedding-red/90' : 'bg-blue-600 hover:bg-blue-700'}`}>
                Sign Up as {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a
                  onClick={() => navigate('/signin')}
                  className={`cursor-pointer font-medium ${userType === 'vendor' ? 'text-wedding-red hover:text-wedding-red/80' : 'text-blue-600 hover:text-blue-500'}`}
                >
                  Sign in
                </a>
              </p>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
