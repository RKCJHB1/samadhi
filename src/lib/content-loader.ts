import { marked } from 'marked';
import matter from 'gray-matter';
import { LessonGroup, Lesson, QuizType } from '../data/lessonsData';

// Types for markdown frontmatter
export interface LessonFrontmatter {
  id: string;
  title: string;
  description: string;
  topic: string;
  videoUrl?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: number;
  tags?: string[];
  quiz?: string; // Reference to quiz file
  relatedLessons?: string[];
  suggestedNext?: string;
  sequenceOrder?: number;
}

export interface TopicMetadata {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  order?: number;
}

// Content loader class
export class ContentLoader {
  private static instance: ContentLoader;
  private lessonsCache: LessonGroup[] | null = null;
  private topicsCache: TopicMetadata[] | null = null;

  private constructor() {}

  static getInstance(): ContentLoader {
    if (!ContentLoader.instance) {
      ContentLoader.instance = new ContentLoader();
    }
    return ContentLoader.instance;
  }

  // Load all lessons from markdown files
  async loadLessons(): Promise<LessonGroup[]> {
    if (this.lessonsCache) {
      return this.lessonsCache;
    }

    try {
      // In a real implementation, this would read from the file system
      // For now, we'll use a hybrid approach that loads from both sources
      const lessons = await this.loadLessonsFromMarkdown();
      this.lessonsCache = lessons;
      return lessons;
    } catch (error) {
      console.error('Error loading lessons:', error);
      // Fallback to existing data
      const { lessonsData } = await import('../data/lessonsData');
      return lessonsData;
    }
  }

  // Load topics metadata
  async loadTopics(): Promise<TopicMetadata[]> {
    if (this.topicsCache) {
      return this.topicsCache;
    }

    // Default topics configuration
    const defaultTopics: TopicMetadata[] = [
      {
        id: 'hindu-philosophy',
        name: 'Hindu Philosophy',
        description: 'Foundational principles and ideas that form the basis of Hindu thought',
        icon: 'book',
        order: 1
      },
      {
        id: 'deities',
        name: 'Hindu Deities and Rishis',
        description: 'Learn about divine beings and great sages',
        icon: 'star',
        order: 2
      },
      {
        id: 'scriptures',
        name: 'Sacred Scriptures',
        description: 'Sacred texts and literature of Hinduism',
        icon: 'scroll',
        order: 3
      },
      {
        id: 'practices',
        name: 'Spiritual Practices',
        description: 'Methods for spiritual growth and development',
        icon: 'lotus',
        order: 4
      }
    ];

    this.topicsCache = defaultTopics;
    return defaultTopics;
  }

  // Parse markdown content
  private parseMarkdown(content: string): { frontmatter: LessonFrontmatter; html: string } {
    const { data, content: markdownContent } = matter(content);
    const html = marked(markdownContent);
    return {
      frontmatter: data as LessonFrontmatter,
      html: html as string
    };
  }

  // Load quiz for a lesson
  private async loadQuiz(quizId: string): Promise<QuizType | undefined> {
    try {
      // In a real implementation, this would load from content/quizzes/
      // For now, return undefined to use existing embedded quizzes
      return undefined;
    } catch (error) {
      console.error(`Error loading quiz ${quizId}:`, error);
      return undefined;
    }
  }

  // Load lessons from markdown files (placeholder implementation)
  private async loadLessonsFromMarkdown(): Promise<LessonGroup[]> {
    // For now, this is a placeholder that returns the existing data
    // In a full implementation, this would scan the content/ directory
    const { lessonsData } = await import('../data/lessonsData');
    return lessonsData;
  }

  // Clear cache (useful for development)
  clearCache(): void {
    this.lessonsCache = null;
    this.topicsCache = null;
  }

  // Get lesson by ID across all topics
  async getLessonById(lessonId: string): Promise<{ lesson: Lesson; topic: LessonGroup } | null> {
    const lessons = await this.loadLessons();
    
    for (const topic of lessons) {
      const lesson = topic.lessons.find(l => l.id === lessonId);
      if (lesson) {
        return { lesson, topic };
      }
    }
    
    return null;
  }

  // Get lessons by topic
  async getLessonsByTopic(topicId: string): Promise<Lesson[]> {
    const lessons = await this.loadLessons();
    const topic = lessons.find(t => t.topicId === topicId);
    return topic?.lessons || [];
  }

  // Search lessons
  async searchLessons(query: string): Promise<Lesson[]> {
    const lessons = await this.loadLessons();
    const allLessons = lessons.flatMap(topic => topic.lessons);
    
    const searchTerm = query.toLowerCase();
    return allLessons.filter(lesson => 
      lesson.title.toLowerCase().includes(searchTerm) ||
      lesson.description.toLowerCase().includes(searchTerm) ||
      lesson.content?.toLowerCase().includes(searchTerm)
    );
  }
}

// Export singleton instance
export const contentLoader = ContentLoader.getInstance();

// Hook for React components
export function useContentLoader() {
  return contentLoader;
}
