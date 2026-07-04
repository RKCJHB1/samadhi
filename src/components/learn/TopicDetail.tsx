
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import Button from '../shared/Button';
import LearningResources from './LearningResources';
import { enhancedLessonsData } from '../../data/lessonsDataNew';
import topicsData from '../../data/topicsData';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface TopicDetailProps {
  topicId: string;
}

const TopicDetail: React.FC<TopicDetailProps> = ({ topicId }) => {
  // Find the topic data from enhanced lessons data
  const topicData = enhancedLessonsData.find(t => t.topicId === topicId);

  // Get topic metadata (including image) from topicsData
  const topicMetadata = topicsData[topicId];

  if (!topicData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/learn" className="inline-flex items-center text-spiritual-500 hover:text-spiritual-600 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learning Centre
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold mb-4">Topic Not Found</h1>
            <p className="text-muted-foreground">The topic you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <Link to="/learn" className="inline-flex items-center text-spiritual-500 hover:text-spiritual-600 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning Centre
        </Link>

        {/* Topic Hero Section with Image */}
        {topicMetadata && topicMetadata.image && (
          <div className="relative mb-12 rounded-xl overflow-hidden shadow-lg">
            <div className="h-64 md:h-80 bg-gradient-to-r from-spiritual-500/20 to-indian-saffron/20">
              <a href={topicMetadata.image} download>
                <img
                  src={topicMetadata.image}
                  alt={topicData.topicName}
                  className="w-full h-full object-cover"
                />
              </a>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white pointer-events-none">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{topicData.topicName}</h1>
                <p className="text-xl opacity-90">
                  {topicMetadata.description || `Explore ${topicData.lessons.length} comprehensive lessons in ${topicData.topicName.toLowerCase()}`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Fallback header if no image */}
        {(!topicMetadata || !topicMetadata.image) && (
          <SectionHeader
            title={topicData.topicName}
            subtitle={`Explore ${topicData.lessons.length} comprehensive lessons in ${topicData.topicName.toLowerCase()}`}
            alignment="left"
          />
        )}

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {topicData.lessons.map((lesson) => (
            <Card key={lesson.id} className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/40 hover:shadow-lg transition-all hover:from-indian-cream hover:to-white/95 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-heading">{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {lesson.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>Lesson</span>
                  </div>
                  <Link
                    to={`/learn/lessons/${topicId}/${lesson.id}`}
                    className="inline-flex items-center px-3 py-1 bg-spiritual-500 text-white text-sm rounded-md hover:bg-spiritual-600 transition-colors"
                  >
                    Start Learning
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <LearningResources />

        <div className="text-center mt-12">
          <p className="text-xl font-semibold mb-6">
            Test your knowledge with our interactive quizzes
          </p>
          <Button href="/learn/community" size="lg">
            Access Learning Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
