#!/usr/bin/env node

/**
 * Script to convert all lessons from the old lessonsData.ts format to markdown files
 * This automates the conversion process for the new content management system
 */

const fs = require('fs');
const path = require('path');

// Import the lessons data (we'll need to adjust this for Node.js)
// For now, we'll work with a sample structure

console.log('🚀 Starting lesson conversion to markdown format...\n');

// Helper function to convert HTML content to markdown
function htmlToMarkdown(html) {
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

// Helper function to create frontmatter
function createFrontmatter(lesson, topicId) {
  const frontmatter = {
    id: lesson.id,
    title: lesson.title,
    description: lesson.description,
    topic: topicId,
    difficulty: 'beginner',
    estimatedTime: 15,
    tags: generateTags(lesson.title, lesson.description),
  };
  
  if (lesson.quiz && lesson.quiz.questions && lesson.quiz.questions.length > 0) {
    frontmatter.quiz = lesson.id;
  }
  
  if (lesson.videoUrl) {
    frontmatter.videoUrl = lesson.videoUrl;
  }
  
  return frontmatter;
}

// Helper function to generate tags
function generateTags(title, description) {
  const tags = [];
  const text = (title + ' ' + description).toLowerCase();
  
  // Common tag patterns
  const tagPatterns = {
    'sri-ramakrishna': ['ramakrishna', 'sri ramakrishna'],
    'sri-sarada-devi': ['sarada devi', 'holy mother'],
    'swami-vivekananda': ['vivekananda', 'swami vivekananda'],
    'spiritual-teacher': ['teacher', 'guru', 'master'],
    'divine': ['divine', 'god', 'goddess'],
    'meditation': ['meditation', 'prayer'],
    'philosophy': ['philosophy', 'dharma', 'karma'],
    'scripture': ['veda', 'gita', 'upanishad', 'ramayana', 'mahabharata'],
    'festival': ['festival', 'celebration', 'puja'],
    'story': ['story', 'tale', 'legend'],
    'moral': ['moral', 'lesson', 'teaching']
  };
  
  for (const [tag, patterns] of Object.entries(tagPatterns)) {
    if (patterns.some(pattern => text.includes(pattern))) {
      tags.push(tag);
    }
  }
  
  return tags.slice(0, 5); // Limit to 5 tags
}

// Helper function to create quiz file
function createQuizFile(lesson) {
  if (!lesson.quiz || !lesson.quiz.questions || lesson.quiz.questions.length === 0) {
    return null;
  }
  
  return {
    lessonId: lesson.id,
    questions: lesson.quiz.questions
  };
}

// Helper function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

// Main conversion function
function convertLesson(lesson, topicId) {
  try {
    // Create frontmatter
    const frontmatter = createFrontmatter(lesson, topicId);
    
    // Convert content to markdown
    const markdownContent = htmlToMarkdown(lesson.content || '');
    
    // Create the full markdown file content
    const yamlFrontmatter = Object.entries(frontmatter)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}: [${value.map(v => `${v}`).join(', ')}]`;
        }
        return `${key}: ${value}`;
      })
      .join('\n');
    
    const fullContent = `---
${yamlFrontmatter}
---

${markdownContent}

---

## Key Terms

*Key terms and definitions would be extracted from the content*`;
    
    // Ensure topic directory exists
    const topicDir = path.join('content', 'lessons', topicId);
    ensureDirectoryExists(topicDir);
    
    // Write markdown file
    const markdownPath = path.join(topicDir, `${lesson.id}.md`);
    fs.writeFileSync(markdownPath, fullContent, 'utf8');
    console.log(`✅ Converted: ${lesson.title} -> ${markdownPath}`);
    
    // Create quiz file if needed
    const quizData = createQuizFile(lesson);
    if (quizData) {
      ensureDirectoryExists(path.join('content', 'quizzes'));
      const quizPath = path.join('content', 'quizzes', `${lesson.id}.json`);
      fs.writeFileSync(quizPath, JSON.stringify(quizData, null, 2), 'utf8');
      console.log(`📝 Created quiz: ${quizPath}`);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Error converting lesson ${lesson.id}:`, error.message);
    return false;
  }
}

// Sample lesson data structure for testing
const sampleLessons = [
  {
    topicId: 'hindu-philosophy',
    topicName: 'Hindu Philosophy',
    lessons: [
      {
        id: 'karma-principle',
        title: 'The Principle of Karma',
        description: 'Understand the law of cause and effect in Hindu philosophy',
        content: '<h2>The Law of Karma</h2><p>Karma, literally meaning "action," is a fundamental concept in Hindu philosophy...</p>',
        quiz: {
          questions: [
            {
              question: 'What does the word "karma" literally mean?',
              answers: ['Destiny', 'Fate', 'Action', 'Reaction'],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  }
];

// Main execution
function main() {
  console.log('📋 Conversion Summary:');
  console.log('='.repeat(50));
  
  let totalLessons = 0;
  let convertedLessons = 0;
  
  // Process sample data (in real implementation, this would load from lessonsData.ts)
  sampleLessons.forEach(topicGroup => {
    console.log(`\n📚 Processing topic: ${topicGroup.topicName}`);
    console.log('-'.repeat(30));
    
    topicGroup.lessons.forEach(lesson => {
      totalLessons++;
      if (convertLesson(lesson, topicGroup.topicId)) {
        convertedLessons++;
      }
    });
  });
  
  console.log('\n' + '='.repeat(50));
  console.log(`🎉 Conversion Complete!`);
  console.log(`📊 Results: ${convertedLessons}/${totalLessons} lessons converted successfully`);
  console.log(`📁 Markdown files created in: content/lessons/`);
  console.log(`📝 Quiz files created in: content/quizzes/`);
  console.log('\n✨ Your content management system is now ready!');
}

// Run the conversion
if (require.main === module) {
  main();
}

module.exports = {
  convertLesson,
  htmlToMarkdown,
  createFrontmatter,
  createQuizFile
};
