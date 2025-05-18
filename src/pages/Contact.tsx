
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-montserrat text-4xl font-bold text-aegis-blue mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 mb-8">
              Have questions about AegisWhistle? We're here to help. Fill out the form below, and our team will get back to you shortly.
            </p>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-lg mb-2">Thank you for contacting us!</h3>
                <p>We have received your message and will respond as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium text-gray-700">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-aegis-accent hover:bg-aegis-blue text-white w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-10">
              <div>
                <h3 className="font-montserrat text-xl font-bold text-aegis-blue mb-3">Our Office</h3>
                <address className="not-italic text-gray-600">
                  AegisWhistle Headquarters<br />
                  123 Transparency Avenue<br />
                  San Francisco, CA 94105<br />
                  United States
                </address>
              </div>
              
              <div>
                <h3 className="font-montserrat text-xl font-bold text-aegis-blue mb-3">Contact Information</h3>
                <p className="text-gray-600">
                  Email: <a href="mailto:info@aegiswhistle.com" className="text-aegis-accent hover:underline">info@aegiswhistle.com</a><br />
                  Phone: <a href="tel:+14155551234" className="text-aegis-accent hover:underline">+1 (415) 555-1234</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
