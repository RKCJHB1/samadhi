import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import PageLayout from '@/components/layout/PageLayout';
import { Users, Settings, BookOpen, ChevronDown } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminNav from '@/components/admin/AdminNav';

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample users data
  const users = [
    { id: 1, name: 'Ananya Patel', email: 'ananya@example.com', role: 'student', status: 'active' },
    { id: 2, name: 'Dr. Suresh Gupta', email: 'suresh@example.com', role: 'teacher', status: 'active' },
    { id: 3, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'student', status: 'inactive' },
    { id: 4, name: 'Priya Singh', email: 'priya@example.com', role: 'student', status: 'active' },
    { id: 5, name: 'Dr. Meena Verma', email: 'meena@example.com', role: 'teacher', status: 'active' },
  ];

  // Sample courses data
  const courses = [
    { id: 1, title: 'Introduction to Vedanta', instructor: 'Dr. Suresh Gupta', students: 24, status: 'Active' },
    { id: 2, title: 'Sanskrit Fundamentals', instructor: 'Dr. Meena Verma', students: 18, status: 'Active' },
    { id: 3, title: 'History of Hinduism', instructor: 'Dr. Suresh Gupta', students: 32, status: 'Active' },
    { id: 4, title: 'Bhagavad Gita Studies', instructor: 'Dr. Meena Verma', students: 15, status: 'Draft' },
  ];

  return (
    <PageLayout title="Admin Dashboard">
      <AdminNav />
      <div className="min-h-screen w-full bg-gradient-to-br from-indian-cream to-white p-4 sm:p-8">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage users, courses, and system settings</p>
            </div>
            <Button className="mt-4 md:mt-0" variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-indian-cream to-white shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">74</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Total Users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">60</span> Students, <span className="font-medium">8</span> Teachers, <span className="font-medium">6</span> Admins
                  </div>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-indian-cream to-white shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">12</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Active Courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">3</span> New this month
                  </div>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-indian-cream to-white shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">85%</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">System Utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Server performance optimal
                  </div>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="bg-muted p-1 rounded-lg">
              <TabsTrigger value="users" className="rounded px-4 py-2">Users</TabsTrigger>
              <TabsTrigger value="courses" className="rounded px-4 py-2">Courses</TabsTrigger>
              <TabsTrigger value="settings" className="rounded px-4 py-2">System Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
              <Card className="bg-gradient-to-br from-indian-cream to-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">User Management</CardTitle>
                  <CardDescription>Manage all users in the system</CardDescription>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Input 
                      placeholder="Search users..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-sm bg-white"
                    />
                    <div className="flex flex-wrap gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] bg-white">
                          <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="student">Students</SelectItem>
                          <SelectItem value="teacher">Teachers</SelectItem>
                          <SelectItem value="admin">Admins</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" className="bg-white">
                        <ChevronDown className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <Button className="bg-indian-saffron hover:bg-indian-saffron/90 text-white">Add User</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-medium">Name</TableHead>
                        <TableHead className="font-medium">Email</TableHead>
                        <TableHead className="font-medium">Role</TableHead>
                        <TableHead className="font-medium">Status</TableHead>
                        <TableHead className="text-right font-medium">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map(user => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              user.role === 'teacher' 
                                ? 'bg-blue-100 text-blue-800 border-blue-200' 
                                : user.role === 'admin'
                                  ? 'bg-purple-100 text-purple-800 border-purple-200'
                                  : 'bg-gray-100 text-gray-800 border-gray-200'
                            }>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              user.status === 'active' 
                                ? 'bg-green-100 text-green-800 border-green-200' 
                                : 'bg-red-100 text-red-800 border-red-200'
                            }>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="hover:bg-gray-100">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courses">
              <Card className="bg-gradient-to-br from-indian-cream to-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Course Management</CardTitle>
                  <CardDescription>Manage all courses in the system</CardDescription>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Input 
                      placeholder="Search courses..." 
                      className="max-w-sm bg-white"
                    />
                    <div className="flex flex-wrap gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] bg-white">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" className="bg-white">
                        <ChevronDown className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <Button className="bg-indian-saffron hover:bg-indian-saffron/90 text-white">Add Course</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-medium">Title</TableHead>
                        <TableHead className="font-medium">Instructor</TableHead>
                        <TableHead className="font-medium">Students</TableHead>
                        <TableHead className="font-medium">Status</TableHead>
                        <TableHead className="text-right font-medium">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map(course => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.title}</TableCell>
                          <TableCell>{course.instructor}</TableCell>
                          <TableCell>{course.students}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              course.status === 'Active' 
                                ? 'bg-green-100 text-green-800 border-green-200' 
                                : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            }>
                              {course.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="hover:bg-gray-100">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card className="bg-gradient-to-br from-indian-cream to-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">System Settings</CardTitle>
                  <CardDescription>Configure system-wide settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Settings content coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;
