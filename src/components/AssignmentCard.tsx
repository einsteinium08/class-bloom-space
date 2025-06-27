
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  CheckCircle, 
  BookOpen, 
  Calendar,
  Edit,
  Trash2,
  Upload
} from 'lucide-react';
import { Assignment } from '@/contexts/AssignmentContext';
import { useAssignments } from '@/contexts/AssignmentContext';
import { toast } from '@/hooks/use-toast';

interface AssignmentCardProps {
  assignment: Assignment;
  isTeacher: boolean;
}

const AssignmentCard = ({ assignment, isTeacher }: AssignmentCardProps) => {
  const { deleteAssignment, submitAssignment } = useAssignments();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDelete = () => {
    deleteAssignment(assignment.id);
    toast({
      title: "Assignment deleted",
      description: "The assignment has been removed from the classroom",
    });
  };

  const handleSubmit = () => {
    submitAssignment(assignment.id);
    toast({
      title: "Assignment submitted! 🎉",
      description: "Great job! Your teacher will review your work soon.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'graded': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-3 w-3" />;
      case 'submitted': return <Upload className="h-3 w-3" />;
      case 'graded': return <CheckCircle className="h-3 w-3" />;
      default: return <BookOpen className="h-3 w-3" />;
    }
  };

  const daysUntilDue = getDaysUntilDue(assignment.dueDate);
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue <= 2 && daysUntilDue >= 0;

  return (
    <Card className={`hover:shadow-md transition-all ${
      isOverdue && assignment.status === 'pending' 
        ? 'border-red-200 bg-red-50' 
        : isDueSoon && assignment.status === 'pending'
        ? 'border-amber-200 bg-amber-50'
        : 'hover:border-indigo-200'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
              {assignment.title}
            </CardTitle>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Due: {formatDate(assignment.dueDate)}
              </div>
              <Badge variant="outline" className="text-xs">
                {assignment.subject}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className={`text-xs flex items-center space-x-1 ${getStatusColor(assignment.status)}`}>
              {getStatusIcon(assignment.status)}
              <span className="capitalize">{assignment.status}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription className="text-sm text-gray-700 mb-4 leading-relaxed">
          {assignment.description}
        </CardDescription>

        {/* Due Date Warning */}
        {assignment.status === 'pending' && (
          <div className="mb-4">
            {isOverdue ? (
              <div className="flex items-center text-red-600 text-sm font-medium">
                <Clock className="h-4 w-4 mr-1" />
                Overdue by {Math.abs(daysUntilDue)} day{Math.abs(daysUntilDue) !== 1 ? 's' : ''}
              </div>
            ) : isDueSoon ? (
              <div className="flex items-center text-amber-600 text-sm font-medium">
                <Clock className="h-4 w-4 mr-1" />
                Due in {daysUntilDue} day{daysUntilDue !== 1 ? 's' : ''}
              </div>
            ) : (
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {daysUntilDue} day{daysUntilDue !== 1 ? 's' : ''} remaining
              </div>
            )}
          </div>
        )}

        {/* Submission Info */}
        {assignment.submittedAt && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800">
              <strong>Submitted:</strong> {formatDate(assignment.submittedAt)}
            </div>
            {assignment.grade && (
              <div className="text-sm text-blue-800 mt-1">
                <strong>Grade:</strong> {assignment.grade}/100
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-gray-500">
            Created by {assignment.createdBy}
          </div>
          
          <div className="flex items-center space-x-2">
            {isTeacher ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </>
            ) : (
              assignment.status === 'pending' && (
                <Button
                  onClick={handleSubmit}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Submit Work
                </Button>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;
