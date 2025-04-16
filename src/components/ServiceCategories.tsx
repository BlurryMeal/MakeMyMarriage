
import { Camera, Music, Utensils, MapPin, Sparkles, Cake, Gift, Palette, Flower, Lightbulb, Lamp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Venues",
    icon: MapPin,
    description: "Wedding halls, banquet spaces, and outdoor locations",
    count: 450,
    color: "bg-rose-100",
    category: "venues"
  },
  {
    id: 2,
    name: "Photography",
    icon: Camera,
    description: "Photographers and videographers for all ceremonies",
    count: 380,
    color: "bg-amber-100",
    category: "photography"
  },
  {
    id: 3,
    name: "Catering",
    icon: Utensils,
    description: "Caterers for diverse menus and cuisines",
    count: 320,
    color: "bg-teal-100",
    category: "catering"
  },
  {
    id: 4,
    name: "Decorations",
    icon: Palette,
    description: "Transform your venue with beautiful decor and floral arrangements",
    count: 285,
    color: "bg-purple-100",
    category: "decor"
  },
  {
    id: 5,
    name: "Entertainment",
    icon: Music,
    description: "DJs, musicians, and performance artists",
    count: 210,
    color: "bg-blue-100",
    category: "entertainment"
  },
  {
    id: 6,
    name: "Cakes",
    icon: Cake,
    description: "Custom wedding cakes and desserts",
    count: 180,
    color: "bg-pink-100",
    category: "cakes"
  },
  {
    id: 7,
    name: "Gifts",
    icon: Gift,
    description: "Wedding favors and gift registry services",
    count: 155,
    color: "bg-orange-100",
    category: "gifts"
  },
  {
    id: 8,
    name: "Sparkles",
    icon: Sparkles,
    description: "Lighting solutions, sparklers, and special effects for your venue",
    count: 120,
    color: "bg-green-100",
    category: "sparkles"
  }
];

const ServiceCategories = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (category) => {
    navigate(`/vendors?category=${category}`);
  };

  return (
    <section id="services" className="wedding-section bg-wedding-ivory/50">
      <div className="wedding-container">
        <h2 className="wedding-section-title">Explore <span className="text-wedding-red">Services</span></h2>
        <p className="wedding-section-subtitle">
          Browse through our comprehensive range of wedding services to find everything you need for your special day
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="wedding-card group hover:border-wedding-red cursor-pointer"
              onClick={() => handleCategoryClick(category.category)}
            >
              <div className={`p-6 flex flex-col items-center text-center ${category.color}`}>
                <div className="bg-white p-4 rounded-full mb-4 shadow-sm group-hover:bg-wedding-red transition-colors">
                  <category.icon className="w-8 h-8 text-wedding-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <span className="text-xs text-wedding-red font-medium">{category.count}+ Vendors</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
