// New content-driven lessons data
// This file demonstrates the new markdown-based content system
// while maintaining backward compatibility

import { LessonGroup, Lesson, QuizType } from './lessonsData';
import { contentBuilder } from '../lib/content-builder';

// Cache for loaded lessons
let lessonsCache: LessonGroup[] | null = null;

// Load lessons using the new content system
export async function loadLessonsData(): Promise<LessonGroup[]> {
  if (lessonsCache) {
    return lessonsCache;
  }

  try {
    // Use the content builder to load lessons
    const lessons = await contentBuilder.buildLessons();
    lessonsCache = lessons;
    return lessons;
  } catch (error) {
    console.error('Error loading lessons from content system:', error);
    
    // Fallback to existing data
    const { lessonsData } = await import('./lessonsData');
    return lessonsData;
  }
}

// For immediate use (synchronous), we'll export the existing data
// but enhanced with markdown content where available
export { lessonsData } from './lessonsData';

// Enhanced lessons data that includes markdown content
// Import the complete lessons data from the original file
import { lessonsData as originalLessonsData } from './lessonsData';

// Holy Trinity lesson IDs that should be moved from deities to holy-trinity
const holyTrinityLessonIds = [
  'teachings-sri-sarada-devi',
  'introduction-sri-ramakrishna',
  'childhood-days-sri-ramakrishna',
  'gadai-love-for-nature',
  'gadai-playing-shiva',
  'rani-rasmani-ramakrishna',
  'muslim-way-to-god',
  'christian-way-to-god',
  'god-is-infinite',
  'sri-sarada-devi',
  'swami-vivekananda-part1',
  'swami-vivekananda-part2'
];

// Function to create clean lessons data with proper organization
function createCleanLessonsData(): LessonGroup[] {
  const cleanData: LessonGroup[] = [];

  // Extract Holy Trinity lessons from deities section
  const holyTrinityLessons: Lesson[] = [];

  for (const group of originalLessonsData) {
    if (group.topicId === 'deities') {
      // Split deities lessons into Holy Trinity and regular deities
      const regularDeitiesLessons: Lesson[] = [];

      for (const lesson of group.lessons) {
        if (holyTrinityLessonIds.includes(lesson.id)) {
          holyTrinityLessons.push(lesson);
        } else {
          regularDeitiesLessons.push(lesson);
        }
      }

      // Add Holy Trinity section before deities
      if (holyTrinityLessons.length > 0) {
        cleanData.push({
          topicId: 'holy-trinity',
          topicName: 'The Holy Trinity',
          lessons: holyTrinityLessons
        });
      }

      // Add cleaned deities section
      cleanData.push({
        ...group,
        lessons: regularDeitiesLessons
      });
    } else {
      // Add other sections as-is
      cleanData.push(group);
    }
  }

  return cleanData;
}

export const enhancedLessonsData: LessonGroup[] = createCleanLessonsData();

// Clear cache function for development
export function clearLessonsCache(): void {
  lessonsCache = null;
}
