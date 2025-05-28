
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },
  });

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      return data;
    },
    enabled: !!user?.id,
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleTeamAegisLogin = () => {
    navigate('/login');
  };

  const handleFollowUp = () => {
    navigate('/followup');
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="font-montserrat text-2xl font-bold text-aegis-blue">
              Aegis<span className="text-aegis-accent">Whistle</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Button 
                onClick={handleFollowUp}
                variant="outline"
                className="border-aegis-blue text-aegis-blue hover:bg-aegis-blue hover:text-white"
              >
                Follow-up Report
              </Button>
              <Button 
                onClick={handleTeamAegisLogin}
                variant="outline"
                className="border-aegis-blue text-aegis-blue hover:bg-aegis-blue hover:text-white"
              >
                Team Aegis Login
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              {profile?.role === 'whistleblower' && (
                <Button 
                  onClick={handleFollowUp}
                  variant="outline"
                  className="border-aegis-blue text-aegis-blue hover:bg-aegis-blue hover:text-white"
                >
                  Follow-up Report
                </Button>
              )}
              {(profile?.role === 'ethics_officer' || profile?.role === 'investigator' || profile?.role === 'ethics_admin') && (
                <Button 
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  className="border-aegis-blue text-aegis-blue hover:bg-aegis-blue hover:text-white"
                >
                  Dashboard
                </Button>
              )}
              <span className="text-sm text-gray-600">
                {profile?.full_name || profile?.email}
              </span>
              <Button 
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
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
            {!user ? (
              <>
                <Button 
                  onClick={handleFollowUp}
                  variant="outline"
                  className="border-aegis-blue text-aegis-blue hover:bg-aegis-blue hover:text-white w-full"
                >
                  Follow-up Report
                </Button>
                <Button 
                  onClick={handleTeamAegisLogin}
                  variant="outline"
                  className="border-aegis-blue text-aegis-blue hover:bg-aegis-blue hover:text-white w-full"
                >
                  Team Aegis Login
                </Button>
              </>
            ) : (
              <>
                {profile?.role === 'whistleblower' && (
                  <Button 
                    onClick={handleFollowUp}
                    variant="outline"
                    className="border-aegis-blue text-aegis-blue hover:bg-aegis-blue hover:text-white w-full"
                  >
                    Follow-up Report
                  </Button>
                )}
                {(profile?.role === 'ethics_officer' || profile?.role === 'investigator' || profile?.role === 'ethics_admin') && (
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    variant="outline"
                    className="border-aegis-blue text-aegis-blue hover:bg-aegis-blue hover:text-white w-full"
                  >
                    Dashboard
                  </Button>
                )}
                <Button 
                  onClick={handleSignOut}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
