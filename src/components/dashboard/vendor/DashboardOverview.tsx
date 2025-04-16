
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface Booking {
  id: number;
  service: string;
  date: string;
  client: string;
  status: string;
}

interface Review {
  id: number;
  client: string;
  rating: number;
  comment: string;
}

interface DashboardOverviewProps {
  bookings: Booking[];
  reviews: Review[];
  setActiveTab: (tab: string) => void;
}

const DashboardOverview = ({ bookings, reviews, setActiveTab }: DashboardOverviewProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">New Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
            <p className="text-sm text-green-600">+2 from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹45,000</p>
            <p className="text-sm text-green-600">+18% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Profile Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">342</p>
            <p className="text-sm text-green-600">+28 from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <p className="text-3xl font-bold mr-2">4.8</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600">Based on 56 reviews</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Your latest 5 bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium">{booking.service}</p>
                    <p className="text-sm text-gray-600">{booking.date} - {booking.client}</p>
                  </div>
                  <span className={`inline-block ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
            <Button 
              variant="link" 
              className="mt-4 p-0 text-wedding-red"
              onClick={() => setActiveTab('bookings')}
            >
              View all bookings
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>Latest client feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviews.slice(0, 2).map((review) => (
                <div key={review.id} className="border-b pb-3">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm font-medium">{review.client}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
            <Button 
              variant="link" 
              className="mt-4 p-0 text-wedding-red"
              onClick={() => setActiveTab('reviews')}
            >
              View all reviews
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
