
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  client: string;
  rating: number;
  comment: string;
}

const ReviewsTab = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Reviews & Ratings</h2>
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md">
          <div className="flex mr-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-gray-800 font-semibold">4.8 <span className="text-gray-500 font-normal">/ 5</span></p>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {reviews.map((review) => (
            <div key={review.id} className="mb-6 border-b pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-lg">{review.client}</p>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm">Reply</Button>
              </div>
              <p className="text-gray-600 mt-2">"{review.comment}"</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsTab;
