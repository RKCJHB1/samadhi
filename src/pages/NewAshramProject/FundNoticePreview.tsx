import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';

const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029VbE4YeY89ino9wbDMA0f';

function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function looksLikePhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

type NoticeMethod = 'email' | 'whatsapp';

const FundNoticePreview = () => {
  const [method, setMethod] = useState<NoticeMethod>('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState<NoticeMethod | null>(null);

  useEffect(() => {
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    return () => {
      document.head.removeChild(robots);
    };
  }, []);

  const choose = (next: NoticeMethod) => {
    setMethod(next);
    setError('');
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (method === 'email') {
      if (!looksLikeEmail(email)) {
        setError('Enter an email address.');
        setDone(null);
        return;
      }
      setError('');
      setDone('email');
      return;
    }
    if (name.trim().length < 2) {
      setError('Enter your name.');
      setDone(null);
      return;
    }
    if (!looksLikePhone(phone)) {
      setError('Enter a mobile number.');
      setDone(null);
      return;
    }
    setError('');
    setDone('whatsapp');
    if (WHATSAPP_CHANNEL_URL) {
      window.open(WHATSAPP_CHANNEL_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <PageLayout title="Building appeal notice">
      <div className="min-h-screen w-full bg-gradient-to-br from-indian-cream to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto">
            <p className="text-sm text-gray-600">
              Preview only. This form does not save an address yet.
            </p>

            <h1 className="mt-8 font-heading text-3xl font-bold text-black md:text-4xl">
              Hear when the building appeal begins
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              The next fundraising appeal for the new ashram is not open yet. Leave an email address, or add your name and mobile number and subscribe on the WhatsApp channel.
            </p>

            <div className="mt-8 rounded-lg border border-indian-saffron/30 bg-gradient-to-br from-indian-cream to-white p-6 shadow-sm">
              {done === 'email' && (
                <p className="text-lg text-gray-800" role="status">
                  Thank you. That address will be kept only to announce the appeal.
                </p>
              )}
              {done === 'whatsapp' && (
                <div role="status">
                  <p className="text-lg text-gray-800">
                    Thank you. Those details will be kept only to announce the appeal.
                  </p>
                  {WHATSAPP_CHANNEL_URL ? (
                    <a
                      href={WHATSAPP_CHANNEL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block rounded-md bg-spiritual-500 px-5 py-3 font-medium text-white hover:bg-spiritual-600"
                    >
                      Open the WhatsApp channel
                    </a>
                  ) : (
                    <p className="mt-3 text-gray-700">
                      The channel follow link still needs to be added before this can open WhatsApp.
                    </p>
                  )}
                </div>
              )}
              {done === null && (
                <form onSubmit={submit} noValidate>
                  <fieldset>
                    <legend className="font-heading text-lg text-black">How should we reach you?</legend>
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <label className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-3 ${method === 'email' ? 'border-spiritual-500 bg-white' : 'border-indian-saffron/40 bg-white/60'}`}>
                        <input
                          type="radio"
                          name="notice-method"
                          value="email"
                          checked={method === 'email'}
                          onChange={() => choose('email')}
                        />
                        Email
                      </label>
                      <label className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-3 ${method === 'whatsapp' ? 'border-spiritual-500 bg-white' : 'border-indian-saffron/40 bg-white/60'}`}>
                        <input
                          type="radio"
                          name="notice-method"
                          value="whatsapp"
                          checked={method === 'whatsapp'}
                          onChange={() => choose('whatsapp')}
                        />
                        WhatsApp channel
                      </label>
                    </div>
                  </fieldset>

                  {method === 'email' ? (
                    <div className="mt-6">
                      <label htmlFor="notice-email" className="block font-heading text-lg text-black">
                        Email address
                      </label>
                      <input
                        id="notice-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="mt-3 w-full rounded-md border border-indian-saffron/40 bg-white px-3 py-3 text-black outline-none focus:border-indian-saffron"
                      />
                    </div>
                  ) : (
                    <div className="mt-6 space-y-4">
                      <div>
                        <label htmlFor="notice-name" className="block font-heading text-lg text-black">
                          Your name
                        </label>
                        <input
                          id="notice-name"
                          type="text"
                          name="name"
                          autoComplete="name"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          className="mt-3 w-full rounded-md border border-indian-saffron/40 bg-white px-3 py-3 text-black outline-none focus:border-indian-saffron"
                        />
                      </div>
                      <div>
                        <label htmlFor="notice-phone" className="block font-heading text-lg text-black">
                          Mobile number
                        </label>
                        <input
                          id="notice-phone"
                          type="tel"
                          name="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          className="mt-3 w-full rounded-md border border-indian-saffron/40 bg-white px-3 py-3 text-black outline-none focus:border-indian-saffron"
                        />
                      </div>
                    </div>
                  )}

                  {error && <p className="mt-2 text-sm text-red-700" role="alert">{error}</p>}
                  <button
                    type="submit"
                    className="mt-4 rounded-md bg-spiritual-500 px-5 py-3 font-medium text-white hover:bg-spiritual-600"
                  >
                    {method === 'email' ? 'Let me know' : 'Subscribe on WhatsApp'}
                  </button>
                </form>
              )}
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
