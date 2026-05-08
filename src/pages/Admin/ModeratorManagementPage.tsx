/**
 * Moderator Management Page
 * Super Admin only - Create, manage moderators and assign mantras
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users, UserPlus, Trash2, Copy, Check,
  Music, ClipboardList, RefreshCw, Eye, CheckCircle,
  XCircle, AlertCircle, Clock
} from 'lucide-react';
import { toast } from 'sonner';
import AdminNav from '@/components/admin/AdminNav';
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
import { adminStorage } from '@/services/adminStorage';
import {
  AdminUser,
  MantraAssignment,
  generateModeratorCode,
  statusInfo,
  AssignmentStatus
} from '@/types/adminTypes';

import { ADMIN_MANTRAS } from '@/data/adminMantras';

// Available mantras for assignment
const AVAILABLE_MANTRAS = ADMIN_MANTRAS.map((m) => ({ id: m.id, name: m.name }));

const ModeratorManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [moderators, setModerators] = useState<AdminUser[]>([]);
  const [assignments, setAssignments] = useState<MantraAssignment[]>([]);
  const [newModeratorName, setNewModeratorName] = useState('');
  const [newModeratorEmail, setNewModeratorEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'moderators' | 'reviews'>('moderators');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [moderatorToDelete, setModeratorToDelete] = useState<AdminUser | null>(null);
  const [assignSelectValueByModerator, setAssignSelectValueByModerator] = useState<Record<string, string>>({});

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [users, allAssignments] = await Promise.all([
        adminStorage.getUsers(),
        adminStorage.getAssignments(),
      ]);
      setModerators(users.filter(u => u.role === 'moderator'));
      setAssignments(allAssignments);
    } catch (error) {
      toast.error('Failed to load data');
    }
    setIsLoading(false);
  };

  // Get submitted assignments for review
  const getSubmittedAssignments = () => {
    return assignments.filter(a => a.status === 'submitted');
  };

  // Get moderator name by ID
  const getModeratorName = (moderatorId: string) => {
    const mod = moderators.find(m => m.id === moderatorId);
    return mod?.name || 'Unknown';
  };

  // Review functions
  const approveAssignment = async (assignmentId: string) => {
    try {
      await adminStorage.updateAssignment(assignmentId, {
        status: 'approved',
        reviewedAt: new Date().toISOString(),
        notes: reviewNotes[assignmentId] || undefined,
      });
      setAssignments(prev =>
        prev.map(a => a.id === assignmentId
          ? { ...a, status: 'approved' as AssignmentStatus, reviewedAt: new Date().toISOString() }
          : a
        )
      );
      toast.success('Assignment approved!');
    } catch (error) {
      toast.error('Failed to approve assignment');
    }
  };

  const requestRevision = async (assignmentId: string) => {
    const notes = reviewNotes[assignmentId];
    if (!notes?.trim()) {
      toast.error('Please add notes explaining what needs to be revised');
      return;
    }
    try {
      await adminStorage.updateAssignment(assignmentId, {
        status: 'needs_revision',
        reviewedAt: new Date().toISOString(),
        notes,
      });
      setAssignments(prev =>
        prev.map(a => a.id === assignmentId
          ? { ...a, status: 'needs_revision' as AssignmentStatus, reviewedAt: new Date().toISOString(), notes }
          : a
        )
      );
      toast.success('Revision requested');
    } catch (error) {
      toast.error('Failed to request revision');
    }
  };

  const previewMantra = (mantraId: string) => {
    navigate(`/admin/mantras?mantra=${mantraId}`);
  };

  const createModerator = async () => {
    if (!newModeratorName.trim()) {
      toast.error('Please enter a name');
      return;
    }

    try {
      const loginCode = generateModeratorCode(newModeratorName);
      const newUser = await adminStorage.createUser({
        name: newModeratorName.trim(),
        email: newModeratorEmail.trim() || undefined,
        role: 'moderator',
        loginCode,
        isActive: true,
      });
      
      setModerators(prev => [...prev, newUser]);
      setNewModeratorName('');
      setNewModeratorEmail('');
      toast.success(`Moderator created! Login code: ${loginCode}`);
    } catch (error) {
      toast.error('Failed to create moderator');
    }
  };

  const requestDeleteModerator = (mod: AdminUser) => {
    setModeratorToDelete(mod);
    setDeleteDialogOpen(true);
  };

  const deleteModerator = async (id: string) => {
    try {
      await adminStorage.deleteUser(id);
      setModerators(prev => prev.filter(m => m.id !== id));
      toast.success('Moderator deleted');
    } catch (error) {
      toast.error('Failed to delete moderator');
    }
  };

  const confirmDeleteModerator = async () => {
    if (!moderatorToDelete) return;
    await deleteModerator(moderatorToDelete.id);
    setDeleteDialogOpen(false);
    setModeratorToDelete(null);
  };

  const copyLoginCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    toast.success('Login code copied!');
  };

  const assignMantra = async (moderatorId: string, mantraId: string, mantraName: string) => {
    // Check if already assigned
    const existing = assignments.find(a => a.mantraId === mantraId);
    if (existing) {
      toast.error('This mantra is already assigned');
      return;
    }

    try {
      const newAssignment = await adminStorage.createAssignment({
        moderatorId,
        mantraId,
        mantraName,
        status: 'pending',
      });
      setAssignments(prev => [...prev, newAssignment]);
      toast.success(`${mantraName} assigned successfully`);
    } catch (error) {
      toast.error('Failed to assign mantra');
    }
  };

  const removeAssignment = async (assignmentId: string) => {
    try {
      await adminStorage.deleteAssignment(assignmentId);
      setAssignments(prev => prev.filter(a => a.id !== assignmentId));
      toast.success('Assignment removed');
    } catch (error) {
      toast.error('Failed to remove assignment');
    }
  };

  const getModeratorAssignments = (moderatorId: string) => {
    return assignments.filter(a => a.moderatorId === moderatorId);
  };

  const getUnassignedMantras = () => {
    const assignedIds = assignments.map(a => a.mantraId);
    return AVAILABLE_MANTRAS.filter(m => !assignedIds.includes(m.id));
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

  const submittedCount = getSubmittedAssignments().length;

  return (
    <>
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-heading font-bold">Moderator Management</h1>
            <Button variant="outline" onClick={loadData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b">
            <button
              onClick={() => setActiveTab('moderators')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'moderators'
                  ? 'text-indian-saffron border-b-2 border-indian-saffron'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Moderators
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'reviews'
                  ? 'text-indian-saffron border-b-2 border-indian-saffron'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              Pending Reviews
              {submittedCount > 0 && (
                <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {submittedCount}
                </span>
              )}
            </button>
          </div>

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  Submitted Work for Review ({submittedCount})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submittedCount === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-300" />
                    <p>No pending reviews. All caught up!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getSubmittedAssignments().map((assignment) => (
                      <div key={assignment.id} className="border rounded-lg p-4 bg-yellow-50">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              <Music className="w-5 h-5 text-indian-saffron" />
                              {assignment.mantraName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Submitted by: <strong>{getModeratorName(assignment.moderatorId)}</strong>
                            </p>
                            {assignment.submittedAt && (
                              <p className="text-xs text-gray-400">
                                <Clock className="w-3 h-3 inline mr-1" />
                                {new Date(assignment.submittedAt).toLocaleString()}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => previewMantra(assignment.mantraId)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                        </div>

                        {/* Review Notes */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Review Notes (required for revision request)
                          </label>
                          <Textarea
                            placeholder="Add feedback or notes..."
                            value={reviewNotes[assignment.id] || ''}
                            onChange={(e) => setReviewNotes(prev => ({
                              ...prev,
                              [assignment.id]: e.target.value
                            }))}
                            className="w-full"
                            rows={2}
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => approveAssignment(assignment.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => requestRevision(assignment.id)}
                            className="text-orange-600 border-orange-300 hover:bg-orange-50"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Request Revision
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Moderators Tab */}
          {activeTab === 'moderators' && (
          <>
          {/* Create New Moderator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Create New Moderator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Moderator Name"
                  value={newModeratorName}
                  onChange={(e) => setNewModeratorName(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Email (optional)"
                  type="email"
                  value={newModeratorEmail}
                  onChange={(e) => setNewModeratorEmail(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={createModerator} className="bg-indian-saffron hover:bg-indian-saffron/90">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Moderators List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Moderators ({moderators.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {moderators.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No moderators yet. Create one above.
                </p>
              ) : (
                <div className="space-y-4">
                  {moderators.map((mod) => (
                    <div key={mod.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{mod.name}</h3>
                          {mod.email && <p className="text-sm text-gray-500">{mod.email}</p>}
                          <div className="flex items-center gap-2 mt-2">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                              {mod.loginCode}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyLoginCode(mod.loginCode)}
                            >
                              {copiedCode === mod.loginCode ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => requestDeleteModerator(mod)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Assigned Mantras */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <ClipboardList className="w-4 h-4" />
                          Assigned Mantras
                        </h4>
                        <div className="space-y-2">
                          {getModeratorAssignments(mod.id).map((assignment) => (
                            <div
                              key={assignment.id}
                              className="flex items-center justify-between bg-gray-50 p-2 rounded"
                            >
                              <div className="flex items-center gap-2">
                                <Music className="w-4 h-4 text-indian-saffron" />
                                <span>{assignment.mantraName}</span>
                                <span className={`text-xs px-2 py-0.5 rounded ${statusInfo[assignment.status].bgColor} ${statusInfo[assignment.status].color}`}>
                                  {statusInfo[assignment.status].label}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAssignment(assignment.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}

                          {/* Assign New Mantra */}
                          {getUnassignedMantras().length > 0 && (
	                            <Select
	                              value={assignSelectValueByModerator[mod.id] ?? ''}
	                              onValueChange={(mantraId) => {
	                                const mantra = AVAILABLE_MANTRAS.find((m) => m.id === mantraId);
	                                if (!mantra) return;
	                                setAssignSelectValueByModerator((prev) => ({ ...prev, [mod.id]: mantraId }));
	                                assignMantra(mod.id, mantra.id, mantra.name)
	                                  .finally(() => {
	                                    setAssignSelectValueByModerator((prev) => ({ ...prev, [mod.id]: '' }));
	                                  });
	                              }}
	                            >
	                              <SelectTrigger className="w-full">
	                                <SelectValue placeholder="+ Assign a mantra..." />
	                              </SelectTrigger>
	                              <SelectContent>
	                                {getUnassignedMantras().map((m) => (
	                                  <SelectItem key={m.id} value={m.id}>
	                                    {m.name}
	                                  </SelectItem>
	                                ))}
	                              </SelectContent>
	                            </Select>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          </>
          )}
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete moderator?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{' '}
              <span className="font-medium text-foreground">{moderatorToDelete?.name}</span>.
              Their existing assignments will remain in storage unless removed separately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setModeratorToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteModerator}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ModeratorManagementPage;

