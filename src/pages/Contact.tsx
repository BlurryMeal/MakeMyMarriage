import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://tramway.proxy.rlwy.net/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
      if (result.success) {
        alert('Thank you! Your message has been saved.');
        setFormData({
          name: '', email: '', phone: '', subject: '', message: ''
        });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send message. Please try again.');
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 py-12">
        <div className="wedding-container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our services? Want to learn more about how MakeMyMarriage can help with your wedding planning? Reach out to us!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                <h2 className="text-2xl font-bold font-playfair mb-6">Get in Touch</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-wedding-red hover:bg-wedding-red/90"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold font-playfair mb-6">FAQs</h2>
                <div className="space-y-4">
                  {[
                    { q: "How do I list my services as a vendor?", a: "You can register as a vendor by clicking on 'List Your Services' button, completing the required information, and submitting your profile for review." },
                    { q: "Is there a fee to join MakeMyMarriage?", a: "Creating an account as a couple is completely free. For vendors, we offer both free and premium listing options with different features." },
                    { q: "How can I contact a vendor?", a: "Once you create an account, you can directly message vendors through our platform or request their contact information." },
                  ].map((faq, index) => (
                    <div key={index} className="border-b pb-4">
                      <h3 className="font-medium mb-2">{faq.q}</h3>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="link" 
                  className="mt-4 p-0 text-wedding-red"
                >
                  View All FAQs
                </Button>
              </div>
            </div>
            
            <div>
              <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                <h2 className="text-2xl font-bold font-playfair mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-wedding-red/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-wedding-red" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Our Office</h3>
                      <p className="text-gray-600">
                        123 Wedding Plaza, 5th Floor<br />
                        Connaught Place, New Delhi 110001<br />
                        India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-wedding-red/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-wedding-red" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone Number</h3>
                      <p className="text-gray-600">
                        +91 11 4567 8901<br />
                        +91 98765 43210 (WhatsApp)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-wedding-red/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-wedding-red" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email Address</h3>
                      <p className="text-gray-600">
                        info@makemymarriage.com<br />
                        support@makemymarriage.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-wedding-red/10 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-wedding-red" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 7:00 PM<br />
                        Saturday: 10:00 AM - 5:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold font-playfair mb-6">Connect With Us</h2>
                <div className="flex space-x-4 mb-6">
                  {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map((social) => (
                    <a 
                      key={social} 
                      href="#" 
                      className="bg-gray-100 hover:bg-wedding-red/10 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                    >
                      <img 
                        src={`https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/${social}.svg`} 
                        alt={social} 
                        className="h-5 w-5 opacity-70"
                      />
                    </a>
                  ))}
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex items-center mb-4">
                    <MessageSquare className="h-6 w-6 text-wedding-red mr-3" />
                    <h3 className="font-medium">Live Chat Support</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Our customer support team is available for live chat during business hours.
                  </p>
                  <Button className="w-full bg-wedding-red hover:bg-wedding-red/90">
                    Start Live Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
