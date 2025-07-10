
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const ThankYouPage = () => {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>

        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-6">
          Thank You for Your Donation!
        </h1>

        <p className="text-xl text-gray-700 mb-8">
          Your generous contribution helps us continue our spiritual and humanitarian services to the community.
        </p>

        <div className="bg-spiritual-50 p-6 rounded-lg mb-8">
          <p className="italic text-lg text-gray-700">
            "In the world take always the position of the giver. Give everything and look for no return. Give love, give help, give service, give any little thing you can, but keep out barter. Make no conditions and none will be imposed on you. Let us give out of our own bounty, just as God gives to us." - Swami Vivekananda
          </p>
        </div>

        <p className="text-gray-600 mb-10">
          A receipt of your donation has been emailed to you. If you have any questions, please contact us at johannesburg@ramakrishna-phoenix.org.za
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="default">
            <Link to="/">
              Return to Homepage
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link to="/services/nutrition-programme">
              Learn About Our Outreach Programs
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ThankYouPage;
