
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const startVapiCall = () => {
    if (typeof window !== 'undefined' && window.vapi) {
      window.vapi.start("bb8029bb-dde6-485a-9c32-d41b684568ff");
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="font-montserrat text-2xl font-bold text-aegis-blue">Aegis<span className="text-aegis-accent">Whistle</span></span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors">Home</Link>
          <Link to="/#features" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors">Features</Link>
          <Link to="/#how-it-works" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors">How it Works</Link>
          <Link to="/#silence-costs" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors">Why It Matters</Link>
          <Link to="/#unsilenced-voice" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors">Your Voice</Link>
          <a href="https://openefficiency.org/" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors">About Us</a>
          <a href="https://openefficiency.org/" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors">Contact</a>
          <a href="https://openefficiency.org/" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors">Careers</a>
          <Link to="/admin" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors">Team Aegis</Link>
          <Button 
            onClick={startVapiCall}
            className="bg-aegis-accent hover:bg-aegis-blue text-white"
          >
            Start Your Secure Report
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 px-6 absolute top-16 left-0 w-full shadow-md animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/#features" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors" onClick={() => setIsOpen(false)}>Features</Link>
            <Link to="/#how-it-works" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors" onClick={() => setIsOpen(false)}>How it Works</Link>
            <Link to="/#silence-costs" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors" onClick={() => setIsOpen(false)}>Why It Matters</Link>
            <Link to="/#unsilenced-voice" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors" onClick={() => setIsOpen(false)}>Your Voice</Link>
            <a href="https://openefficiency.org/" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors">About Us</a>
            <a href="https://openefficiency.org/" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors">Contact</a>
            <a href="https://openefficiency.org/" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors">Careers</a>
            <Link to="/admin" className="font-medium text-gray-700 hover:text-aegis-accent transition-colors" onClick={() => setIsOpen(false)}>Team Aegis</Link>
            <Button 
              onClick={startVapiCall}
              className="bg-aegis-accent hover:bg-aegis-blue text-white w-full"
            >
              Start Your Secure Report
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
