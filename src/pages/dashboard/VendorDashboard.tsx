import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

// Import components
import VendorSidebar from '@/components/dashboard/VendorSidebar';
import VendorHeader from '@/components/dashboard/VendorHeader';
import DashboardOverview from '@/components/dashboard/vendor/DashboardOverview';
import ServicesTab from '@/components/dashboard/vendor/ServicesTab';
import BookingsTab from '@/components/dashboard/vendor/BookingsTab';
import GalleryTab from '@/components/dashboard/vendor/GalleryTab';
import ReviewsTab from '@/components/dashboard/vendor/ReviewsTab';
import MessagesTab from '@/components/dashboard/vendor/MessagesTab';
import EarningsTab from '@/components/dashboard/vendor/EarningsTab';
import ProfileTab from '@/components/dashboard/vendor/ProfileTab';
import SettingsTab from '@/components/dashboard/vendor/SettingsTab';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  
  // Mock data for services
  const services = [
    { id: 1, name: 'Wedding Photography', price: '₹25,000', status: 'active' },
    { id: 2, name: 'Pre-Wedding Photoshoot', price: '₹15,000', status: 'active' },
    { id: 3, name: 'Wedding Video', price: '₹35,000', status: 'draft' }
  ];
  
  // Mock data for bookings with 2025 dates
  const bookings = [
    { id: 1, service: 'Wedding Photography', date: 'June 15, 2025', client: 'Priya & Rahul', status: 'confirmed' },
    { id: 2, service: 'Pre-Wedding Photoshoot', date: 'May 28, 2025', client: 'Ananya & Vikram', status: 'pending' },
    { id: 3, service: 'Wedding Video', date: 'July 10, 2025', client: 'Neha & Arjun', status: 'confirmed' },
    { id: 4, service: 'Wedding Photography', date: 'August 5, 2025', client: 'Meera & Raj', status: 'confirmed' }
  ];
  
  // Mock data for gallery
  const galleryImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop' },
    { id: 3, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop' },
    { id: 4, url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop' },
    { id: 5, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop' },
    { id: 6, url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop' }
  ];
  
  // Mock data for reviews
  const reviews = [
    { id: 1, client: 'Priya & Rahul', rating: 5, comment: 'Amazing service! The photos were delivered on time and exceeded our expectations.' },
    { id: 2, client: 'Ananya & Vikram', rating: 4, comment: 'Great pre-wedding shoot experience. They made us feel comfortable throughout the session.' },
    { id: 3, client: 'Neha & Arjun', rating: 5, comment: 'Vibrant Photography captured our wedding beautifully. Highly recommended!' },
    { id: 4, client: 'Meera & Raj', rating: 4, comment: 'Very professional team. Good quality work delivered within the timeline.' }
  ];
  
  // Mock data for messages
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Priya', lastMessage: 'Hi, I wanted to inquire about your availability for a wedding in June?', time: '2 hours ago', unread: true },
    { id: 2, sender: 'Ananya', lastMessage: 'Thank you for the quote. Could we discuss some customizations?', time: 'Yesterday', unread: false },
    { id: 3, sender: 'Neha', lastMessage: 'When can we expect the final edited photos?', time: '2 days ago', unread: false },
    { id: 4, sender: 'Meera', lastMessage: 'We loved the sample photos! Looking forward to the full album.', time: '1 week ago', unread: false }
  ]);
  
  // Mock conversation for messaging system
  const conversation = [
    { id: 1, sender: 'Priya', message: 'Hi, I wanted to inquire about your availability for a wedding in June?', time: '2 hours ago' },
    { id: 2, sender: 'me', message: 'Hello Priya! Yes, I have some availability in June. Which dates are you considering?', time: '1 hour ago' },
    { id: 3, sender: 'Priya', message: 'We are planning for June 15th. Do you offer full day coverage?', time: '1 hour ago' },
    { id: 4, sender: 'me', message: 'Yes, I do offer full day coverage packages. Would you like me to send you our detailed pricing?', time: '45 minutes ago' }
  ];
  
  // Mock data for earnings
  const earnings = {
    total: '₹120,000',
    pending: '₹35,000',
    monthlyData: [
      { month: 'Jan', amount: 15000 },
      { month: 'Feb', amount: 18000 },
      { month: 'Mar', amount: 22000 },
      { month: 'Apr', amount: 20000 },
      { month: 'May', amount: 25000 },
      { month: 'Jun', amount: 20000 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <VendorSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          unreadMessages={messages.filter(m => m.unread).length}
        />
        
        {/* Main Content */}
        <div className="ml-64 flex-1 p-6">
          <VendorHeader setActiveTab={setActiveTab} />
          
          {activeTab === 'overview' && (
            <DashboardOverview 
              bookings={bookings} 
              reviews={reviews} 
              setActiveTab={setActiveTab} 
            />
          )}
          
          {activeTab === 'services' && (
            <ServicesTab services={services} />
          )}
          
          {activeTab === 'bookings' && (
            <BookingsTab bookings={bookings} />
          )}
          
          {activeTab === 'gallery' && (
            <GalleryTab galleryImages={galleryImages} />
          )}
          
          {activeTab === 'reviews' && (
            <ReviewsTab reviews={reviews} />
          )}  
          
          {activeTab === 'earnings' && (
            <EarningsTab earnings={earnings} />
          )}
          
          {activeTab === 'profile' && (
            <ProfileTab />
          )}
          
          {activeTab === 'settings' && (
            <SettingsTab />
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
