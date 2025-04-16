
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-wedding-dark text-white/80 pt-16">
      <div className="wedding-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center mb-4">
              <Heart className="text-wedding-red h-6 w-6 mr-2" />
              <span className="text-xl font-playfair font-bold text-white">MakeMyMarriage</span>
            </div>
            <p className="mb-6">
              Transforming wedding planning into a hassle-free and enjoyable experience by connecting clients with trusted wedding vendors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-wedding-red transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-wedding-red transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-wedding-red transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-wedding-red transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-wedding-red transition-colors">Services</Link></li>
              <li><Link to="/vendors" className="hover:text-wedding-red transition-colors">Vendors</Link></li>
              <li><Link to="/about" className="hover:text-wedding-red transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-wedding-red transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Column 3 - For Vendors */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">For Vendors</h3>
            <ul className="space-y-3">
              <li><Link to="/list-your-service" className="hover:text-wedding-red transition-colors">Join as Vendor</Link></li>
              <li><Link to="/signin" className="hover:text-wedding-red transition-colors">Vendor Login</Link></li>
              <li><Link to="/list-your-service#pricing" className="hover:text-wedding-red transition-colors">Pricing Plans</Link></li>
              <li><Link to="/about#success-stories" className="hover:text-wedding-red transition-colors">Success Stories</Link></li>
              <li><Link to="/list-your-service#guidelines" className="hover:text-wedding-red transition-colors">Vendor Guidelines</Link></li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-wedding-red" />
                <span>1234 Wedding Street, New Delhi, 110001, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-wedding-red" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-wedding-red" />
                <span>info@makemymarriage.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 MakeMyMarriage. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="hover:text-wedding-red transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-wedding-red transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
