
import { useNavigate } from 'react-router-dom';
import { MoreVertical, User, Settings, LogOut } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminHeaderProps {
  setActiveTab: (tab: string) => void;
}

const AdminHeader = ({ setActiveTab }: AdminHeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, handle logout logic here
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold font-playfair">Admin Dashboard</h1>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                AD
              </div>
              <span className="text-gray-700 mr-1">Admin</span>
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
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

export default AdminHeader;
