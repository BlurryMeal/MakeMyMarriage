
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';


interface Booking {
  id: number;
  service: string;
  date: string;
  client: string;
  status: string; // should be 'confirmed', 'pending', etc.
}

const BookingsTab = () => {

  const [bookings, setBookings] = useState<Booking[]>([]);

useEffect(() => {
  const vendor = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  if (!vendor?.id) return;

  fetch(`http://tramway.proxy.rlwy.net:57255/api/vendor-bookings/${vendor.id}`)
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        const formatted = data.map((b: any) => ({
          id: b.BookingID,
          service: b.ServiceName,
          date: new Date(b.EventDate).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          }),
          client: b.ClientName,
          status: b.BookingStatus.toLowerCase()
        }));
        setBookings(formatted);
      } else {
        console.error('Invalid bookings format:', data);
      }
    })
    .catch(err => {
      console.error('Failed to fetch bookings:', err);
    });
}, []);

  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Filter bookings based on search query and active filter
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.date.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && booking.status === activeFilter;
  });

  // Group bookings by date for calendar view
  const bookingsByDate = filteredBookings.reduce((acc, booking) => {
    const date = booking.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(booking);
    return acc;
  }, {} as Record<string, Booking[]>);

  // Handle view details button click
  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  // Close booking details modal
  const closeBookingDetails = () => {
    setSelectedBooking(null);
  };

  // Function to convert date string to Date object
  const parseBookingDate = (dateStr: string): Date => {
    const [month, day, year] = dateStr.split(' ');
    const monthMap: Record<string, number> = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return new Date(parseInt(year), monthMap[month], parseInt(day.replace(',', '')));
  };

  // Function to check if a date has bookings
  const hasBookingOnDate = (date: Date): boolean => {
    const formattedDate = format(date, 'MMMM d, yyyy');
    return Object.keys(bookingsByDate).some(dateStr => dateStr === formattedDate);
  };

  // Get dates with bookings for calendar highlighting
  const datesWithBookings = Object.keys(bookingsByDate).map(dateStr => parseBookingDate(dateStr));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Bookings</h2>
        <div>
          <Button variant="outline" className="mr-2">Export</Button>
          <Button 
            className={`${view === 'calendar' ? 'bg-wedding-red/80' : 'bg-wedding-red'} hover:bg-wedding-red/90`}
            onClick={() => setView(view === 'list' ? 'calendar' : 'list')}
          >
            {view === 'list' ? 'Calendar View' : 'List View'}
          </Button>
        </div>
      </div>
      
      <Tabs value={view} onValueChange={(value) => setView(value as 'list' | 'calendar')}>
        <TabsContent value="list" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b flex justify-between items-center">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search bookings..." 
                    className="pl-10" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={activeFilter === 'all' ? 'bg-gray-100 text-gray-700' : ''}
                    onClick={() => setActiveFilter('all')}
                  >
                    All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={activeFilter === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                    onClick={() => setActiveFilter('confirmed')}
                  >
                    Confirmed
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={activeFilter === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                    onClick={() => setActiveFilter('pending')}
                  >
                    Pending
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{booking.service}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{booking.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{booking.client}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewDetails(booking)}
                              >
                                View Details
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No bookings found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-0">
          <Card>
            <CardContent className="p-4">
              <div className="p-4 border-b flex justify-between items-center mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search bookings..." 
                    className="pl-10" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={activeFilter === 'all' ? 'bg-gray-100 text-gray-700' : ''}
                    onClick={() => setActiveFilter('all')}
                  >
                    All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={activeFilter === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                    onClick={() => setActiveFilter('confirmed')}
                  >
                    Confirmed
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={activeFilter === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                    onClick={() => setActiveFilter('pending')}
                  >
                    Pending
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <Calendar 
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="p-3 pointer-events-auto"
                  modifiers={{
                    hasBooking: datesWithBookings
                  }}
                  modifiersStyles={{
                    hasBooking: { 
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                      color: '#E11D48' 
                    }
                  }}
                />

                {selectedDate && (
                  <div className="mt-4 w-full">
                    <h3 className="text-lg font-medium mb-2">
                      Bookings for {format(selectedDate, 'MMMM d, yyyy')}
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(bookingsByDate).map(([dateStr, bookingsForDate]) => {
                        const formattedSelectedDate = format(selectedDate, 'MMMM d, yyyy');
                        
                        if (dateStr === formattedSelectedDate) {
                          return bookingsForDate.map(booking => (
                            <div 
                              key={booking.id} 
                              className="p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                              onClick={() => handleViewDetails(booking)}
                            >
                              <div className="flex justify-between">
                                <div>
                                  <p className="font-medium">{booking.service}</p>
                                  <p className="text-sm text-gray-600">{booking.client}</p>
                                </div>
                                <span className={`inline-flex px-2 py-1 text-xs rounded-full h-fit ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                  {booking.status}
                                </span>
                              </div>
                            </div>
                          ));
                        }
                        return null;
                      })}
                      {/* If no bookings for the selected date */}
                      {!Object.keys(bookingsByDate).some(dateStr => 
                        dateStr === format(selectedDate, 'MMMM d, yyyy')) && (
                        <p className="text-gray-500 text-center p-4">No bookings for this date.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Booking Details Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && closeBookingDetails()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Viewing detailed information for this booking.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-right">Service:</div>
                <div className="col-span-3">{selectedBooking.service}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-right">Date:</div>
                <div className="col-span-3">{selectedBooking.date}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-right">Client:</div>
                <div className="col-span-3">{selectedBooking.client}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-right">Status:</div>
                <div className="col-span-3">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {selectedBooking.status}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={closeBookingDetails}>Close</Button>
            <select
  value={selectedBooking?.status}
  onChange={(e) =>
    setSelectedBooking((prev: any) =>
      prev ? { ...prev, status: e.target.value } : prev
    )
  }
  className="border rounded px-2 py-1 mr-4"
>
  <option value="pending">Pending</option>
  <option value="confirmed">Confirmed</option>
  <option value="cancelled">Cancelled</option>
</select>
<Button
  className="bg-wedding-red hover:bg-wedding-red/90"
  onClick={async () => {
    try {
      const res = await fetch(`http://tramway.proxy.rlwy.net:57255/api/bookings/${selectedBooking?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: selectedBooking?.status }),
      });
      if (res.ok) {
        alert('Booking status updated');
        closeBookingDetails();
        window.location.reload(); // or manually update state if you prefer
      } else {
        console.error('Failed to update status');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }}
>
  Save Changes
</Button>

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsTab;
