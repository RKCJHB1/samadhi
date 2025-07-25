// Lesson Converter Utility
// This utility helps convert lessons from the old format to markdown

import { Lesson, LessonGroup } from '../data/lessonsData';
import { LessonFrontmatter } from './content-loader';

export class LessonConverter {
  
  // Convert HTML content to markdown
  static htmlToMarkdown(html: string): string {
    if (!html) return '';
    
    return html
      // Remove HTML comments and extra whitespace
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      
      // Convert headings
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n')
      
      // Convert paragraphs
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n')
      
      // Convert lists
      .replace(/<ul[^>]*>/gi, '\n')
      .replace(/<\/ul>/gi, '\n')
      .replace(/<ol[^>]*>/gi, '\n')
      .replace(/<\/ol>/gi, '\n')
      .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1')
      
      // Convert emphasis
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
      .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
      
      // Convert divs to sections (simplified)
      .replace(/<div[^>]*class="[^"]*bg-spiritual[^"]*"[^>]*>(.*?)<\/div>/gi, '\n$1\n')
      .replace(/<div[^>]*>(.*?)<\/div>/gi, '\n$1\n')
      
      // Remove remaining HTML tags
      .replace(/<[^>]*>/g, '')
      
      // Clean up extra whitespace
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .replace(/^\s+|\s+$/g, '')
      .trim();
  }

  // Generate tags based on lesson content
  static generateTags(title: string, description: string, topicId: string): string[] {
    const tags: string[] = [];
    const text = (title + ' ' + description).toLowerCase();
    
    // Add topic-based tags
    switch (topicId) {
      case 'holy-trinity':
        if (text.includes('ramakrishna') || text.includes('gadai')) tags.push('sri-ramakrishna');
        if (text.includes('sarada') || text.includes('holy mother')) tags.push('sri-sarada-devi');
        if (text.includes('vivekananda') || text.includes('narendranath')) tags.push('swami-vivekananda');
        break;
      case 'hindu-philosophy':
        if (text.includes('dharma')) tags.push('dharma');
        if (text.includes('karma')) tags.push('karma');
        if (text.includes('philosophy')) tags.push('philosophy');
        break;
      case 'deities':
        if (text.includes('krishna')) tags.push('lord-krishna');
        if (text.includes('shiva')) tags.push('lord-shiva');
        if (text.includes('goddess') || text.includes('devi')) tags.push('divine-feminine');
        break;
      case 'practices':
        if (text.includes('meditation')) tags.push('meditation');
        if (text.includes('prayer')) tags.push('prayer');
        if (text.includes('moral')) tags.push('moral-lesson');
        break;
    }
    
    // Common spiritual tags
    const commonPatterns = {
      'spiritual-experience': ['experience', 'vision', 'trance'],
      'devotion': ['devotion', 'love', 'worship'],
      'teaching': ['teaching', 'lesson', 'wisdom'],
      'story': ['story', 'tale', 'narrative'],
      'divine': ['divine', 'god', 'sacred']
    };
    
    for (const [tag, patterns] of Object.entries(commonPatterns)) {
      if (patterns.some(pattern => text.includes(pattern))) {
        tags.push(tag);
      }
    }
    
    return tags.slice(0, 5); // Limit to 5 tags
  }

  // Create frontmatter for a lesson
  static createFrontmatter(lesson: Lesson, topicId: string): LessonFrontmatter {
    return {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      topic: topicId,
      difficulty: 'beginner',
      estimatedTime: 15,
      tags: this.generateTags(lesson.title, lesson.description, topicId),
      quiz: lesson.quiz && lesson.quiz.questions && lesson.quiz.questions.length > 0 ? lesson.id : undefined,
      videoUrl: lesson.videoUrl || undefined
    };
  }

  // Convert a single lesson to markdown format
  static convertLessonToMarkdown(lesson: Lesson, topicId: string): string {
    const frontmatter = this.createFrontmatter(lesson, topicId);
    const content = this.htmlToMarkdown(lesson.content || '');
    
    // Create YAML frontmatter
    const yamlLines: string[] = [];
    Object.entries(frontmatter).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          yamlLines.push(`${key}: [${value.join(', ')}]`);
        } else if (typeof value === 'string') {
          yamlLines.push(`${key}: ${value}`);
        } else {
          yamlLines.push(`${key}: ${value}`);
        }
      }
    });
    
    return `---
${yamlLines.join('\n')}
---

${content}

---

## Key Terms

*Key terms and definitions would be extracted from the content*`;
  }

  // Convert quiz to JSON format
  static convertQuizToJson(lesson: Lesson): string | null {
    if (!lesson.quiz || !lesson.quiz.questions || lesson.quiz.questions.length === 0) {
      return null;
    }
    
    const quizData = {
      lessonId: lesson.id,
      questions: lesson.quiz.questions
    };
    
    return JSON.stringify(quizData, null, 2);
  }

  // Get all lessons that need conversion
  static getLessonsToConvert(): { topicId: string; lessons: Lesson[] }[] {
    // This would normally import from lessonsData, but for now we'll return a structure
    // In a real implementation, this would scan the existing lessonsData
    return [
      {
        topicId: 'hindu-philosophy',
        lessons: [] // Would be populated from actual data
      },
      {
        topicId: 'deities', 
        lessons: [] // Would be populated from actual data
      },
      {
        topicId: 'scriptures',
        lessons: [] // Would be populated from actual data
      },
      {
        topicId: 'practices',
        lessons: [] // Would be populated from actual data
      }
    ];
  }

  // Generate file path for a lesson
  static getMarkdownFilePath(topicId: string, lessonId: string): string {
    return `content/lessons/${topicId}/${lessonId}.md`;
  }

  // Generate file path for a quiz
  static getQuizFilePath(lessonId: string): string {
    return `content/quizzes/${lessonId}.json`;
  }
}

// Export utility functions
export const {
  htmlToMarkdown,
  generateTags,
  createFrontmatter,
  convertLessonToMarkdown,
  convertQuizToJson
} = LessonConverter;
