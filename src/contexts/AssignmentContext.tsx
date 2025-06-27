
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  subject: string;
  createdBy: string;
  status: 'pending' | 'submitted' | 'graded';
  points?: number;
  submittedAt?: Date;
  grade?: number;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  createdAt: Date;
  createdBy: string;
  pinned: boolean;
}

interface AssignmentContextType {
  assignments: Assignment[];
  announcements: Announcement[];
  addAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: string) => void;
  submitAssignment: (id: string) => void;
}

const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined);

export const AssignmentProvider = ({ children }: { children: ReactNode }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Math Chapter 5 Problems',
      description: 'Complete problems 1-20 from Chapter 5. Show all your work!',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      subject: 'Mathematics',
      createdBy: 'Ms. Johnson',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Science Fair Project Proposal',
      description: 'Submit your science fair project proposal including hypothesis and methodology.',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      subject: 'Science',
      createdBy: 'Mr. Smith',
      status: 'pending'
    }
  ]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Welcome to Our Classroom! 🎉',
      message: 'Welcome to our digital classroom! Here you\'ll find all your assignments, announcements, and can track your progress. Don\'t hesitate to ask questions!',
      createdAt: new Date(),
      createdBy: 'Ms. Johnson',
      pinned: true
    },
    {
      id: '2',
      title: 'Field Trip Reminder',
      message: 'Don\'t forget about our science museum field trip next Friday! Please bring your permission slips.',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      createdBy: 'Mr. Smith',
      pinned: false
    }
  ]);

  const addAssignment = (assignment: Omit<Assignment, 'id'>) => {
    const newAssignment = {
      ...assignment,
      id: Date.now().toString()
    };
    setAssignments(prev => [...prev, newAssignment]);
  };

  const updateAssignment = (id: string, updates: Partial<Assignment>) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === id ? { ...assignment, ...updates } : assignment
    ));
  };

  const deleteAssignment = (id: string) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== id));
  };

  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    const newAnnouncement = {
      ...announcement,
      id: Date.now().toString()
    };
    setAnnouncements(prev => [...prev, newAnnouncement]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
  };

  const submitAssignment = (id: string) => {
    updateAssignment(id, { 
      status: 'submitted', 
      submittedAt: new Date() 
    });
  };

  return (
    <AssignmentContext.Provider value={{
      assignments,
      announcements,
      addAssignment,
      updateAssignment,
      deleteAssignment,
      addAnnouncement,
      deleteAnnouncement,
      submitAssignment
    }}>
      {children}
    </AssignmentContext.Provider>
  );
};

export const useAssignments = () => {
  const context = useContext(AssignmentContext);
  if (context === undefined) {
    throw new Error('useAssignments must be used within an AssignmentProvider');
  }
  return context;
};
