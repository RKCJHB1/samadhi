import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import SectionHeader from '../../components/shared/SectionHeader';
import Button from '../../components/shared/Button';
import { Link } from 'react-router-dom';

const FundraisingPage = () => {
  return (
    <PageLayout title="Fundraising">
      <div className="min-h-screen w-full bg-gradient-to-br from-indian-cream to-white">
        <div className="w-full">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <SectionHeader
                title="Support the New Ashram Project"
                subtitle="Join us in building a spiritual home for generations to come"
                alignment="left"
              />

              <div className="prose prose-lg max-w-none mb-12">
                <p className="lead text-xl text-gray-700">
                  Your contribution to the New Ashram Project will help create a spiritual sanctuary that serves our community and upholds the teachings of Sri Ramakrishna, Holy Mother Sri Sarada Devi, and Swami Vivekananda for generations to come.
                </p>

                {/* Fundraising Progress */}
                <div className="my-10 bg-gradient-to-r from-indian-cream to-white p-6 rounded-lg shadow-sm border border-indian-saffron/30 pop-shadow-card">
                  <h3 className="text-2xl font-heading font-semibold mb-4">Fundraising Progress</h3>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Current: R9,400,000</span>
                    <span className="font-medium">Goal: R60,000,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-1 relative">
                    <div
                      className="bg-spiritual-500 h-4 rounded-full"
                      style={{ width: '15.7%' }}
                    ></div>
                    {/* Phase 1 sub-goal marker */}
                    <div className="absolute top-0 bottom-0" style={{ left: '41.7%' }}>
                      <div className="h-6 w-0.5 bg-indian-saffron absolute -top-1"></div>
                      <div className="w-3 h-3 rounded-full bg-indian-saffron absolute -top-4 -ml-1.5"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span></span>
                    <span className="text-indian-saffron font-medium" style={{ marginRight: '55%' }}>
                      Phase 1 Goal: R25M
                    </span>
                  </div>

                  {/* Phase 1 progress mini-bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Phase 1 Progress: 37.6% complete</span>
                      <span className="text-gray-600">R9.4M of R25M</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indian-saffron h-2 rounded-full"
                        style={{ width: '37.6%' }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 text-center">
                    15.7% of overall goal reached. Thank you to all our donors!
                  </p>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    *Note: These are approximate values and may vary slightly. The R25M sub-goal represents the amount needed to complete Phase 1 of the project. We have currently raised 37.6% of the funds needed for Phase 1. The funding goals are preliminary estimates. More accurate estimates will be provided once the QS costing proposals are finalized.
                  </p>
                  <div className="mt-3 p-3 bg-spiritual-50 rounded-md border border-indian-saffron/20">
                    <p className="font-medium text-indian-saffron mb-2 text-center">Phase 1 includes:</p>
                    <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                      <li>Clearing and excavation work</li>
                      <li>Construction of boundary and retaining walls</li>
                      <li>Construction of Swami Vivekananda Skills Development Centre</li>
                      <li>Construction of Temple</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-heading font-semibold mb-4">How to Donate</h3>
                <p>
                  We offer several convenient ways to contribute to the New Ashram Project listed below. If you would like to contribute goods/services, please <Link to="/contact" className="text-indian-saffron hover:underline">contact us</Link>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="space-y-6">
                    <div className="p-4 border border-indian-saffron/30 rounded-lg shadow-sm bg-gradient-to-r from-indian-cream to-white flex flex-col justify-between pop-shadow-card">
                      <div>
                        <h4 className="text-xl font-heading font-semibold mb-2">Online Donation</h4>
                        <p className="mb-3">
                          Make a secure online donation through our payment portal. All major credit cards accepted.
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                          Support the New Ashram Project with your generous contribution.
                        </p>
                      </div>
                      <Link to="/donate" className="self-start">
                        <Button>
                          Donate Online
                        </Button>
                      </Link>
                    </div>

                    <div className="p-4 border border-indian-saffron/30 rounded-lg shadow-sm bg-gradient-to-r from-indian-cream to-white pop-shadow-card">
                      <h4 className="text-xl font-heading font-semibold mb-2">Tax Benefits</h4>
                      <p className="mb-3">
                        The Ramakrishna Centre of South Africa is a registered non-profit organization. Certain local donations to the Centre may qualify for Section 18A taxation benefits from SARS.
                      </p>
                      <p className="text-sm">
                        Please consult a tax advisor to understand your tax implications.
                      </p>
                    </div>

                    <div className="p-4 border border-indian-saffron/30 rounded-lg shadow-sm bg-gradient-to-r from-indian-cream to-white pop-shadow-card">
                      <h4 className="text-xl font-heading font-semibold mb-2">Inspiration</h4>
                      <blockquote className="italic text-gray-700 border-l-4 border-spiritual-500 pl-4 py-2">
                        "It is our privilege to be allowed to be charitable, for only so can we grow. The poor man suffers that we may be helped; let the giver kneel down and give thanks, let the receiver stand up and permit. See the Lord back of every being and give to Him."
                      </blockquote>
                      <p className="text-right text-sm mt-2 font-medium">— Swami Vivekananda</p>
                    </div>
                  </div>

                  <div className="p-6 border border-indian-saffron/30 rounded-lg shadow-sm bg-gradient-to-r from-indian-cream to-white h-full pop-shadow-card">
                    <h4 className="text-xl font-heading font-semibold mb-3">Bank Transfer</h4>
                    <p className="mb-4">
                      You can make a direct deposit or EFT to our building fund account:
                    </p>
                    <div className="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg text-sm border border-indian-saffron/20">
                      <p><strong>Acc Name:</strong> The Ramakrishna Centre of South Africa, Johannesburg</p>
                      <p><strong>Acc Type:</strong> Business Account</p>
                      <p><strong>Bank:</strong> First National Bank</p>
                      <p><strong>Branch Code:</strong> 200607</p>
                      <p><strong>Branch Name:</strong> 4 Merchant Place 390</p>
                      <p><strong>Acc Number:</strong> 62858238035</p>
                      <p><strong>Swift Code:</strong> FIRNZAJJ</p>
                      <p><strong>Reference:</strong> Your name</p>
                    </div>
                    <div className="mt-4 text-sm bg-gradient-to-br from-indian-cream to-white p-3 rounded-lg border border-indian-saffron/20">
                      <p><strong>Please Note:</strong> Kindly forward proof of deposit to the following email address for ease of issuing receipts:</p>
                      <p className="font-medium">johannesburg@ramakrishna-phoenix.org.za</p>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-12">
                  <p className="text-xl font-semibold mb-6">
                    Every contribution makes a difference
                  </p>
                  <Link to="/donate">
                    <Button size="lg">
                      Donate Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FundraisingPage;
