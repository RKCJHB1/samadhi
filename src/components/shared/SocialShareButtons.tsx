import React from 'react';
import { Facebook, Twitter, Share2 } from 'lucide-react';

interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
  path?: string; // Optional path to use for absolute URL composition
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

  // Encode parameters for sharing
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  // Share URLs for different platforms
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;

  // Function to handle share button clicks
  const handleShareClick = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <span className="text-sm text-gray-600 mr-1">Share:</span>

      {/* Facebook */}
      <button
        onClick={() => handleShareClick(facebookShareUrl)}
        className="p-2 sm:p-2.5 rounded-full bg-spiritual-50 hover:bg-spiritual-100 text-spiritual-600 transition-colors shadow-sm"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <Facebook size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
      </button>

      {/* Twitter */}
      <button
        onClick={() => handleShareClick(twitterShareUrl)}
        className="p-2 sm:p-2.5 rounded-full bg-spiritual-50 hover:bg-spiritual-100 text-spiritual-600 transition-colors shadow-sm"
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        <Twitter size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
      </button>

      {/* WhatsApp - More prominent on mobile */}
      <button
        onClick={() => handleShareClick(whatsappShareUrl)}
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
