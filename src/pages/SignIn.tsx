import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('client');
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://tramway.proxy.rlwy.net/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          userType
        })
      });
  
      const data = await response.json();
      console.log("Login response:", data);
      localStorage.setItem('user', JSON.stringify(data.user));
  
      if (!response.ok) {
        alert(data.error || 'Login failed. Please check your credentials.');
        return;
      }
  
      // ✅ Store user in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(data.user));
  
      // ✅ Navigate to appropriate dashboard
      
      switch (userType.toLowerCase()) {
        case 'client':
          navigate('/dashboard/client');
          break;
        case 'vendor':
          navigate('/dashboard/vendor');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
        default:
          navigate('/');
      }
      
  
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong while logging in.');
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
          Welcome to MakeMyMarriage
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 mb-4">
          Sign in to access your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Tabs defaultValue="client" onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="client" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                Client
              </TabsTrigger>
              <TabsTrigger value="vendor" className="data-[state=active]:bg-wedding-red/10 data-[state=active]:text-wedding-red">
                Vendor
              </TabsTrigger>
              <TabsTrigger value="admin" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
                Admin
              </TabsTrigger>
            </TabsList>

            <form className="space-y-6" onSubmit={handleSignIn}>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button 
                type="submit" 
                className={`w-full ${
                  userType === 'client' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : userType === 'vendor' 
                      ? 'bg-wedding-red hover:bg-wedding-red/90'
                      : 'bg-purple-700 hover:bg-purple-800'
                }`}
              >
                Sign in as {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </Button>
            </form>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a 
                onClick={() => navigate('/signup')} 
                className={`cursor-pointer font-medium ${
                  userType === 'admin' 
                    ? 'text-purple-600 hover:text-purple-500' 
                    : userType === 'vendor' 
                      ? 'text-wedding-red hover:text-wedding-red/80' 
                      : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
