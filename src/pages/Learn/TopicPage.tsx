
import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import NotFoundMessage from '../../components/learn/NotFoundMessage';
import SubtopicContent from '../../components/learn/SubtopicContent';
import TopicDetail from '../../components/learn/TopicDetail';
import topicsData from '../../data/topicsData';

const TopicPage: React.FC = () => {
  const { topicId, subtopicId } = useParams<{ topicId?: string; subtopicId?: string }>();
  
  // Check if topic exists
  if (!topicId || !topicsData[topicId]) {
    return (
      <NotFoundMessage 
        title="Topic Not Found"
        message="The learning topic you're looking for doesn't exist."
        backTo="/learn"
        backLabel="Back to Learning Centre"
      />
    );
  }
  
  const topic = topicsData[topicId];
  
  // If a subtopic is specified, show that content
  if (subtopicId) {
    const subtopic = topic.subtopics.find(s => s.id === subtopicId);
    
    if (!subtopic) {
      return (
        <NotFoundMessage 
          title="Subtopic Not Found"
          message="The subtopic you're looking for doesn't exist."
          backTo={`/learn/topics/${topicId}`}
          backLabel={`Back to ${topic.title}`}
        />
      );
    }
    
    return (
      <PageLayout title={`Learn - ${topic.title} - ${subtopic.title}`}>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <SubtopicContent 
              topic={topic} 
              topicId={topicId} 
              subtopicId={subtopicId} 
            />
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout title={`Learn - ${topic.title}`}>
      <TopicDetail topicId={topicId} />
    </PageLayout>
  );
};

export default TopicPage;
