
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Calendar, 
  ImageIcon, 
  Star, 
  MessageSquare, 
  CreditCard, 
  User, 
  Settings, 
  LogOut 
} from 'lucide-react';

interface VendorSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadMessages: number;
}

const VendorSidebar = ({ activeTab, setActiveTab, unreadMessages }: VendorSidebarProps) => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    // In a real app, handle logout logic here
    navigate('/');
  };

  return (
    <div className="w-64 bg-white h-screen shadow-sm fixed">
      <div className="flex items-center justify-center h-16 border-b">
        <span 
          className="text-xl font-bold font-playfair cursor-pointer"
          onClick={goToHome}
        >
          MakeMyMarriage
        </span>
      </div>
      <div className="py-4 flex flex-col h-[calc(100%-4rem)] justify-between">
        <div>
          <div className="px-4 py-2">
            <p className="text-gray-500 text-xs uppercase font-semibold">Vendor Tools</p>
          </div>
          <button 
            className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'overview' ? 'bg-wedding-red/10 text-wedding-red border-r-4 border-wedding-red' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('overview')}
          >
            <Home className="h-5 w-5 mr-3" />
            <span>Dashboard</span>
          </button>
          <button 
            className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'services' ? 'bg-wedding-red/10 text-wedding-red border-r-4 border-wedding-red' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('services')}
          >
            <Briefcase className="h-5 w-5 mr-3" />
            <span>My Services</span>
          </button>
          <button 
            className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'bookings' ? 'bg-wedding-red/10 text-wedding-red border-r-4 border-wedding-red' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar className="h-5 w-5 mr-3" />
            <span>Bookings</span>
          </button>
          <button 
            className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'reviews' ? 'bg-wedding-red/10 text-wedding-red border-r-4 border-wedding-red' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('reviews')}
          >
            <Star className="h-5 w-5 mr-3" />
            <span>Reviews</span>
          </button>
          <button 
            className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'earnings' ? 'bg-wedding-red/10 text-wedding-red border-r-4 border-wedding-red' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('earnings')}
          >
            <CreditCard className="h-5 w-5 mr-3" />
            <span>Earnings</span>
          </button>
          
          <div className="px-4 py-2 mt-6">
            <p className="text-gray-500 text-xs uppercase font-semibold">Account</p>
          </div>
          <button 
            className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'profile' ? 'bg-wedding-red/10 text-wedding-red border-r-4 border-wedding-red' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="h-5 w-5 mr-3" />
            <span>Business Profile</span>
          </button>
          <button 
            className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'settings' ? 'bg-wedding-red/10 text-wedding-red border-r-4 border-wedding-red' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="h-5 w-5 mr-3" />
            <span>Settings</span>
          </button>
        </div>
        
        {/* Logout Button at bottom */}
        <div className="px-4 mt-auto">
          <button 
            className="flex items-center px-4 py-3 w-full text-left text-gray-600 hover:bg-gray-100 rounded-md"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorSidebar;
