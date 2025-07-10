import React from 'react';
import { Book, Calendar, Users, Star } from 'lucide-react';

const HinduismForChildren = () => {
  return (
      <div className="w-full bg-gradient-to-br from-indian-cream to-white">
        <div className="w-full bg-gradient-to-br from-indian-cream to-white">
          {/* Replaced py-8 with pb-8 */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="max-w-4xl mx-auto mt-8">
              <div className="inline-block p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border-2 border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center w-full mb-8">
                <h1 className="text-3xl font-heading font-bold mb-4 text-black flex items-center justify-center gap-2">
                  Hinduism for Children
                  <Star className="w-6 h-6 text-indian-saffron" />
                </h1>
                <p className="text-gray-700">
                  Interactive and engaging programs to help children learn about Hindu values and culture
                </p>
              </div>

              <div className="bg-gradient-to-br from-indian-cream to-white rounded-lg p-6 shadow-sm border border-indian-saffron/20 mt-12">
                <h3 className="text-2xl font-heading font-semibold mb-6">Class Information</h3>

                <div className="bg-gradient-to-br from-indian-cream to-yellow-50 rounded-2xl border-2 border-indian-saffron p-6 hover:shadow-md transition-all duration-300">
                  <h4 className="text-xl font-heading font-semibold mb-3 flex items-center justify-center gap-2">
                    <Book className="w-6 h-6 text-indian-saffron" />
                    Hinduism for Children Classes
                  </h4>
                  <div className="space-y-3 mt-4">
                    <p className="text-gray-700"><span className="font-semibold">When:</span> Every Sunday</p>
                    <p className="text-gray-700"><span className="font-semibold">Time:</span> 9:15 AM - 10:15 AM</p>
                    <p className="text-gray-700"><span className="font-semibold">Location:</span> Benvenuto Conference Centre</p>
                    <p className="text-gray-700 mt-4">Weekly classes teaching Hinduism, Vedanta philosophy, and moral values to children through engaging activities and lessons.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indian-cream to-white rounded-lg p-6 shadow-sm border border-indian-saffron/20 mt-12">
                <div className="text-center">
                  <h3 className="text-2xl font-heading font-semibold mb-4">Online Learning Platform</h3>
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-indian-saffron/10 rounded-full flex items-center justify-center">
                      <Book className="w-8 h-8 text-indian-saffron" />
                    </div>
                  </div>
                  <p className="text-gray-700 max-w-2xl mx-auto">
                    We are happy to announce that our new online learning platform will be launching soon!
                    This platform will provide interactive lessons, videos, and activities for children to
                    learn about Hinduism.
                  </p>
                  <div className="mt-6 inline-block bg-indian-saffron/10 px-4 py-2 rounded-full text-indian-saffron font-medium">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HinduismForChildren;
