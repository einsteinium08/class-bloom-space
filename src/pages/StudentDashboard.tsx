
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle, Clock, Star, Award, TrendingUp } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useAssignments } from '@/contexts/AssignmentContext';
import Navigation from '@/components/Navigation';
import AssignmentCard from '@/components/AssignmentCard';

const StudentDashboard = () => {
  const { user } = useUser();
  const { assignments, announcements } = useAssignments();

  const pendingAssignments = assignments.filter(a => a.status === 'pending');
  const submittedAssignments = assignments.filter(a => a.status === 'submitted');
  const gradedAssignments = assignments.filter(a => a.status === 'graded');
  
  const completionRate = assignments.length > 0 
    ? Math.round(((submittedAssignments.length + gradedAssignments.length) / assignments.length) * 100)
    : 0;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Hello, {user.name}! 🌟
          </h1>
          <p className="text-gray-600">
            Ready to continue your learning journey today?
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Completed</p>
                  <p className="text-2xl font-bold text-green-800">{submittedAssignments.length + gradedAssignments.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Pending</p>
                  <p className="text-2xl font-bold text-orange-800">{pendingAssignments.length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Completion Rate</p>
                  <p className="text-2xl font-bold text-purple-800">{completionRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Achievements</p>
                  <p className="text-2xl font-bold text-blue-800">5</p>
                </div>
                <Award className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assignments Section */}
          <div className="lg:col-span-2">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                  Your Assignments
                </CardTitle>
                <CardDescription>
                  Stay on top of your homework and projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No assignments available yet. Check back soon!</p>
                  </div>
                ) : (
                  assignments.map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      isTeacher={false}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Motivational Card */}
            <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Keep Going! 
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90 mb-4">
                  You're doing amazing! {completionRate}% completion rate shows your dedication.
                </p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                    🏆 On Track
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                    ⭐ Star Student
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Announcements */}
            <Card>
              <CardHeader>
                <CardTitle>📢 Classroom Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {announcements.slice(0, 3).map((announcement) => (
                    <div key={announcement.id} className="border-l-4 border-indigo-600 pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{announcement.title}</h4>
                        {announcement.pinned && (
                          <Badge variant="secondary" className="text-xs">📌</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {announcement.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        by {announcement.createdBy}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievement Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  Your Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl mb-1">🏅</div>
                    <div className="text-xs font-medium">Early Bird</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-1">📚</div>
                    <div className="text-xs font-medium">Bookworm</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-xs font-medium">Quick Learner</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
