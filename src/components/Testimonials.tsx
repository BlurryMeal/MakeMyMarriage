
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya & Arjun",
    image: "https://images.unsplash.com/photo-1606979616992-863845aef889?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "Wedding Oasis made our wedding planning journey so much easier! We found our dream venue and the perfect photographer through the app. The vendors were reliable and everything was exactly as promised. Highly recommend!",
    date: "June 2024"
  },
  {
    id: 2,
    name: "Aisha & Rahul",
    image: "https://images.unsplash.com/photo-1583001809873-a128495da465?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "From finding the perfect venue to coordinating with caterers, Wedding Oasis simplified our wedding planning. The vendors were professional and the platform was easy to navigate. Our wedding was everything we dreamed of!",
    date: "March 2024"
  },
  {
    id: 3,
    name: "Nisha & Vikram",
    image: "https://images.unsplash.com/photo-1617922701745-83e2ca454d3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4,
    text: "We were overwhelmed with wedding planning until we found Wedding Oasis. The app helped us connect with trusted vendors within our budget. The vendor reviews were accurate and helped us make the right choices.",
    date: "January 2024"
  }
];

const Testimonials = () => {
  return (
    <section className="wedding-section bg-wedding-red/5">
      <div className="wedding-container">
        <h2 className="wedding-section-title">Happy <span className="text-wedding-red">Couples</span></h2>
        <p className="wedding-section-subtitle">
          Read what couples have to say about their experience with our platform and vendors
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="wedding-card p-6 relative">
              <div className="absolute -top-4 -right-4 bg-wedding-red rounded-full p-2">
                <Quote className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-medium text-wedding-dark">{testimonial.name}</h3>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-wedding-gold fill-wedding-gold' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-3 italic">"{testimonial.text}"</p>
              <p className="text-sm text-gray-500">{testimonial.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
