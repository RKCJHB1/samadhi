import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import SectionHeader from '../../components/shared/SectionHeader';
import Button from '../../components/shared/Button';
import { Card, CardContent } from '../../components/ui/card';
import { Gamepad2, Brain, Puzzle, Trophy, Image, Quote, AlignJustify } from 'lucide-react';
import ScrambleText from '../../components/animations/ScrambleText';

const GamesPage = () => {
  return (
    <PageLayout className="no-top-padding">
      <div className="w-full bg-gradient-to-br from-indian-cream to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron p-6 rounded-lg mb-6 pop-shadow-card">
              <h2 className="text-2xl font-heading font-semibold mb-4">Learning Through Play</h2>
              <p className="text-gray-700">
                Games are a powerful way to learn and retain knowledge. Our interactive games are designed to make learning about
                Hindu philosophy, mythology, and practices fun and engaging for children of all ages. Through play, complex concepts
                become more accessible and memorable.
              </p>
            </div>

            <SectionHeader
              title="Available Games"
              subtitle="Explore our collection of educational games"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <Card className="border-spiritual-200 bg-gradient-to-br from-spiritual-50 to-white pop-shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4">
                    <Trophy className="w-6 h-6 text-spiritual-500" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Sanskrit Word <ScrambleText text="SCRAMBLE" className="text-indian-saffron font-bold" /></h3>
                  <p className="text-gray-600 mb-4 text-justify">
                    Unscramble Sanskrit words and learn their meanings in this vocabulary-building game.
                    A fun way to become familiar with important terms in Hindu philosophy.
                  </p>
                  <Button href="/learn/games/word-scramble" variant="outline" size="sm">
                    Play Game
                  </Button>
                </CardContent>
              </Card>


              <Card className="border-spiritual-200 bg-gradient-to-br from-spiritual-50 to-white pop-shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4">
                    <Image className="w-6 h-6 text-spiritual-500" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Guess the Picture</h3>
                  <p className="text-gray-600 mb-4 text-justify">
                    Test your visual recognition skills as images are slowly revealed. Identify spiritual figures and symbols as quickly as you can.
                  </p>
                  <Button href="/learn/games/guess-picture" variant="outline" size="sm">
                    Play Game
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-spiritual-200 bg-gradient-to-br from-spiritual-50 to-white pop-shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4">
                    <AlignJustify className="w-6 h-6 text-spiritual-500" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Word Master</h3>
                  <p className="text-gray-600 mb-4 text-justify">
                    A Wordle-like game where players guess English words spoken by Sri Ramakrishna - from the original Bengali - Sri Sri Ramakrishna Kathamrita.
                  </p>
                  <Button href="/learn/games/wordle" variant="outline" size="sm">
                    Play Game
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-spiritual-200 bg-gradient-to-br from-spiritual-50 to-white pop-shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4">
                    <Quote className="w-6 h-6 text-spiritual-500" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Wisdom Quotes</h3>
                  <p className="text-gray-600 mb-4 text-justify">
                    Rearrange scrambled sentences to form real quotations from Sri Ramakrishna, Sri Sarada Devi, and Swami Vivekananda. Test your skills at different difficulty levels.
                  </p>
                  <Button href="/learn/games/quotes" variant="outline" size="sm">
                    Play Game
                  </Button>
                </CardContent>
              </Card>


            </div>

            <div className="mt-16">
              <SectionHeader
                title="Benefits of Game-Based Learning"
                subtitle="Why games are effective educational tools"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 border border-indian-saffron rounded-lg bg-gradient-to-br from-indian-cream to-white pop-shadow-card">
                  <h3 className="text-lg font-heading font-semibold mb-2">Active Engagement</h3>
                  <p className="text-gray-600 text-sm">
                    Games require active participation, keeping children engaged and focused on the learning material.
                  </p>
                </div>

                <div className="p-6 border border-indian-saffron rounded-lg bg-gradient-to-br from-indian-cream to-white pop-shadow-card">
                  <h3 className="text-lg font-heading font-semibold mb-2">Immediate Feedback</h3>
                  <p className="text-gray-600 text-sm">
                    Games provide instant feedback, helping children understand concepts and correct misconceptions.
                  </p>
                </div>

                <div className="p-6 border border-indian-saffron rounded-lg bg-gradient-to-br from-indian-cream to-white pop-shadow-card">
                  <h3 className="text-lg font-heading font-semibold mb-2">Intrinsic Motivation</h3>
                  <p className="text-gray-600 text-sm">
                    The fun and challenge of games create intrinsic motivation to learn and master the material.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GamesPage;
