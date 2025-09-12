import React from 'react';
import TranslationLayout from '@/components/layout/TranslationLayout';
import NotFoundMessage from '@/components/learn/NotFoundMessage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const ReadFaqPage: React.FC = () => {
  if (!import.meta.env.DEV) {
    return (
      <NotFoundMessage
        title="Reading Section Unavailable"
        message="This development reading section is currently hidden in production."
        backTo="/read"
        backLabel="Back to Read Index"
      />
    );
  }

  return (
    <TranslationLayout title="Translations FAQ">
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-indian-saffron/30">
              <CardHeader>
                <CardTitle className="text-2xl">Translations FAQ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  Below are common questions about the community translations project for Swami Vivekananda's six Parliament lectures.
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  <Badge variant="secondary">Community Project</Badge>
                  <Badge variant="outline">Open & Moderated</Badge>
                  <Badge variant="outline">Human-first</Badge>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="q0">
                    <AccordionTrigger>Why do we highlight September 11 in this project?</AccordionTrigger>
                    <AccordionContent>
                      We wish to re-centre September 11 around Swami Vivekananda’s historic address delivered on 11 September 1893 at the World’s
                      Parliament of Religions—108 years before the tragic events of 2001. His message of universal acceptance, harmony, and
                      fearlessness is the spirit we aim to remember and spread through this translation effort.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q1">
                    <AccordionTrigger>What is the purpose of this exercise?</AccordionTrigger>
                    <AccordionContent>
                      Our aim is to make these foundational lectures accessible to as many people as possible, in their own languages, while
                      preserving fidelity, clarity, and cultural nuance. It is also an opportunity for the community to learn together,
                      reflect on the teachings, and contribute meaningfully.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q2">
                    <AccordionTrigger>Why translations?</AccordionTrigger>
                    <AccordionContent>
                      Many readers are more comfortable engaging with spiritual texts in their native language. Translations help broaden access,
                      foster understanding, and nurture local learning communities while honoring the original spirit of the lectures.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q3">
                    <AccordionTrigger>Why are we reading these six lectures?</AccordionTrigger>
                    <AccordionContent>
                      These six Parliament lectures are concise, historic, and highly impactful. They provide a powerful introduction to Vedanta and
                      interfaith harmony, making them ideal for a collaborative community translation project.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q4">
                    <AccordionTrigger>Why human translations when AI exists?</AccordionTrigger>
                    <AccordionContent>
                      AI can assist but often misses cultural context, tone, and subtle meaning—especially with spiritual material. We prioritize
                      human understanding and discernment. Moderation and reviewer guidance help ensure quality and respect.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q5">
                    <AccordionTrigger>Who can contribute translations?</AccordionTrigger>
                    <AccordionContent>
                      Anyone with any level of proficiency in a language can propose translations for that specific language. You can declare your
                      language proficiency on the <Link to="/read/profile" className="underline">Profile</Link> page. Beginners' submissions are
                      reviewed; Fluent/Native submissions may be auto-approved.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q6">
                    <AccordionTrigger>How does moderation and review work?</AccordionTrigger>
                    <AccordionContent>
                      Moderators and language reviewers check pending translations. Only reviewers assigned to a language can reject entries, and
                      only those who are Fluent/Native in a language can approve. Admins oversee assignments and can appoint reviewers.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q7">
                    <AccordionTrigger>How are new languages added?</AccordionTrigger>
                    <AccordionContent>
                      A language is considered for launch when it receives at least three requests from users who have declared any level of
                      proficiency in that language. You can request a language from the <Link to="/read/languages" className="underline">Languages</Link> page.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q8">
                    <AccordionTrigger>Can I request more than one language?</AccordionTrigger>
                    <AccordionContent>
                      Yes. You may request multiple languages as long as you have indicated any level of proficiency for each requested language
                      in your profile. This helps us prioritize languages with genuine contributor capacity.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q9">
                    <AccordionTrigger>How do I become a language reviewer?</AccordionTrigger>
                    <AccordionContent>
                      If you are Fluent or Native/Academic in a language, you can volunteer as a reviewer from your <Link to="/read/profile" className="underline">Profile</Link> page.
                      Admins review requests and, if approved, assign you to that language's moderation queue.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q10">
                    <AccordionTrigger>How is credit/attribution handled?</AccordionTrigger>
                    <AccordionContent>
                      Contributors are listed on the stats pages with role badges and language proficiency. Over time, we may add per-lecture
                      acknowledgments and leaderboards highlighting positive community contributions.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q11">
                    <AccordionTrigger>Can I help if I don’t have another language?</AccordionTrigger>
                    <AccordionContent>
                      Absolutely. You can help by proofreading English, suggesting clearer phrasing in context, reporting issues, and sharing the
                      project with others who may contribute translations.
                    </AccordionContent>
                  </AccordionItem>


                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TranslationLayout>
  );
};

export default ReadFaqPage;

