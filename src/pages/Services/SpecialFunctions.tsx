
import { Link } from 'react-router-dom';

const SpecialFunctions = () => {
  return (
      <div className="w-full bg-gradient-to-br from-indian-cream to-white">
        <div className="w-full bg-gradient-to-br from-indian-cream to-white">
          {/* Replaced py-8 with pb-8 */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="max-w-4xl mx-auto mt-8">
              <div className="inline-block p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center w-full mb-8">
                <h1 className="text-3xl font-heading font-bold mb-4 text-black">Upcoming Events</h1>
                <p className="text-gray-700">
                  Celebrations of major religious festivals and other special programmes extending our service activities (seminars/workshops etc).
                </p>
              </div>

              <div className="mt-12 bg-gradient-to-br from-indian-cream to-white rounded-lg p-6 shadow-sm border border-indian-saffron/20">
                <h3 className="text-2xl font-heading font-semibold mb-6">
                  Upcoming Programmes <span className="text-base font-normal ml-2">(If you would like to get involved, please <Link to="/contact" className="text-indian-saffron hover:underline">contact us</Link>.)</span>
                </h3>

                {/* Desktop view - table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 rounded-lg">
                    <thead>
                      <tr className="bg-indian-saffron/10">
                        <th className="px-6 py-3 border-b border-indian-saffron/30 text-left font-heading align-top">Date</th>
                        <th className="px-6 py-3 border-b border-indian-saffron/30 text-left font-heading align-top">Event</th>
                        <th className="px-6 py-3 border-b border-indian-saffron/30 text-left font-heading align-top">Details</th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr className="bg-indian-saffron/10">
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Upcoming Event</p>
                          <p className="mt-1 text-sm text-gray-600 whitespace-nowrap">Date TBA</p>
                        </td>
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Special Programme</p>
                          <p className="mt-1">
                            <a href="/pics/Revered Swami Medhanandaji.pdf" target="_blank" rel="noopener noreferrer" className="text-indian-saffron hover:underline font-medium text-sm">
                              View Programme Details (PDF)
                            </a>
                          </p>
                        </td>
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Programme featuring Revered Swami Medhanandaji</p>
                          <p className="mt-1 text-sm text-gray-600">
                            (Venue TBA)
                          </p>
                        </td>
                      </tr>

                      <tr className="opacity-60">
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Monday, <span className="whitespace-nowrap">28th July</span></p>
                          <p className="mt-1 text-sm text-gray-600 whitespace-nowrap">7:00 PM - 8:00 PM</p>
                          <span className="inline-block mt-2 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Completed</span>
                        </td>
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Welcome Reception</p>
                          <p className="mt-1">
                            <Link to="/services/welcome-reception-invitation" className="text-indian-saffron hover:underline font-medium text-sm">
                              View Programme Details
                            </Link>
                          </p>
                        </td>
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Welcome Reception for Revered Swami Shantatmanandaji Maharaj</p>
                          <p className="mt-1 text-sm text-gray-600">
                            (<a href="https://maps.app.goo.gl/4w3ncE7cXXHaZHqj9" target="_blank" rel="noopener noreferrer" className="text-indian-saffron hover:underline">
                              Eagle Canyon Golf Estate Conference Centre
                            </a>)
                          </p>
                        </td>
                      </tr>
                      <tr className="opacity-60">
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Saturday, <span className="whitespace-nowrap">26th July</span></p>
                          <p className="mt-1 text-sm text-gray-600 whitespace-nowrap">4:00 PM - 5:45 PM</p>
                          <span className="inline-block mt-2 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Completed</span>
                        </td>
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Special Programme</p>
                          <p className="mt-1">
                            <Link to="/services/special-programme-invitation" className="text-indian-saffron hover:underline font-medium text-sm">
                              View Programme Details
                            </Link>
                          </p>
                        </td>
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Commemorating the History of the Ramakrishna Centre of South Africa</p>
                          <p className="mt-1 text-sm text-gray-600">
                            (<a href="https://g.co/kgs/HyfJkiY" target="_blank" rel="noopener noreferrer" className="text-indian-saffron hover:underline">
                              Boskruin Community Centre
                            </a>)
                          </p>
                          <p className="text-xs text-gray-500">
                            (Kelly Ave, Bromhof, Randburg, 2154)
                          </p>
                        </td>
                      </tr>
                      <tr className="opacity-60">
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Thursday, <span className="whitespace-nowrap">10th July</span></p>
                          <p className="mt-1 text-sm text-gray-600 whitespace-nowrap">7:00 PM - 8:00 PM</p>
                          <span className="inline-block mt-1 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Completed</span>
                        </td>
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Guru Purnima</p>
                          <p className="mt-1">
                            <Link to="/services/guru-purnima-invitation" className="text-indian-saffron hover:underline font-medium text-sm">
                              View Programme Details
                            </Link>
                          </p>
                        </td>
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Celebration of Guru Purnima - the day dedicated to honoring spiritual teachers</p>
                          <p className="mt-1 text-sm text-gray-600">
                            (<a href="https://maps.app.goo.gl/UrNQXYUviohniWLw8" target="_blank" rel="noopener noreferrer" className="text-indian-saffron hover:underline">
                              Benvenuto Conference Centre
                            </a>)
                          </p>
                        </td>
                      </tr>
                      <tr className="opacity-60">
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Sunday, <span className="whitespace-nowrap">18th May</span></p>
                          <p className="mt-1 text-sm text-gray-600 whitespace-nowrap">10 AM - 12 PM</p>
                          <span className="inline-block mt-1 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Completed</span>
                        </td>
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Seminar</p>
                        </td>
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Sri Ramakrishna's Organisational Wisdom and the Early History of the Ramakrishna Movement in South Africa (1897-1965)</p>
                          <p className="mt-1 text-sm text-gray-600">
                            (<a href="https://maps.app.goo.gl/ZK2iWdaKs9o1nrQ27" target="_blank" rel="noopener noreferrer" className="text-indian-saffron hover:underline">
                              South African National Museum of Military History
                            </a>)
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-indian-saffron/5 opacity-60">
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Saturday, <span className="whitespace-nowrap">24th May</span></p>
                          <p className="mt-1 text-sm text-gray-600 whitespace-nowrap">7:30 - 9:30 AM</p>
                          <span className="inline-block mt-1 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Completed</span>
                        </td>
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">Nutrition Programme</td>
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Hamper Distribution</p>
                          <p className="mt-1 text-sm text-gray-600">(Lenasia)</p>
                        </td>
                      </tr>
                      <tr className="opacity-60">
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Saturday, <span className="whitespace-nowrap">24th May</span></p>
                          <p className="mt-1 text-sm text-gray-600 whitespace-nowrap">7:30 - 9:30 AM</p>
                          <span className="inline-block mt-1 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Completed</span>
                        </td>
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">Women's Empowerment Programme</td>
                        <td className="px-6 py-4 border-b border-indian-saffron/30 align-top">
                          <p>Skills development workshop</p>
                          <p className="mt-1 text-sm text-gray-600">(Lenasia)</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Mobile view - cards */}
                <div className="md:hidden space-y-6">

                  {/* Revered Swami Medhanandaji Event */}
                  <div className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 rounded-lg p-4 shadow-sm pop-shadow-card bg-indian-saffron/5">
                    <div className="font-semibold text-lg mb-2 bg-indian-saffron/20 p-2 rounded">Upcoming Event</div>
                    <div className="text-sm text-gray-600 mb-3">Date TBA</div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="font-medium">Event:</div>
                      <div>
                        <p>Special Programme</p>
                        <p className="mt-1">
                          <a href="/pics/Revered Swami Medhanandaji.pdf" target="_blank" rel="noopener noreferrer" className="text-indian-saffron hover:underline font-medium text-sm">
                            View Programme Details (PDF)
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="font-medium">Details:</div>
                      <div className="text-sm">
                        <p>Programme featuring Revered Swami Medhanandaji</p>
                        <p className="mt-2 text-gray-600">
                          (Venue TBA)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Welcome Reception Event */}
                  <div className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 rounded-lg p-4 shadow-sm pop-shadow-card bg-indian-saffron/5 opacity-60">
                    <div className="font-semibold text-lg mb-2 bg-indian-saffron/10 p-2 rounded">Monday, 28th July</div>
                    <div className="text-sm text-gray-600 mb-3">7:00 PM - 8:00 PM</div>
                    <span className="inline-block mb-3 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Completed</span>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="font-medium">Event:</div>
                      <div>
                        <p>Welcome Reception</p>
                        <p className="mt-1">
                          <Link to="/services/welcome-reception-invitation" className="text-indian-saffron hover:underline font-medium text-sm">
                            View Programme Details
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="font-medium">Details:</div>
                      <div className="text-sm">
                        <p>Welcome Reception for Revered Swami Shantatmanandaji Maharaj</p>
                        <p className="mt-2 text-gray-600">
                          (<a href="https://maps.app.goo.gl/4w3ncE7cXXHaZHqj9" target="_blank" rel="noopener noreferrer" className="text-indian-saffron hover:underline">
                            Eagle Canyon Golf Estate Conference Centre
                          </a>)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Special Programme Event */}
                  <div className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 rounded-lg p-4 shadow-sm pop-shadow-card bg-indian-saffron/5 opacity-60">
                    <div className="font-semibold text-lg mb-2 bg-indian-saffron/10 p-2 rounded">Saturday, 26th July</div>
                    <div className="text-sm text-gray-600 mb-3">4:00 PM - 5:45 PM</div>
                    <span className="inline-block mb-3 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Completed</span>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="font-medium">Event:</div>
                      <div>
                        <p>Special Programme</p>
                        <p className="mt-1">
                          <Link to="/services/special-programme-invitation" className="text-indian-saffron hover:underline font-medium text-sm">
                            View Programme Details
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="font-medium">Details:</div>
                      <div className="text-sm">
                        <p>Commemorating the History of the Ramakrishna Centre of South Africa</p>
                        <p className="mt-2 text-gray-600">
                          (<a href="https://g.co/kgs/HyfJkiY" target="_blank" rel="noopener noreferrer" className="text-indian-saffron hover:underline">
                            Boskruin Community Centre
                          </a>)
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          (Kelly Ave, Bromhof, Randburg, 2154)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Event 1 */}
                  <div className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 rounded-lg p-4 shadow-sm pop-shadow-card opacity-60">
                    <div className="font-semibold text-lg mb-2 bg-indian-saffron/10 p-2 rounded">Sunday, 18th May</div>
                    <div className="text-sm text-gray-600 mb-3">10 AM - 12 PM</div>
                    <span className="inline-block mb-3 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Completed</span>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="font-medium">Event:</div>
                      <div>
                        <p>Seminar</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="font-medium">Details:</div>
                      <div className="text-sm">
                        <p>Sri Ramakrishna's Organisational Wisdom and the Early History of the Ramakrishna Movement in South Africa (1897-1965)</p>
                        <p className="mt-2 text-gray-600">
                          (<a href="https://maps.app.goo.gl/ZK2iWdaKs9o1nrQ27" target="_blank" rel="noopener noreferrer" className="text-indian-saffron hover:underline">
                            South African National Museum of Military History
                          </a>)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Guru Purnima Event - Completed */}
                  <div className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 rounded-lg p-4 shadow-sm pop-shadow-card opacity-60">
                    <div className="font-semibold text-lg mb-2 bg-indian-saffron/10 p-2 rounded">Thursday, 10th July</div>
                    <div className="text-sm text-gray-600 mb-3">7:00 PM - 8:00 PM</div>
                    <span className="inline-block mb-3 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Completed</span>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="font-medium">Event:</div>
                      <div>
                        <p>Guru Purnima</p>
                        <p className="mt-1">
                          <Link to="/services/guru-purnima-invitation" className="text-indian-saffron hover:underline font-medium text-sm">
                            View Programme Details
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="font-medium">Details:</div>
                      <div className="text-sm">
                        <p>Celebration of Guru Purnima - the day dedicated to honoring spiritual teachers</p>
                        <p className="mt-2 text-gray-600">
                          (<a href="https://maps.app.goo.gl/UrNQXYUviohniWLw8" target="_blank" rel="noopener noreferrer" className="text-indian-saffron hover:underline">
                            Benvenuto Conference Centre
                          </a>)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 rounded-lg p-4 shadow-sm pop-shadow-card opacity-60">
                    <div className="font-semibold text-lg mb-2 bg-indian-saffron/10 p-2 rounded">Saturday, 24th May</div>
                    <div className="text-sm text-gray-600 mb-3">7:30 - 9:30 AM</div>
                    <span className="inline-block mb-3 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Completed</span>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="font-medium">Event:</div>
                      <div>Nutrition Programme</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">Details:</div>
                      <div>
                        <p>Hamper Distribution</p>
                        <p className="mt-1 text-sm text-gray-600">(Lenasia)</p>
                      </div>
                    </div>
                  </div>

                  {/* Event 3 */}
                  <div className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 rounded-lg p-4 shadow-sm pop-shadow-card opacity-60">
                    <div className="font-semibold text-lg mb-2 bg-indian-saffron/10 p-2 rounded">Saturday, 24th May</div>
                    <span className="inline-block mb-3 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Completed</span>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="font-medium">Event:</div>
                      <div>Women's Empowerment Programme</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">Details:</div>
                      <div>
                        <p>Skills development workshop</p>
                        <p className="mt-1 text-sm text-gray-600">(Lenasia)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-br from-indian-cream to-white rounded-lg border border-indian-saffron/30">
                  <h3 className="text-xl font-heading font-semibold mb-4">About Our Events</h3>
                  <p className="text-gray-700">
                    The Centre also holds special retreats, seminars, and workshops throughout the year.
                  </p>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SpecialFunctions;
