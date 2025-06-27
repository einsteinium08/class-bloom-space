
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAssignments } from '@/contexts/AssignmentContext';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/hooks/use-toast';

interface CreateAssignmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateAssignmentModal = ({ open, onOpenChange }: CreateAssignmentModalProps) => {
  const { addAssignment } = useAssignments();
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [points, setPoints] = useState('');

  const subjects = [
    'Mathematics',
    'Science',
    'English',
    'History',
    'Geography',
    'Art',
    'Music',
    'Physical Education',
    'Computer Science',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !subject || !dueDate) {
      toast({
        title: "Please fill in all required fields",
        description: "Title, description, subject, and due date are required",
        variant: "destructive"
      });
      return;
    }

    addAssignment({
      title: title.trim(),
      description: description.trim(),
      subject,
      dueDate: new Date(dueDate),
      createdBy: user?.name || 'Unknown Teacher',
      status: 'pending',
      points: points ? parseInt(points) : undefined
    });

    toast({
      title: "Assignment created! 📚",
      description: "Your assignment has been posted to the classroom",
    });

    // Reset form
    setTitle('');
    setDescription('');
    setSubject('');
    setDueDate('');
    setPoints('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Assignment</DialogTitle>
          <DialogDescription>
            Add a new assignment for your students to complete
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Assignment Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Math Chapter 5 Problems"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subj) => (
                    <SelectItem key={subj} value={subj}>
                      {subj}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="md:col-span-1">
              <Label htmlFor="points">Points (Optional)</Label>
              <Input
                id="points"
                type="number"
                placeholder="100"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Assignment Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed instructions for students..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Create Assignment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignmentModal;
