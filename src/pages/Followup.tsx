
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Search, Clock, CheckCircle, DollarSign } from 'lucide-react';

const Followup = () => {
  const [reportId, setReportId] = useState('');
  const [searchedReportId, setSearchedReportId] = useState('');

  const { data: complaint } = useQuery({
    queryKey: ['complaint_followup', searchedReportId],
    queryFn: async () => {
      if (!searchedReportId) return null;
      const { data } = await supabase
        .from('complaints')
        .select('*')
        .eq('report_id', searchedReportId)
        .single();
      return data;
    },
    enabled: !!searchedReportId,
  });

  const { data: updates } = useQuery({
    queryKey: ['complaint_updates_followup', complaint?.id],
    queryFn: async () => {
      if (!complaint?.id) return [];
      const { data } = await supabase
        .from('complaint_updates')
        .select(`
          *,
          updated_by_profile:updated_by(full_name)
        `)
        .eq('complaint_id', complaint.id)
        .eq('is_query', true)
        .order('created_at', { ascending: false });
      return data || [];
    },
    enabled: !!complaint?.id,
  });

  const handleSearch = () => {
    setSearchedReportId(reportId.trim());
  };

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

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'open': return 'Your report has been received and is awaiting review.';
      case 'assigned': return 'Your report has been assigned to an investigator.';
      case 'under_investigation': return 'Your report is currently under investigation.';
      case 'resolved': return 'Your report has been resolved.';
      case 'escalated': return 'Your report has been escalated to higher management.';
      default: return 'Status unknown.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Follow-up on Your Report</h1>
          <p className="text-gray-600">
            Enter your report ID to check the status of your whistleblower complaint.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search Your Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Enter your report ID (e.g., WR-2024-0001)"
                value={reportId}
                onChange={(e) => setReportId(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={!reportId.trim()}>
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {searchedReportId && (
          <>
            {complaint ? (
              <div className="space-y-6">
                {/* Case Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Report Status: {complaint.report_id}</span>
                      <Badge className={getStatusColor(complaint.status)}>
                        {complaint.status.replace('_', ' ')}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Current Status</h3>
                        <p className="text-gray-700">{getStatusMessage(complaint.status)}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Submitted: {new Date(complaint.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        
                        {complaint.status === 'resolved' && (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">
                              Resolved: {new Date(complaint.updated_at).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        
                        {complaint.reward_amount > 0 && (
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">
                              Reward: ${complaint.reward_amount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Case Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Case Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Title</h3>
                        <p className="text-gray-700">{complaint.title}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Category</h3>
                        <p className="text-gray-700">{complaint.category}</p>
                      </div>
                      {complaint.whistleblower_update && (
                        <div>
                          <h3 className="font-semibold mb-2">Update for You</h3>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-blue-800">{complaint.whistleblower_update}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Investigator Queries */}
                {updates && updates.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Questions from Investigators</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {updates.map((update) => (
                          <div key={update.id} className="border-l-4 border-yellow-400 pl-4 py-2">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-yellow-800">
                                Question from Investigator
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(update.created_at).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-gray-700">{update.content}</p>
                            <div className="mt-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-aegis-blue text-aegis-blue hover:bg-aegis-blue hover:text-white"
                                onClick={() => {
                                  if (typeof window !== 'undefined' && window.vapi) {
                                    window.vapi.start("bb8029bb-dde6-485a-9c32-d41b684568ff");
                                  }
                                }}
                              >
                                Respond via Voice
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Reward Information */}
                {complaint.status === 'resolved' && complaint.reward_amount > 0 && (
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-green-800">Reward Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-green-700">
                        <p className="mb-2">
                          <strong>Congratulations!</strong> Your report has been resolved and you have been awarded a reward.
                        </p>
                        <p className="text-2xl font-bold">${complaint.reward_amount}</p>
                        <p className="text-sm mt-2">
                          Reward will be processed through secure cryptocurrency transfer to maintain your anonymity.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">
                    No report found with ID: <strong>{searchedReportId}</strong>
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Please check your report ID and try again.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Followup;
