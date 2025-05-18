
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shield, MessageSquare, Link } from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const recentReports = [
    {
      id: "WR-2023-0124",
      title: "Financial Statement Manipulation",
      date: "2025-05-16",
      status: "In Review",
      severity: "High",
      department: "Finance"
    },
    {
      id: "WR-2023-0123",
      title: "Vendor Kickback Scheme",
      date: "2025-05-14",
      status: "Under Investigation",
      severity: "Medium",
      department: "Procurement"
    },
    {
      id: "WR-2023-0122",
      title: "Data Privacy Breach",
      date: "2025-05-12",
      status: "Resolved",
      severity: "High",
      department: "IT"
    },
    {
      id: "WR-2023-0121",
      title: "Timesheet Fraud",
      date: "2025-05-10",
      status: "Confirmed",
      severity: "Low",
      department: "HR"
    },
    {
      id: "WR-2023-0120",
      title: "Workplace Harassment",
      date: "2025-05-08",
      status: "Pending Review",
      severity: "Medium",
      department: "Operations"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-aegis-blue mb-8">Admin Dashboard</h1>
          
          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                    <Shield className="h-4 w-4 text-aegis-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">257</div>
                    <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Investigations</CardTitle>
                    <MessageSquare className="h-4 w-4 text-aegis-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">7 high priority</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Blockchain Records</CardTitle>
                    <Link className="h-4 w-4 text-aegis-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,024</div>
                    <p className="text-xs text-muted-foreground">100% tamper-proof</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>
                    Recent whistleblower submissions requiring attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">ID</th>
                          <th className="text-left py-3 px-2">Title</th>
                          <th className="text-left py-3 px-2">Department</th>
                          <th className="text-left py-3 px-2">Date</th>
                          <th className="text-left py-3 px-2">Severity</th>
                          <th className="text-left py-3 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentReports.map((report) => (
                          <tr key={report.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-2">{report.id}</td>
                            <td className="py-3 px-2">{report.title}</td>
                            <td className="py-3 px-2">{report.department}</td>
                            <td className="py-3 px-2">{report.date}</td>
                            <td className="py-3 px-2">
                              <Badge 
                                variant="outline" 
                                className={`
                                  ${report.severity === 'High' ? 'border-red-500 text-red-500' : ''}
                                  ${report.severity === 'Medium' ? 'border-yellow-500 text-yellow-500' : ''}
                                  ${report.severity === 'Low' ? 'border-green-500 text-green-500' : ''}
                                `}
                              >
                                {report.severity}
                              </Badge>
                            </td>
                            <td className="py-3 px-2">
                              <Badge 
                                variant="outline"
                                className={`
                                  ${report.status === 'In Review' || report.status === 'Pending Review' ? 'border-blue-500 text-blue-500' : ''}
                                  ${report.status === 'Under Investigation' ? 'border-purple-500 text-purple-500' : ''}
                                  ${report.status === 'Confirmed' ? 'border-orange-500 text-orange-500' : ''}
                                  ${report.status === 'Resolved' ? 'border-green-500 text-green-500' : ''}
                                `}
                              >
                                {report.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>All Reports</CardTitle>
                  <CardDescription>
                    Complete database of whistleblower reports with investigation status
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-10">
                  <p className="text-muted-foreground">This is a demonstration dashboard. In a real implementation, this tab would contain a full searchable table of all reports with filtering and detailed views.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Insights</CardTitle>
                  <CardDescription>
                    Trend analysis and reporting metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-10">
                  <p className="text-muted-foreground">This is a demonstration dashboard. In a real implementation, this tab would contain charts, graphs, and analytics visualizations of whistleblowing data and trends.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Settings</CardTitle>
                  <CardDescription>
                    Manage your dashboard preferences and access controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-10">
                  <p className="text-muted-foreground">This is a demonstration dashboard. In a real implementation, this tab would contain settings for notifications, user permissions, and dashboard customization.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
