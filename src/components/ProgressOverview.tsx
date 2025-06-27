
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
import { useAssignments } from '@/contexts/AssignmentContext';

const ProgressOverview = () => {
  const { assignments } = useAssignments();

  const totalAssignments = assignments.length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;
  const gradedCount = assignments.filter(a => a.status === 'graded').length;
  const pendingCount = assignments.filter(a => a.status === 'pending').length;

  const completionRate = totalAssignments > 0 
    ? Math.round(((submittedCount + gradedCount) / totalAssignments) * 100)
    : 0;

  const onTimeSubmissions = Math.floor(Math.random() * 20) + 15; // Mock data
  const averageGrade = Math.floor(Math.random() * 15) + 85; // Mock data

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
          Class Progress Overview
        </CardTitle>
        <CardDescription>
          Track overall classroom performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Completion Rate */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Assignment Completion</span>
            <span className="text-sm font-bold text-indigo-600">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">
            {submittedCount + gradedCount} of {totalAssignments} assignments completed
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-green-800">{submittedCount}</div>
            <div className="text-xs text-green-600">Submitted</div>
          </div>
          
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <Clock className="h-6 w-6 text-orange-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-orange-800">{pendingCount}</div>
            <div className="text-xs text-orange-600">Pending</div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="space-y-3 pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Active Students</span>
            <span className="text-sm font-semibold">24</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">On-time Submissions</span>
            <span className="text-sm font-semibold">{onTimeSubmissions}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Class Average</span>
            <span className="text-sm font-semibold text-green-600">{averageGrade}%</span>
          </div>
        </div>

        {/* Encouragement Message */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-100">
          <p className="text-sm text-indigo-700 text-center">
            🌟 Great job! Your class is showing excellent engagement and progress!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
