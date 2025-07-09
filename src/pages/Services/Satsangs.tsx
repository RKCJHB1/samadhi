import React from 'react';
import { Link } from 'react-router-dom';

const Satsangs = () => {
  return (
      <div className="w-full bg-gradient-to-br from-indian-cream to-white">
      <div className="w-full bg-gradient-to-br from-indian-cream to-white">
        {/* Removed py-4 from this container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center w-full">
              <h1 className="text-3xl font-heading font-bold mb-4 text-black">Satsangs</h1>
                <p className="text-gray-700">
                  Join our regular spiritual gatherings which include the chanting of prayers, meditation, and a discourse on Vedantic Philosophy and Principles. The Sub-Centre also celebrates all major hindu festivals. For details on upcoming special functions, please <Link to="/services/special-functions" className="text-indian-saffron hover:underline">click here</Link>.
                </p>
              </div>

              <div className="mt-12 bg-gradient-to-br from-indian-cream to-white rounded-lg p-6 shadow-sm border border-indian-saffron/20">
                <h3 className="text-2xl font-heading font-semibold mb-6">Satsang Information</h3>

                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-indian-cream to-white p-6 rounded-lg border border-indian-saffron/30">
                    <h4 className="font-bold text-xl mb-3">Sunday Satsang</h4>
                    <p className="text-gray-700">Time: 9:00 AM - 10:30 AM</p>
                    <p className="text-gray-700">Location: Benvenuto Conference Centre</p>
                    <p className="text-gray-700">Format: Join us for our weekly Sunday Satsang, featuring bhajans, chantings, a spiritual discourse and arati.</p>
                  </div>

                  <div className="bg-gradient-to-br from-indian-cream to-white p-6 rounded-lg border border-indian-saffron/30">
                    <h4 className="font-bold text-xl mb-3">Sri Ramakrishna says:</h4>
                    <p className="text-gray-700 italic border-l-4 border-indian-saffron/30 pl-4 py-2">
                      Japa means silently repeating God's name in solitude. When you chant His name with single-minded devotion you can see God's form and realize Him. Suppose there is a piece of timber sunk in the water of the Ganges and fastened with a chain to the bank. You proceed link by link, holding to the chain, and you dive into the water and follow the chain. Finally, you are able to reach the timber. In the same way, by repeating God's name you become absorbed in Him and finally realize Him.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Satsangs;
