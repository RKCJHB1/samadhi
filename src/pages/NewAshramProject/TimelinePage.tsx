import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import SectionHeader from '../../components/shared/SectionHeader';
import Button from '../../components/shared/Button';
import { CheckCircle, Circle } from 'lucide-react';

const TimelinePage = () => {
  const phases = [
    {
      title: "Phase 1: Land Acquisition",
      period: "December 2019",
      items: [
        "Formation of the Building Committee",
        "Site selection and evaluation",
        "Land purchase negotiations",
        "Securing property ownership"
      ],
      isCompleted: true
    },
    {
      title: "Phase 2: Zoning, Acquisition of Authorizations",
      period: "June 2022",
      items: [
        "Zoning from previous farm land",
        "Environmental Impact Assessment (EIA) reports",
        "Wetlands assessment",
        "Water Use License Application (WULA) licenses",
        "Other required permits and authorizations"
      ],
      isCompleted: true
    },
    {
      title: "Phase 3: Planning and Design",
      period: "2019 - April 2025",
      items: [
        "Needs assessment and requirement gathering",
        "Architectural concept development",
        "Detailed architectural plans",
        "Engineering specifications",
        "Budget finalization"
      ],
      isCompleted: true
    },
    {
      title: "Phase 4: Submission to Council for Approval",
      period: "November 2025",
      items: [
        "Preparation for submission of building plans",
        "Council review process",
        "Addressing any council requirements",
        "Final approval from local authorities"
      ],
      isCompleted: false,
      isCurrent: true
    },
    {
      title: "Phase 5: Construction (9 months)",
      period: "Projected to commence: As soon as approval is granted",
      items: [
        "Groundbreaking ceremony",
        "Foundation work",
        "Building construction",
        "Interior development",
        "Landscaping and exterior work"
      ],
      isCompleted: false
    }
  ];

  return (
    <PageLayout title="Timeline & Progress">
      <div className="min-h-screen w-full bg-gradient-to-br from-indian-cream to-white">
        <div className="w-full">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <SectionHeader
                title="Timeline & Progress"
                subtitle="Following our journey from vision to reality"
                alignment="left"
              />

              <div className="prose prose-lg max-w-none mb-12">
                <div className="bg-gradient-to-r from-indian-cream to-white border border-indian-saffron/30 p-6 rounded-lg mb-8 pop-shadow-card">
                  <h3 className="text-2xl font-heading font-semibold mb-4">Project Timeline</h3>
                  <p className="mb-6">
                    Our New Ashram Project is progressing through several carefully planned phases. Below is our current timeline, with updates on our progress.
                  </p>

                  <div className="space-y-12 mt-8">
                    {phases.map((phase, index) => (
                      <div key={index} className="relative bg-gradient-to-br from-indian-cream to-white p-6 rounded-lg border border-indian-saffron/30 shadow-sm pop-shadow-card">
                        <div className="absolute left-1 top-6 w-6 h-6 flex items-center justify-center">
                          {phase.isCompleted ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : phase.isCurrent ? (
                            <div className="w-6 h-6 rounded-full bg-blue-500 animate-pulse" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className={`mb-2 ml-2 ${phase.isCompleted ? 'text-green-600' : phase.isCurrent ? 'text-blue-600' : 'text-gray-600'} font-semibold text-lg`}>
                          {phase.title}
                        </div>
                        <div className="text-sm text-gray-500 mb-3 ml-2">{phase.period}</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-2">
                          {phase.items.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="inline-block w-2 h-2 rounded-full bg-indian-saffron mt-2 ml-4"></span>
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                        {phase.isCurrent && (
                          <div className="mt-4 pt-4 border-t border-gray-200 ml-2">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className="bg-blue-500 h-3 rounded-full"
                                  style={{ width: '90%' }}
                                ></div>
                              </div>
                              <span className="ml-2 text-sm text-gray-600">90% Complete</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl font-heading font-semibold mt-12 mb-4">Current Progress</h3>
                <div className="bg-gradient-to-r from-indian-cream to-white border border-indian-saffron/30 p-6 rounded-lg mb-8 pop-shadow-card">
                  <p className="mb-4">
                    We are currently in <strong>Phase 4</strong> of our project, focused on obtaining council approval for our building plans. We are 90% complete with this phase. Recent developments include:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="bg-gradient-to-br from-indian-cream to-white p-3 rounded border border-indian-saffron/20 pop-shadow-card">
                      Preparation for submission of complete building plans to local authorities
                    </li>
                    <li className="bg-gradient-to-br from-indian-cream to-white p-3 rounded border border-indian-saffron/20 pop-shadow-card">
                      Engagement with council officials to address technical queries
                    </li>
                    <li className="bg-gradient-to-br from-indian-cream to-white p-3 rounded border border-indian-saffron/20 pop-shadow-card">
                      Preparation for construction tenders pending approval
                    </li>
                    <li className="bg-gradient-to-br from-indian-cream to-white p-3 rounded border border-indian-saffron/20 pop-shadow-card">
                      Continued fundraising efforts for the construction phase
                    </li>
                  </ul>
                </div>

                <div className="text-center mt-12">
                  <p className="text-xl font-semibold mb-6">
                    Help us reach our next milestone
                  </p>
                  <Button href="/new-ashram-project/fundraising" size="lg">
                    Contribute Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TimelinePage;
