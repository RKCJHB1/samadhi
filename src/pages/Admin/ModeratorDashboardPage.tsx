/**
 * Moderator Dashboard Page
 * Shows moderators their assigned mantras and allows them to work on timings
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AdminNav from '@/components/admin/AdminNav';
import {
  Music,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  User,
} from 'lucide-react';
import { toast } from 'sonner';
import { adminStorage } from '@/services/adminStorage';
import { getCurrentSession } from '@/services/adminAuth';
import { MantraAssignment, statusInfo, AssignmentStatus } from '@/types/adminTypes';

const ModeratorDashboardPage: React.FC = () => {
  const [assignments, setAssignments] = useState<MantraAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [submitAssignmentId, setSubmitAssignmentId] = useState<string | null>(null);
  const navigate = useNavigate();
  const session = getCurrentSession();

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    if (!session) return;
    
    setIsLoading(true);
    try {
      const myAssignments = await adminStorage.getAssignmentsByModerator(session.userId);
      setAssignments(myAssignments);
    } catch (error) {
      toast.error('Failed to load assignments');
    }
    setIsLoading(false);
  };

  const updateAssignmentStatus = async (assignmentId: string, status: AssignmentStatus) => {
    try {
      const updates: Partial<MantraAssignment> = { status };
      
      if (status === 'in_progress' && !assignments.find(a => a.id === assignmentId)?.startedAt) {
        updates.startedAt = new Date().toISOString();
      }
      
      if (status === 'submitted') {
        updates.submittedAt = new Date().toISOString();
      }
      
      await adminStorage.updateAssignment(assignmentId, updates);
      setAssignments(prev => 
        prev.map(a => a.id === assignmentId ? { ...a, ...updates } : a)
      );
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const startWorking = (assignment: MantraAssignment) => {
    // Update status to in_progress if pending
    if (assignment.status === 'pending') {
      updateAssignmentStatus(assignment.id, 'in_progress');
    }
    // Navigate to mantra editor with the specific mantra
    navigate(`/admin/mantras?mantra=${assignment.mantraId}`);
  };

  const requestSubmitForReview = (assignmentId: string) => {
    setSubmitAssignmentId(assignmentId);
    setSubmitDialogOpen(true);
  };

  const confirmSubmitForReview = async () => {
    if (!submitAssignmentId) return;
    await updateAssignmentStatus(submitAssignmentId, 'submitted');
    setSubmitDialogOpen(false);
    setSubmitAssignmentId(null);
  };

  const getStatusIcon = (status: AssignmentStatus) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-gray-500" />;
      case 'in_progress': return <Play className="w-5 h-5 text-blue-500" />;
      case 'submitted': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'needs_revision': return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  if (isLoading) {
    return (
      <>
        <AdminNav />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indian-saffron"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-indian-saffron" />
                My Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Signed in as <span className="font-medium text-gray-900">{session?.userName}</span> (Moderator)
            </CardContent>
          </Card>

          {assignments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Music className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No mantras assigned to you yet.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Contact the Super Admin to get mantras assigned.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {getStatusIcon(assignment.status)}
                        <div>
                          <h3 className="font-semibold text-lg">{assignment.mantraName}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded ${statusInfo[assignment.status].bgColor} ${statusInfo[assignment.status].color}`}>
                              {statusInfo[assignment.status].label}
                            </span>
                            {assignment.startedAt && (
                              <span className="text-xs text-gray-400">
                                Started: {new Date(assignment.startedAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          {assignment.notes && (
                            <p className="text-sm text-gray-600 mt-2 p-2 bg-yellow-50 rounded">
                              <strong>Admin Note:</strong> {assignment.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {(assignment.status === 'pending' || assignment.status === 'in_progress' || assignment.status === 'needs_revision') && (
                          <Button
                            onClick={() => startWorking(assignment)}
                            className="bg-indian-saffron hover:bg-indian-saffron/90"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {assignment.status === 'pending' ? 'Start' : 'Continue'}
                          </Button>
                        )}
                        {assignment.status === 'in_progress' && (
                          <Button
                            variant="outline"
                                onClick={() => requestSubmitForReview(assignment.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Submit for Review
                          </Button>
                        )}
                        {assignment.status === 'approved' && (
                          <span className="text-green-600 font-medium flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit for review?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark the mantra as submitted for Super Admin review. Make sure you’ve saved your work in the mantra editor.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSubmitAssignmentId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubmitForReview}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ModeratorDashboardPage;
