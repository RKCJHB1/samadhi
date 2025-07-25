import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { contentManager, moveLessonToCategory, addNewCategory } from '../../lib/content-manager';
import { TopicMetadata, LessonFrontmatter } from '../../lib/content-loader';
import { AlertCircle, CheckCircle, Move, Plus, Edit } from 'lucide-react';

const ContentManagement: React.FC = () => {
  const [categories, setCategories] = useState<TopicMetadata[]>([]);
  const [selectedLesson, setSelectedLesson] = useState('');
  const [fromCategory, setFromCategory] = useState('');
  const [toCategory, setToCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New lesson form state
  const [newLesson, setNewLesson] = useState<Partial<LessonFrontmatter>>({
    id: '',
    title: '',
    description: '',
    topic: '',
    difficulty: 'beginner',
    estimatedTime: 15,
    tags: []
  });
  const [newLessonContent, setNewLessonContent] = useState('');

  // New category form state
  const [newCategory, setNewCategory] = useState<Partial<TopicMetadata>>({
    id: '',
    name: '',
    description: '',
    icon: 'book'
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const cats = await contentManager.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleMoveLesson = async () => {
    if (!selectedLesson || !fromCategory || !toCategory) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setIsLoading(true);
    try {
      const success = await moveLessonToCategory(selectedLesson, fromCategory, toCategory);
      if (success) {
        setMessage({ type: 'success', text: `Successfully moved ${selectedLesson} from ${fromCategory} to ${toCategory}` });
        // Reset form
        setSelectedLesson('');
        setFromCategory('');
        setToCategory('');
      } else {
        setMessage({ type: 'error', text: 'Failed to move lesson' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error moving lesson' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateLesson = async () => {
    if (!newLesson.id || !newLesson.title || !newLesson.topic || !newLessonContent) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    setIsLoading(true);
    try {
      const success = await contentManager.createLesson(
        newLesson.topic!,
        newLesson as LessonFrontmatter,
        newLessonContent
      );
      
      if (success) {
        setMessage({ type: 'success', text: `Successfully created lesson ${newLesson.title}` });
        // Reset form
        setNewLesson({
          id: '',
          title: '',
          description: '',
          topic: '',
          difficulty: 'beginner',
          estimatedTime: 15,
          tags: []
        });
        setNewLessonContent('');
      } else {
        setMessage({ type: 'error', text: 'Failed to create lesson' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error creating lesson' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.id || !newCategory.name) {
      setMessage({ type: 'error', text: 'Please provide category ID and name' });
      return;
    }

    setIsLoading(true);
    try {
      const success = await addNewCategory(newCategory as TopicMetadata);
      if (success) {
        setMessage({ type: 'success', text: `Successfully added category ${newCategory.name}` });
        // Reset form
        setNewCategory({
          id: '',
          name: '',
          description: '',
          icon: 'book'
        });
        // Reload categories
        await loadCategories();
      } else {
        setMessage({ type: 'error', text: 'Failed to add category' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error adding category' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading font-bold">Content Management System</h1>
        <p className="text-muted-foreground mt-2">Easily manage lessons and categories with the new markdown-based system</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-2 ${
          message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Move Lesson */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Move className="w-5 h-5" />
              Move Lesson Between Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="lesson-id">Lesson ID</Label>
              <Input
                id="lesson-id"
                placeholder="e.g., mother-saraswati"
                value={selectedLesson}
                onChange={(e) => setSelectedLesson(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="from-category">From Category</Label>
              <Select value={fromCategory} onValueChange={setFromCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="to-category">To Category</Label>
              <Select value={toCategory} onValueChange={setToCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleMoveLesson} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Moving...' : 'Move Lesson'}
            </Button>
          </CardContent>
        </Card>

        {/* Add New Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="category-id">Category ID</Label>
              <Input
                id="category-id"
                placeholder="e.g., meditation"
                value={newCategory.id}
                onChange={(e) => setNewCategory({ ...newCategory, id: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                placeholder="e.g., Meditation Techniques"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="category-description">Description</Label>
              <Textarea
                id="category-description"
                placeholder="Brief description of the category"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>

            <Button 
              onClick={handleAddCategory} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Adding...' : 'Add Category'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Create New Lesson */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Create New Lesson
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-lesson-id">Lesson ID *</Label>
              <Input
                id="new-lesson-id"
                placeholder="e.g., basic-meditation"
                value={newLesson.id}
                onChange={(e) => setNewLesson({ ...newLesson, id: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="new-lesson-category">Category *</Label>
              <Select value={newLesson.topic} onValueChange={(value) => setNewLesson({ ...newLesson, topic: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="new-lesson-title">Title *</Label>
            <Input
              id="new-lesson-title"
              placeholder="e.g., Basic Meditation Techniques"
              value={newLesson.title}
              onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="new-lesson-description">Description *</Label>
            <Textarea
              id="new-lesson-description"
              placeholder="Brief description of the lesson"
              value={newLesson.description}
              onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="new-lesson-content">Content (Markdown) *</Label>
            <Textarea
              id="new-lesson-content"
              placeholder="# Lesson Title

Your lesson content in markdown format..."
              value={newLessonContent}
              onChange={(e) => setNewLessonContent(e.target.value)}
              className="min-h-[200px]"
            />
          </div>

          <Button 
            onClick={handleCreateLesson} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Creating...' : 'Create Lesson'}
          </Button>
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <Card className="bg-gradient-to-br from-spiritual-50 to-white">
        <CardHeader>
          <CardTitle>Benefits of the New Content System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-spiritual-600">Easy Content Management</h4>
              <ul className="text-sm space-y-1">
                <li>• Edit lessons in simple markdown files</li>
                <li>• Move lessons between categories instantly</li>
                <li>• Add new categories without code changes</li>
                <li>• Separate content from code</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-spiritual-600">Developer Friendly</h4>
              <ul className="text-sm space-y-1">
                <li>• Version control friendly</li>
                <li>• No more massive TypeScript files</li>
                <li>• Automatic content validation</li>
                <li>• Backward compatible</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
