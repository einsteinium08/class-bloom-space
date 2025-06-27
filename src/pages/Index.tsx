
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Users, BookOpen, Star } from 'lucide-react';
import { useUser, UserRole } from '@/contexts/UserContext';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleLogin = () => {
    if (!name.trim() || !email.trim() || !selectedRole) {
      toast({
        title: "Please fill in all fields",
        description: "We need your name, email, and role to get started!",
        variant: "destructive"
      });
      return;
    }

    const user = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      role: selectedRole
    };

    setUser(user);
    
    toast({
      title: `Welcome, ${name}! 🎉`,
      description: `You're all set as a ${selectedRole}. Let's start learning!`,
    });

    // Navigate to appropriate dashboard
    navigate(selectedRole === 'teacher' ? '/teacher' : '/student');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">ClassConnect</h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">Your Digital Classroom Experience</p>
          <p className="text-sm text-gray-500">A warm, welcoming space for learning and growth</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Role Selection */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-indigo-600" />
                Choose Your Role
              </CardTitle>
              <CardDescription>
                Select whether you're joining as a teacher or student
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant={selectedRole === 'teacher' ? 'default' : 'outline'}
                className="w-full justify-start h-auto p-4"
                onClick={() => handleRoleSelect('teacher')}
              >
                <div className="text-left">
                  <div className="font-semibold flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Teacher
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Create assignments, manage classroom, track progress
                  </div>
                </div>
              </Button>
              
              <Button
                variant={selectedRole === 'student' ? 'default' : 'outline'}
                className="w-full justify-start h-auto p-4"
                onClick={() => handleRoleSelect('student')}
              >
                <div className="text-left">
                  <div className="font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Student
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    View assignments, submit work, track your progress
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* User Details */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Tell Us About Yourself</CardTitle>
              <CardDescription>
                Help us personalize your classroom experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enter Classroom Button */}
        <div className="text-center">
          <Button
            onClick={handleLogin}
            size="lg"
            className="px-12 py-3 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all"
            disabled={!selectedRole || !name.trim() || !email.trim()}
          >
            Enter Your Classroom 🚀
          </Button>
        </div>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Smart Assignments</h3>
            <p className="text-sm text-gray-600">Easy to create, submit, and track</p>
          </div>
          
          <div className="p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Live Classroom Board</h3>
            <p className="text-sm text-gray-600">Stay connected with announcements</p>
          </div>
          
          <div className="p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Progress Tracking</h3>
            <p className="text-sm text-gray-600">Watch your learning journey unfold</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
