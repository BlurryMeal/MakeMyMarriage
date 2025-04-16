
import { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="wedding-container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Heart className="text-wedding-red h-7 w-7 mr-2" />
            <span className="text-xl md:text-2xl font-playfair font-bold">MakeMyMarriage</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-wedding-red transition-colors">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-wedding-red transition-colors">Services</Link>
            <Link to="/vendors" className="text-gray-700 hover:text-wedding-red transition-colors">Vendors</Link>
            <Link to="/about" className="text-gray-700 hover:text-wedding-red transition-colors">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-wedding-red transition-colors">Contact</Link>
            <Button className="bg-wedding-red hover:bg-wedding-red/90 ml-2" onClick={() => navigate('/signin')}>Sign In</Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <div className="flex flex-col space-y-4 py-2">
              <Link to="/" className="text-gray-700 hover:text-wedding-red transition-colors py-2">Home</Link>
              <Link to="/services" className="text-gray-700 hover:text-wedding-red transition-colors py-2">Services</Link>
              <Link to="/vendors" className="text-gray-700 hover:text-wedding-red transition-colors py-2">Vendors</Link>
              <Link to="/about" className="text-gray-700 hover:text-wedding-red transition-colors py-2">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-wedding-red transition-colors py-2">Contact</Link>
              <Button className="bg-wedding-red hover:bg-wedding-red/90 w-full" onClick={() => navigate('/signin')}>Sign In</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
