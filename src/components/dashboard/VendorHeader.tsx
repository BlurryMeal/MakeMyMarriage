import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MoreVertical, User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface VendorHeaderProps {
  setActiveTab: (tab: string) => void;
}

const VendorHeader = ({ setActiveTab }: VendorHeaderProps) => {
  const navigate = useNavigate();
  const [vendorName, setVendorName] = useState('');
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setVendorName(user.name || '');
      setBusinessName(user.businessName || '');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const getInitials = (name: string) => {
    if (!name) return 'VN'; // default initials
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0];
    return parts[0][0] + parts[1][0];
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold font-playfair">Vendor Dashboard</h1>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <div className="w-10 h-10 bg-wedding-red rounded-full flex items-center justify-center text-white font-bold mr-2">
                {getInitials(vendorName)}
              </div>
              <span className="text-gray-700 mr-1">{businessName || 'Your Business'}</span>
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{vendorName || 'Vendor'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setActiveTab('profile')}>
              <User className="h-4 w-4 mr-2" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab('settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default VendorHeader;
