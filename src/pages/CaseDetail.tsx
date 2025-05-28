
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  UserPlus, 
  CheckCircle, 
  AlertTriangle, 
  MessageSquare,
  DollarSign
} from 'lucide-react';

const CaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [assignee, setAssignee] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [whistleblowerUpdate, setWhistleblowerUpdate] = useState('');
  const [rewardAmount, setRewardAmount] = useState('');
  const [queryContent, setQueryContent] = useState('');

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

  const { data: complaint } = useQuery({
    queryKey: ['complaint', id],
    queryFn: async () => {
      const { data } = await supabase
        .from('complaints')
        .select(`
          *,
          assigned_to_profile:assigned_to(full_name, email)
        `)
        .eq('id', id)
        .single();
      return data;
    },
    enabled: !!id,
  });

  const { data: investigators } = useQuery({
    queryKey: ['investigators'],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'investigator');
      return data || [];
    },
    enabled: profile?.role === 'ethics_officer' || profile?.role === 'ethics_admin',
  });

  const { data: updates } = useQuery({
    queryKey: ['complaint_updates', id],
    queryFn: async () => {
      const { data } = await supabase
        .from('complaint_updates')
        .select(`
          *,
          updated_by_profile:updated_by(full_name, email)
        `)
        .eq('complaint_id', id)
        .order('created_at', { ascending: false });
      return data || [];
    },
    enabled: !!id,
  });

  const assignCaseMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('complaints')
        .update({ 
          assigned_to: assignee,
          status: 'assigned'
        })
        .eq('id', id);
      
      if (error) throw error;

      // Add update record
      await supabase
        .from('complaint_updates')
        .insert({
          complaint_id: id,
          updated_by: user?.id,
          update_type: 'assignment',
          content: `Case assigned to investigator`
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaint', id] });
      queryClient.invalidateQueries({ queryKey: ['complaint_updates', id] });
      toast({ title: "Case assigned successfully" });
      setAssignee('');
    },
  });

  const resolveCaseMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('complaints')
        .update({
          status: 'resolved',
          resolution_notes: resolutionNotes,
          whistleblower_update: whistleblowerUpdate,
          reward_amount: rewardAmount ? parseFloat(rewardAmount) : 0
        })
        .eq('id', id);
      
      if (error) throw error;

      // Add update record
      await supabase
        .from('complaint_updates')
        .insert({
          complaint_id: id,
          updated_by: user?.id,
          update_type: 'resolution',
          content: resolutionNotes
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaint', id] });
      queryClient.invalidateQueries({ queryKey: ['complaint_updates', id] });
      toast({ title: "Case resolved successfully" });
      setResolutionNotes('');
      setWhistleblowerUpdate('');
      setRewardAmount('');
    },
  });

  const addQueryMutation = useMutation({
    mutationFn: async () => {
      await supabase
        .from('complaint_updates')
        .insert({
          complaint_id: id,
          updated_by: user?.id,
          update_type: 'query',
          content: queryContent,
          is_query: true
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaint_updates', id] });
      toast({ title: "Query sent to whistleblower" });
      setQueryContent('');
    },
  });

  const addNoteMutation = useMutation({
    mutationFn: async (note: string) => {
      await supabase
        .from('complaint_updates')
        .insert({
          complaint_id: id,
          updated_by: user?.id,
          update_type: 'investigation_note',
          content: note
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaint_updates', id] });
      toast({ title: "Note added successfully" });
    },
  });

  if (!complaint) return <div>Loading...</div>;

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

  const canAssign = profile?.role === 'ethics_officer' || profile?.role === 'ethics_admin';
  const canResolve = profile?.role === 'ethics_officer' || profile?.role === 'ethics_admin';
  const canQuery = profile?.role === 'investigator';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{complaint.report_id}</h1>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className={getStatusColor(complaint.status)}>
                  {complaint.status.replace('_', ' ')}
                </Badge>
                <span className="text-gray-500">Created: {new Date(complaint.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            {complaint.reward_amount > 0 && (
              <Badge variant="outline" className="text-green-600">
                <DollarSign className="h-4 w-4 mr-1" />
                ${complaint.reward_amount}
              </Badge>
            )}
          </div>
        </div>

        {/* Case Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{complaint.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-gray-700">{complaint.summary}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Category</h3>
                  <p className="text-gray-700">{complaint.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Assigned To</h3>
                  <p className="text-gray-700">
                    {complaint.assigned_to_profile?.full_name || 'Unassigned'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Assign Case */}
          {canAssign && complaint.status === 'open' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Assign Case
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={assignee} onValueChange={setAssignee}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select investigator" />
                  </SelectTrigger>
                  <SelectContent>
                    {investigators?.map((investigator) => (
                      <SelectItem key={investigator.id} value={investigator.id}>
                        {investigator.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={() => assignCaseMutation.mutate()}
                  disabled={!assignee || assignCaseMutation.isPending}
                  className="w-full"
                >
                  Assign Case
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Query Whistleblower */}
          {canQuery && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Query Whistleblower
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Ask for additional information..."
                  value={queryContent}
                  onChange={(e) => setQueryContent(e.target.value)}
                />
                <Button 
                  onClick={() => addQueryMutation.mutate()}
                  disabled={!queryContent || addQueryMutation.isPending}
                  className="w-full"
                >
                  Send Query
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Resolve Case */}
        {canResolve && complaint.status !== 'resolved' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Resolve Case
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Resolution Notes (Internal)</label>
                <Textarea
                  placeholder="Internal resolution details..."
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Whistleblower Update</label>
                <Textarea
                  placeholder="Message to whistleblower..."
                  value={whistleblowerUpdate}
                  onChange={(e) => setWhistleblowerUpdate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Reward Amount ($)</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={rewardAmount}
                  onChange={(e) => setRewardAmount(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => resolveCaseMutation.mutate()}
                disabled={!resolutionNotes || resolveCaseMutation.isPending}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Resolve Case
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Updates Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Case Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {updates?.map((update) => (
                <div key={update.id} className="border-l-2 border-gray-200 pl-4 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{update.updated_by_profile?.full_name}</span>
                      <Badge variant="outline">{update.update_type.replace('_', ' ')}</Badge>
                      {update.is_query && <Badge variant="destructive">Query</Badge>}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(update.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{update.content}</p>
                </div>
              ))}
              
              {updates?.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No updates yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaseDetail;
