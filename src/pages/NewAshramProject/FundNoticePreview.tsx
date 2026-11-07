import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';

const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029VbE4YeY89ino9wbDMA0f';

const FundNoticePreview = () => {
  useEffect(() => {
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    return () => {
      document.head.removeChild(robots);
    };
  }, []);

  return (
    <PageLayout title="New Ashram Development Updates">
      <div className="min-h-screen w-full bg-gradient-to-br from-indian-cream to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto">
            <h1 className="mt-8 font-heading text-3xl font-bold text-black md:text-4xl">
              Subscribe to our New Ashram Development Updates
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              We will soon launch our online fundraising platform for this New Ashram Development. Subscribe to our WhatsApp channel to be informed of further developments.
            </p>

            <div className="mt-8 rounded-lg border border-indian-saffron/30 bg-gradient-to-br from-indian-cream to-white p-6 text-center shadow-sm">
              <a
                href={WHATSAPP_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-md bg-spiritual-500 px-5 py-3 font-medium text-white hover:bg-spiritual-600"
              >
                Follow the WhatsApp channel
              </a>
            </div>

            <p className="mt-6 text-sm text-gray-600">
              <Link to="/new-ashram-project/fundraising" className="text-indian-saffron hover:underline">
                Return to the fundraising page
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FundNoticePreview;
