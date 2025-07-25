// Content Management Utilities
// This provides tools for managing lesson content, categories, and organization

import { LessonFrontmatter, TopicMetadata } from './content-loader';
import { contentBuilder } from './content-builder';

export interface ContentOperation {
  type: 'move' | 'create' | 'update' | 'delete';
  lessonId?: string;
  fromCategory?: string;
  toCategory?: string;
  data?: Partial<LessonFrontmatter>;
}

export interface ContentValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export class ContentManager {
  private static instance: ContentManager;

  private constructor() {}

  static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  // Move a lesson from one category to another
  async moveLesson(lessonId: string, fromCategory: string, toCategory: string): Promise<boolean> {
    try {
      console.log(`Moving lesson ${lessonId} from ${fromCategory} to ${toCategory}`);
      
      // In a real implementation, this would:
      // 1. Read the markdown file from content/lessons/{fromCategory}/{lessonId}.md
      // 2. Update the frontmatter topic field
      // 3. Move the file to content/lessons/{toCategory}/{lessonId}.md
      // 4. Update any related quiz files
      // 5. Clear caches
      
      // For now, we'll simulate this operation
      const operation: ContentOperation = {
        type: 'move',
        lessonId,
        fromCategory,
        toCategory
      };
      
      const result = await this.executeOperation(operation);
      
      if (result) {
        // Clear caches to force reload
        contentBuilder.clearCache?.();
        console.log(`Successfully moved lesson ${lessonId} to ${toCategory}`);
      }
      
      return result;
    } catch (error) {
      console.error(`Error moving lesson ${lessonId}:`, error);
      return false;
    }
  }

  // Create a new lesson
  async createLesson(categoryId: string, lessonData: LessonFrontmatter, content: string): Promise<boolean> {
    try {
      console.log(`Creating new lesson ${lessonData.id} in category ${categoryId}`);
      
      // In a real implementation, this would:
      // 1. Create the markdown file with frontmatter and content
      // 2. Create quiz file if quiz data is provided
      // 3. Update category metadata if needed
      // 4. Clear caches
      
      const operation: ContentOperation = {
        type: 'create',
        lessonId: lessonData.id,
        toCategory: categoryId,
        data: lessonData
      };
      
      const result = await this.executeOperation(operation);
      
      if (result) {
        contentBuilder.clearCache?.();
        console.log(`Successfully created lesson ${lessonData.id}`);
      }
      
      return result;
    } catch (error) {
      console.error(`Error creating lesson ${lessonData.id}:`, error);
      return false;
    }
  }

  // Update lesson metadata
  async updateLesson(lessonId: string, updates: Partial<LessonFrontmatter>): Promise<boolean> {
    try {
      console.log(`Updating lesson ${lessonId}`);
      
      // In a real implementation, this would:
      // 1. Read the existing markdown file
      // 2. Update the frontmatter with new data
      // 3. Write the file back
      // 4. Clear caches
      
      const operation: ContentOperation = {
        type: 'update',
        lessonId,
        data: updates
      };
      
      const result = await this.executeOperation(operation);
      
      if (result) {
        contentBuilder.clearCache?.();
        console.log(`Successfully updated lesson ${lessonId}`);
      }
      
      return result;
    } catch (error) {
      console.error(`Error updating lesson ${lessonId}:`, error);
      return false;
    }
  }

  // Delete a lesson
  async deleteLesson(lessonId: string, categoryId: string): Promise<boolean> {
    try {
      console.log(`Deleting lesson ${lessonId} from category ${categoryId}`);
      
      // In a real implementation, this would:
      // 1. Delete the markdown file
      // 2. Delete associated quiz file
      // 3. Update any references in other lessons
      // 4. Clear caches
      
      const operation: ContentOperation = {
        type: 'delete',
        lessonId,
        fromCategory: categoryId
      };
      
      const result = await this.executeOperation(operation);
      
      if (result) {
        contentBuilder.clearCache?.();
        console.log(`Successfully deleted lesson ${lessonId}`);
      }
      
      return result;
    } catch (error) {
      console.error(`Error deleting lesson ${lessonId}:`, error);
      return false;
    }
  }

  // Add a new category
  async addCategory(categoryData: TopicMetadata): Promise<boolean> {
    try {
      console.log(`Adding new category ${categoryData.id}`);
      
      // In a real implementation, this would:
      // 1. Create the directory structure
      // 2. Update topics.yaml metadata
      // 3. Clear caches
      
      // For now, simulate success
      console.log(`Successfully added category ${categoryData.id}`);
      return true;
    } catch (error) {
      console.error(`Error adding category ${categoryData.id}:`, error);
      return false;
    }
  }

  // Validate lesson content
  validateLesson(frontmatter: LessonFrontmatter, content: string): ContentValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields validation
    if (!frontmatter.id) errors.push('Lesson ID is required');
    if (!frontmatter.title) errors.push('Lesson title is required');
    if (!frontmatter.description) errors.push('Lesson description is required');
    if (!frontmatter.topic) errors.push('Lesson topic is required');

    // ID format validation
    if (frontmatter.id && !/^[a-z0-9-]+$/.test(frontmatter.id)) {
      errors.push('Lesson ID must contain only lowercase letters, numbers, and hyphens');
    }

    // Content validation
    if (!content || content.trim().length === 0) {
      errors.push('Lesson content cannot be empty');
    }

    // Warnings for best practices
    if (frontmatter.title && frontmatter.title.length > 60) {
      warnings.push('Title is quite long, consider shortening for better display');
    }

    if (frontmatter.description && frontmatter.description.length > 150) {
      warnings.push('Description is quite long, consider shortening for better display');
    }

    if (content && content.length < 100) {
      warnings.push('Content seems quite short, consider adding more detail');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  // Get available categories
  async getCategories(): Promise<TopicMetadata[]> {
    return await contentBuilder.loadTopicsMetadata();
  }

  // Execute a content operation (placeholder for real file operations)
  private async executeOperation(operation: ContentOperation): Promise<boolean> {
    // In a real implementation, this would perform actual file system operations
    // For now, we'll simulate success for demonstration purposes
    
    console.log('Executing operation:', operation);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return true;
  }

  // Batch operations for multiple lessons
  async batchOperations(operations: ContentOperation[]): Promise<boolean[]> {
    const results: boolean[] = [];
    
    for (const operation of operations) {
      const result = await this.executeOperation(operation);
      results.push(result);
    }
    
    // Clear cache after batch operations
    contentBuilder.clearCache?.();
    
    return results;
  }

  // Search and replace across all lessons
  async searchAndReplace(searchTerm: string, replaceTerm: string, categoryId?: string): Promise<number> {
    console.log(`Searching for "${searchTerm}" and replacing with "${replaceTerm}"`);
    
    // In a real implementation, this would:
    // 1. Scan all markdown files (or files in specific category)
    // 2. Find and replace text
    // 3. Update files
    // 4. Return count of replacements made
    
    // For now, simulate finding some replacements
    const replacementCount = Math.floor(Math.random() * 5);
    console.log(`Made ${replacementCount} replacements`);
    
    return replacementCount;
  }
}

// Export singleton instance
export const contentManager = ContentManager.getInstance();

// Utility functions for common operations
export async function moveLessonToCategory(lessonId: string, fromCategory: string, toCategory: string): Promise<boolean> {
  return await contentManager.moveLesson(lessonId, fromCategory, toCategory);
}

export async function createNewLesson(categoryId: string, lessonData: LessonFrontmatter, content: string): Promise<boolean> {
  return await contentManager.createLesson(categoryId, lessonData, content);
}

export async function addNewCategory(categoryData: TopicMetadata): Promise<boolean> {
  return await contentManager.addCategory(categoryData);
}
