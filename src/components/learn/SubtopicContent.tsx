
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TopicData } from '../../data/topicsData';

interface SubtopicContentProps {
  topic: TopicData;
  topicId: string;
  subtopicId: string;
}

const SubtopicContent: React.FC<SubtopicContentProps> = ({ topic, topicId, subtopicId }) => {
  const subtopic = topic.subtopics.find(s => s.id === subtopicId);
  
  if (!subtopic) return null;
  
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-heading font-bold mb-6">{subtopic.title}</h2>
      <div className="prose prose-lg max-w-none">
        <p className="lead">
          {subtopic.description}
        </p>
        
        <div className="my-8 p-6 bg-gradient-to-br from-indian-cream/50 to-white/50 rounded-lg border-l-4 border-spiritual-500">
          <p>
            This is detailed content about the {subtopic.title} concept. The content is being developed and will be expanded with more information soon.
          </p>
        </div>
        
        <p>
          Check back soon for more detailed information on this topic including further readings and interactive elements.
        </p>
      </div>
      
      <div className="mt-8">
        <Link to={`/learn/topics/${topicId}`} className="inline-flex items-center text-spiritual-500 hover:text-spiritual-600">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {topic.title}
        </Link>
      </div>
    </div>
  );
};

export default SubtopicContent;
