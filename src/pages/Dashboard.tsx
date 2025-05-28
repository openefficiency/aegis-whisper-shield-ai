
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  CheckCircle, 
  DollarSign, 
  Clock,
  User,
  FileText,
  Users
} from 'lucide-react';

const Dashboard = () => {
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

  const { data: complaints } = useQuery({
    queryKey: ['complaints'],
    queryFn: async () => {
      const { data } = await supabase
        .from('complaints')
        .select(`
          *,
          assigned_to_profile:assigned_to(full_name, email)
        `);
      return data || [];
    },
    enabled: !!user && !!profile,
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || !profile) {
    return <div>Loading...</div>;
  }

  if (profile.role === 'whistleblower') {
    navigate('/');
    return null;
  }

  const openComplaints = complaints?.filter(c => c.status === 'open') || [];
  const resolvedComplaints = complaints?.filter(c => c.status === 'resolved') || [];
  const totalRewards = resolvedComplaints.reduce((sum, c) => sum + (c.reward_amount || 0), 0);
  const assignedToMe = complaints?.filter(c => c.assigned_to === user.id) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'under_investigation': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {profile.role === 'ethics_admin' ? 'Ethics Admin' : 
             profile.role === 'ethics_officer' ? 'Ethics Officer' : 
             'Investigator'} Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {profile.full_name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Complaints</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{openComplaints.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved Cases</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resolvedComplaints.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rewards Issued</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRewards.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {profile.role === 'investigator' ? 'Assigned to Me' : 'Total Cases'}
              </CardTitle>
              <User className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {profile.role === 'investigator' ? assignedToMe.length : complaints?.length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ethics Admin Features */}
        {profile.role === 'ethics_admin' && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Admin Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => navigate('/user-management')}
                    className="bg-aegis-blue hover:bg-aegis-accent"
                  >
                    User Management
                  </Button>
                  <Button 
                    onClick={() => navigate('/invite-users')}
                    variant="outline"
                    className="border-aegis-blue text-aegis-blue hover:bg-aegis-blue hover:text-white"
                  >
                    Invite Team Members
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Complaints List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              {profile.role === 'investigator' ? 'My Cases' : 'All Complaints'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(profile.role === 'investigator' ? assignedToMe : complaints)?.map((complaint) => (
                <div 
                  key={complaint.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/case/${complaint.id}`)}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{complaint.report_id}</span>
                      <Badge className={getStatusColor(complaint.status)}>
                        {complaint.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg">{complaint.title}</h3>
                    <p className="text-gray-600 text-sm">{complaint.summary}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Category: {complaint.category}</span>
                      <span>Created: {new Date(complaint.created_at).toLocaleDateString()}</span>
                      {complaint.assigned_to_profile && (
                        <span>Assigned to: {complaint.assigned_to_profile.full_name}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {complaint.reward_amount > 0 && (
                      <Badge variant="outline" className="text-green-600">
                        ${complaint.reward_amount}
                      </Badge>
                    )}
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
              
              {((profile.role === 'investigator' ? assignedToMe : complaints) || []).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No complaints found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
