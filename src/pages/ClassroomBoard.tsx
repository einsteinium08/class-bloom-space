
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pin, MessageSquare, Calendar, Users } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useAssignments } from '@/contexts/AssignmentContext';
import Navigation from '@/components/Navigation';
import { toast } from '@/hooks/use-toast';

const ClassroomBoard = () => {
  const { user, isTeacher } = useUser();
  const { announcements, addAnnouncement } = useAssignments();
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleAddAnnouncement = () => {
    if (!title.trim() || !message.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both title and message are required",
        variant: "destructive"
      });
      return;
    }

    addAnnouncement({
      title: title.trim(),
      message: message.trim(),
      createdAt: new Date(),
      createdBy: user?.name || 'Unknown',
      pinned: false
    });

    toast({
      title: "Announcement posted! 📢",
      description: "Your message has been shared with the class",
    });

    setTitle('');
    setMessage('');
    setShowAddForm(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <MessageSquare className="h-8 w-8 mr-3 text-indigo-600" />
            Classroom Board
          </h1>
          <p className="text-gray-600">
            Stay connected with the latest classroom updates and announcements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Announcements */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Class Announcements</CardTitle>
                    <CardDescription>
                      Important updates and messages from your teachers
                    </CardDescription>
                  </div>
                  {isTeacher && (
                    <Button 
                      onClick={() => setShowAddForm(!showAddForm)}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Add Announcement Form */}
                {showAddForm && isTeacher && (
                  <Card className="mb-6 border-indigo-200 bg-indigo-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Create New Announcement</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        placeholder="Announcement title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <Textarea
                        placeholder="Write your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                      />
                      <div className="flex space-x-2">
                        <Button onClick={handleAddAnnouncement}>
                          Post Announcement
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowAddForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Announcements List */}
                <div className="space-y-4">
                  {announcements.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium mb-2">No announcements yet</h3>
                      <p>Check back later for updates from your teachers!</p>
                    </div>
                  ) : (
                    announcements
                      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                      .map((announcement) => (
                        <Card 
                          key={announcement.id} 
                          className={`hover:shadow-md transition-shadow ${
                            announcement.pinned ? 'border-yellow-300 bg-yellow-50' : ''
                          }`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                {announcement.pinned && (
                                  <Pin className="h-4 w-4 text-yellow-600" />
                                )}
                                <h3 className="font-semibold text-lg text-gray-800">
                                  {announcement.title}
                                </h3>
                                {announcement.pinned && (
                                  <Badge variant="secondary" className="bg-yellow-200 text-yellow-800">
                                    Pinned
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                {formatDate(announcement.createdAt)}
                              </div>
                            </div>
                            
                            <p className="text-gray-700 mb-4 leading-relaxed">
                              {announcement.message}
                            </p>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                Posted by {announcement.createdBy}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Posts</span>
                    <Badge variant="secondary">{announcements.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pinned Posts</span>
                    <Badge variant="secondary">
                      {announcements.filter(a => a.pinned).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Week</span>
                    <Badge variant="secondary">
                      {announcements.filter(a => 
                        new Date().getTime() - a.createdAt.getTime() < 7 * 24 * 60 * 60 * 1000
                      ).length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Classroom Guidelines */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">📋 Board Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Check the board daily for important updates</li>
                  <li>• Pinned posts contain urgent information</li>
                  <li>• Ask questions if anything is unclear</li>
                  <li>• Keep discussions respectful and helpful</li>
                </ul>
              </CardContent>
            </Card>

            {/* Fun Fact */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">💡 Did You Know?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-700">
                  Students who regularly check classroom announcements perform 23% better on assignments!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomBoard;
