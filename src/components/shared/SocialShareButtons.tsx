import React from 'react';
import { Facebook, Twitter, Share2 } from 'lucide-react';

interface PreparedShare {
  url?: string;
  title?: string;
  description?: string;
  twitterText?: string;
  whatsappText?: string;
  facebookQuote?: string;
}

interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
  path?: string; // Optional path to use for absolute URL composition
  // Per-platform overrides
  twitterText?: string;
  whatsappText?: string;
  facebookQuote?: string;
  label?: string;
  labelClassName?: string;
  // Return null to cancel the share, for example when a group link could not be saved.
  prepareShare?: () => Promise<PreparedShare | null | void>;
}

const getSiteOrigin = () => {
  const envOrigin = import.meta.env.VITE_SITE_ORIGIN as string | undefined;
  if (envOrigin) return envOrigin.replace(/\/$/, ''); // trim trailing slash
  // Fallbacks: use production domain in dev if localhost, else current origin
  if (typeof window !== 'undefined') {
    const { origin, hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')) {
      return 'https://ramakrishna-johannesburg.org.za';
    }
    return origin;
  }
  return 'https://ramakrishna-johannesburg.org.za';
};

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  url,
  title = 'Check out this content on Ramakrishna Centre, Johannesburg',
  description = 'I found this interesting page on the Ramakrishna Centre, Johannesburg website.',
  className = '',
  path,
  twitterText,
  whatsappText,
  facebookQuote,
  label = 'Share:',
  labelClassName = 'text-sm text-gray-600 mr-1',
  prepareShare,
}) => {
  // Determine the URL to share
  const getShareUrl = () => {
    // If a specific URL is provided, use that
    if (url) return url;

    const origin = getSiteOrigin();

    // If a path is provided, compose an absolute URL using the configured origin
    if (path) {
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `${origin}${cleanPath}`;
    }

    // Otherwise use the current URL
    if (typeof window !== 'undefined') return window.location.href;

    // SSR safety fallback
    return `${origin}/`;
  };

  const shareUrl = getShareUrl();
  const trimToLength = (s: string, n: number) => (s && s.length > n ? `${s.slice(0, n - 1)}…` : s);
  const twitterRaw = (twitterText ?? title ?? '').toString();
  const whatsappRaw = (whatsappText ?? title ?? '').toString();
  const facebookQuoteRaw = (facebookQuote ?? title ?? '').toString();

  const handleShareClick = async (platform: 'facebook' | 'twitter' | 'whatsapp') => {
    // Open during the click so the share window survives the time spent saving a group link.
    const popup = prepareShare ? window.open('', '_blank', 'width=600,height=400') : null;
    let prepared: PreparedShare | null | void = undefined;
    if (prepareShare) {
      try {
        prepared = await prepareShare();
      } catch {
        popup?.close();
        return;
      }
      if (!prepared) {
        popup?.close();
        return;
      }
    }
    const nextUrl = prepared?.url || shareUrl;
    const nextTitle = prepared?.title || title;
    const encodedNextUrl = encodeURIComponent(nextUrl);
    const nextTwitter = encodeURIComponent(trimToLength((prepared?.twitterText ?? twitterRaw).toString(), 280));
    const nextWhatsApp = encodeURIComponent((prepared?.whatsappText ?? whatsappRaw).toString());
    const nextFacebook = encodeURIComponent((prepared?.facebookQuote ?? facebookQuoteRaw ?? nextTitle).toString());
    const destination = platform === 'facebook'
      ? `https://www.facebook.com/sharer/sharer.php?u=${encodedNextUrl}&quote=${nextFacebook}`
      : platform === 'twitter'
        ? `https://twitter.com/intent/tweet?url=${encodedNextUrl}&text=${nextTwitter}`
        : `https://api.whatsapp.com/send?text=${nextWhatsApp}%20${encodedNextUrl}`;
    if (popup) popup.location.href = destination;
    else window.open(destination, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <span className={labelClassName}>{label}</span>

      {/* Facebook */}
      <button
        type="button"
        onClick={() => { void handleShareClick('facebook'); }}
        className="p-2 sm:p-2.5 rounded-full bg-spiritual-50 hover:bg-spiritual-100 text-spiritual-600 transition-colors shadow-sm"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <Facebook size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
      </button>

      {/* Twitter */}
      <button
        type="button"
        onClick={() => { void handleShareClick('twitter'); }}
        className="p-2 sm:p-2.5 rounded-full bg-spiritual-50 hover:bg-spiritual-100 text-spiritual-600 transition-colors shadow-sm"
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        <Twitter size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
      </button>

      {/* WhatsApp - More prominent on mobile */}
      <button
        type="button"
        onClick={() => { void handleShareClick('whatsapp'); }}
        className="p-2 sm:p-2.5 rounded-full bg-green-50 hover:bg-green-100 text-green-600 transition-colors shadow-sm"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <Share2 size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
      </button>
    </div>
  );
};

export default SocialShareButtons;
