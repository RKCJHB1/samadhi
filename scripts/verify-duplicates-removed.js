// Script to verify that duplicates have been removed
const { enhancedLessonsData } = require('../src/data/lessonsDataNew.ts');

console.log('Verifying duplicate removal...\n');

// Holy Trinity lesson IDs
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

// Check each topic
for (const topic of enhancedLessonsData) {
  console.log(`\n=== ${topic.topicName} (${topic.topicId}) ===`);
  console.log(`Total lessons: ${topic.lessons.length}`);
  
  // Check for Holy Trinity lessons
  const holyTrinityInThisTopic = topic.lessons.filter(lesson => 
    holyTrinityLessonIds.includes(lesson.id)
  );
  
  if (holyTrinityInThisTopic.length > 0) {
    console.log(`Holy Trinity lessons found: ${holyTrinityInThisTopic.length}`);
    holyTrinityInThisTopic.forEach(lesson => {
      console.log(`  - ${lesson.id}: ${lesson.title}`);
    });
  } else {
    console.log('No Holy Trinity lessons found (good for deities section)');
  }
}

// Summary
console.log('\n=== SUMMARY ===');
const holyTrinityTopic = enhancedLessonsData.find(t => t.topicId === 'holy-trinity');
const deitiesTopic = enhancedLessonsData.find(t => t.topicId === 'deities');

if (holyTrinityTopic) {
  console.log(`✅ Holy Trinity section exists with ${holyTrinityTopic.lessons.length} lessons`);
} else {
  console.log('❌ Holy Trinity section not found');
}

if (deitiesTopic) {
  const duplicatesInDeities = deitiesTopic.lessons.filter(lesson => 
    holyTrinityLessonIds.includes(lesson.id)
  );
  
  if (duplicatesInDeities.length === 0) {
    console.log('✅ No duplicate Holy Trinity lessons found in deities section');
  } else {
    console.log(`❌ Found ${duplicatesInDeities.length} duplicate lessons in deities section:`);
    duplicatesInDeities.forEach(lesson => {
      console.log(`  - ${lesson.id}`);
    });
  }
}

console.log('\nVerification complete!');
