import { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Share2, 
  BellRing, 
  Info, 
  Sparkles, 
  Check, 
  Loader2, 
  ChevronLeft, 
  ChevronRight,
  Volume2,
  Download,
  Clock,
  Lock,
  Unlock,
  Facebook,
  Twitter,
  Mail,
  Link2,
  Copy,
  Image
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PRELOADED_EVENTS } from "../data/historyData";

const belurMathImg = "/images/on-this-day/belur_math_dawn_1780135313015.png";
const spiritualLampImg = "/images/on-this-day/spiritual_lamp_1780135335224.png";
const lotusDawnImg = "/images/on-this-day/lotus_dawn_1780135818630.png";

// Calendar structural definitions for precise day-to-day navigation
const MONTH_DEFS = [
  { name: "January", days: 31 },
  { name: "February", days: 29 }, // Supports 29 days for high compatibility
  { name: "March", days: 31 },
  { name: "April", days: 30 },
  { name: "May", days: 31 },
  { name: "June", days: 30 },
  { name: "July", days: 31 },
  { name: "August", days: 31 },
  { name: "September", days: 30 },
  { name: "October", days: 31 },
  { name: "November", days: 30 },
  { name: "December", days: 31 }
];

const getSASTTime = () => {
  const today = new Date();
  const utcTime = today.getTime() + (today.getTimezoneOffset() * 60000);
  return new Date(utcTime + (2 * 3600000)); // UTC+2
};

const isFutureDateInYear = (monthName: string, day: number) => {
  try {
    if (new URLSearchParams(window.location.search).get('preview') === 'true') {
      return false;
    }
  } catch (e) {
    // ignore
  }
  const saDate = getSASTTime();
  const currentMonthIdx = saDate.getMonth();
  const currentDayVal = saDate.getDate();
  const targetMonthIdx = MONTH_DEFS.findIndex(m => m.name === monthName);

  if (targetMonthIdx > currentMonthIdx) return true;
  if (targetMonthIdx === currentMonthIdx && day > currentDayVal) return true;
  return false;
};

const isBeforeLaunchDate = (monthName: string, day: number) => {
  try {
    if (new URLSearchParams(window.location.search).get('preview') === 'true') {
      return false;
    }
  } catch (e) {
    // ignore
  }
  const targetMonthIdx = MONTH_DEFS.findIndex(m => m.name === monthName);
  const launchMonthIdx = 4; // May
  const launchDayVal = 31;

  if (targetMonthIdx < launchMonthIdx) return true;
  if (targetMonthIdx === launchMonthIdx && day < launchDayVal) return true;
  return false;
};

interface HistoryEvent {
  id?: string;
  date: string;
  year: string;
  headline: string;
  narrativeParagraph1: string;
  narrativeParagraph2: string;
  quote: string;
  quoteAuthor: string;
  imageCaption: string;
  customImage?: string;
  customImages?: string[];
  isAiGenerated?: boolean;
  isFallback?: boolean;
  isQuotaExceeded?: boolean;
}

export default function OnThisDay() {
  // Read date from URL search parameters if available, else default to current date in South Africa Standard Time (UTC+2)
  const getInitialDate = () => {
    const saDate = getSASTTime();
    const currentMonthName = MONTH_DEFS[saDate.getMonth()].name;
    const currentDayVal = saDate.getDate();

    try {
      const params = new URLSearchParams(window.location.search);
      const urlDateStr = params.get("date"); // formats: "May-31" or "05-31"
      if (urlDateStr) {
        const parts = urlDateStr.split("-");
        if (parts.length === 2) {
          const mPart = parts[0].trim();
          const dPart = parseInt(parts[1], 10);

          // Match month name or number
          const mIndex = isNaN(Number(mPart))
            ? MONTH_DEFS.findIndex(m => m.name.toLowerCase().startsWith(mPart.toLowerCase()))
            : parseInt(mPart, 10) - 1;

          if (mIndex >= 0 && mIndex < 12 && !isNaN(dPart) && dPart >= 1 && dPart <= MONTH_DEFS[mIndex].days) {
            const mName = MONTH_DEFS[mIndex].name;
            if (isFutureDateInYear(mName, dPart)) {
              return { month: currentMonthName, day: currentDayVal };
            } else if (isBeforeLaunchDate(mName, dPart)) {
              return { month: "May", day: 31 }; // Launch date fallback
            } else {
              return { month: mName, day: dPart };
            }
          }
        }
      }
    } catch (e) {
      console.warn("Could not parse initial date from URL:", e);
    }

    if (isBeforeLaunchDate(currentMonthName, currentDayVal)) {
      return { month: "May", day: 31 };
    }

    return { month: currentMonthName, day: currentDayVal };
  };

  const initialDate = getInitialDate();
  const [selectedMonth, setSelectedMonth] = useState<string>(initialDate.month);
  const [selectedDay, setSelectedDay] = useState<number>(initialDate.day);
  
  // Multiple events state
  const [eventsList, setEventsList] = useState<HistoryEvent[]>([]);
  const [activeEventIndex, setActiveEventIndex] = useState<number>(0);

  // Derived active event data
  const eventData = eventsList[activeEventIndex] || null;
  
  // UI States
  const [loading, setLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isJumpModalOpen, setIsJumpModalOpen] = useState<boolean>(false);
  const [showSocialShare, setShowSocialShare] = useState<boolean>(false);
  const [copiedTextPanel, setCopiedTextPanel] = useState<boolean>(false);
  const [isGeneratingCard, setIsGeneratingCard] = useState<boolean>(false);
  const [shareCardSupported, setShareCardSupported] = useState<boolean>(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.share && navigator.canShare) {
      try {
        const mockFile = new File(["test"], "test.png", { type: "image/png" });
        if (navigator.canShare({ files: [mockFile] })) {
          setShareCardSupported(true);
        }
      } catch (e) {
        console.log("canShare check failed:", e);
      }
    }
  }, []);

  // Update Document Title and Meta Tags for SEO dynamically
  useEffect(() => {
    const title = eventData
      ? `On This Day (${selectedMonth} ${selectedDay}): ${eventData.headline} - Ramakrishna Movement`
      : `On This Day (${selectedMonth} ${selectedDay}) - Ramakrishna Movement History`;

    const description = eventData
      ? `Chronicle of ${eventData.year || "History"}: ${eventData.narrativeParagraph1?.substring(0, 150)}...`
      : "Discover how today is woven into the legacy of the Ramakrishna Movement. From its earliest roots to over 125 years since Swami Vivekananda's return from the West, this daily chronicle brings you the milestones that happened on this very day in some years past.";

    // Update main browser tab title
    document.title = title;

    // Helper to safely update or create a meta tag
    const setMetaTag = (nameOrProperty: 'name' | 'property', key: string, value: string) => {
      let element = document.querySelector(`meta[${nameOrProperty}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameOrProperty, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // Standard SEO Tags
    setMetaTag('name', 'description', description);

    // Open Graph (Facebook, LinkedIn, iMessage, etc.)
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', window.location.href);

    // Dynamic sharing image resolution
    const imageToUse = eventData?.customImage || eventData?.customImages?.[0] || belurMathImg;
    const fullImageUrl = imageToUse.startsWith('http')
      ? imageToUse
      : `https://ramakrishna-johannesburg.org.za${imageToUse}`;

    setMetaTag('property', 'og:image', fullImageUrl);

    // Twitter / X Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImageUrl);

  }, [eventData, selectedMonth, selectedDay]);
  
  // Media slideshow states
  const [slideshowIndex, setSlideshowIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [bellRinging, setBellRinging] = useState<boolean>(false);

  // South African Standard Time (SAST, UTC+2) Clock & State Gating
  const [saClockStr, setSaClockStr] = useState<string>("");
  const [saFullDate, setSaFullDate] = useState<string>("");
  const [saCountdownStr, setSaCountdownStr] = useState<string>("");


  // CMS logic removed

  // Clock ticking effect
  useEffect(() => {
    const updateSAClock = () => {
      const saDate = getSASTTime();
      const hh = saDate.getHours();
      const mm = saDate.getMinutes();
      const ss = saDate.getSeconds();
      
      setSaClockStr(`${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`);
      setSaFullDate(`${MONTH_DEFS[saDate.getMonth()].name} ${saDate.getDate()}`);
      
      // Calculate remaining time until South African Midnight (23:59:59)
      const secondsLeft = 59 - ss;
      const minutesLeft = 59 - mm;
      const hoursLeft = 23 - hh;
      setSaCountdownStr(`${String(hoursLeft).padStart(2, "0")}h ${String(minutesLeft).padStart(2, "0")}m ${String(secondsLeft).padStart(2, "0")}s`);
    };

    updateSAClock();
    const interval = setInterval(updateSAClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Slideshow references
  const getSlideshowImages = () => {
    const defaultSlides = [
      {
        src: belurMathImg,
        captionHeading: "Belur Math at Dawn",
        defaultCaption: "The pristine main temple of Belur Math standing peacefully along the holy river Ganges."
      },
      {
        src: spiritualLampImg,
        captionHeading: "A Sacred Offering of Light",
        defaultCaption: "The warm, serene glow of a traditional clay lamp, reflecting spiritual awakening and inner wisdom."
      },
      {
        src: lotusDawnImg,
        captionHeading: "Lotus of Dawn",
        defaultCaption: "A pristine blooming lotus flower floating on calm sacred waters at sunrise, symbolizing spiritual purity."
      }
    ];

    if (eventData) {
      const customSlides: typeof defaultSlides = [];
      if (eventData.customImages && eventData.customImages.length > 0) {
        eventData.customImages.forEach(imgUrl => {
          customSlides.push({
            src: imgUrl,
            captionHeading: eventData.headline || "Chronicled Milestone",
            defaultCaption: eventData.imageCaption || "Historical picture uploaded for this chronicle."
          });
        });
      } else if (eventData.customImage) {
        customSlides.push({
          src: eventData.customImage,
          captionHeading: eventData.headline || "Chronicled Milestone",
          defaultCaption: eventData.imageCaption || "Historical picture uploaded for this chronicle."
        });
      }

      if (customSlides.length > 0) {
        return customSlides;
      }
    }

    return defaultSlides;
  };

  const slideshowImages = getSlideshowImages();
  const safeSlideshowIndex = ((slideshowIndex % slideshowImages.length) + slideshowImages.length) % slideshowImages.length;
  const currentSlide = slideshowImages[safeSlideshowIndex] || slideshowImages[0];

  // Map month name to index
  const getMonthIndex = (monthName: string) => {
    return MONTH_DEFS.findIndex(m => m.name === monthName);
  };

  const currentMonthDef = MONTH_DEFS[getMonthIndex(selectedMonth)];
  const nextMonthName = selectedDay < (currentMonthDef?.days || 31)
    ? selectedMonth
    : MONTH_DEFS[(getMonthIndex(selectedMonth) + 1) % 12].name;
  const nextDayNum = selectedDay < (currentMonthDef?.days || 31)
    ? selectedDay + 1
    : 1;
  const isNextDisabled = isFutureDateInYear(nextMonthName, nextDayNum);

  const prevMonthName = selectedDay > 1
    ? selectedMonth
    : MONTH_DEFS[(getMonthIndex(selectedMonth) - 1 + 12) % 12].name;
  const prevDayNum = selectedDay > 1
    ? selectedDay - 1
    : MONTH_DEFS[(getMonthIndex(selectedMonth) - 1 + 12) % 12].days;
  const isPrevDisabled = isBeforeLaunchDate(prevMonthName, prevDayNum);

  // Synchronous Fetch (now purely static without API)
  useEffect(() => {
    let active = true;
    const fetchHistory = () => {
      setLoading(true);
      setApiError(null);

      const searchDateStr = `${selectedMonth} ${selectedDay}`;

      // Filter from static data
      const localMatches = PRELOADED_EVENTS.filter(
        e => String(e.date).toLowerCase() === searchDateStr.toLowerCase()
      );

      if (localMatches.length > 0) {
        const convertedEvents: HistoryEvent[] = localMatches.map(event => ({
          date: event.date,
          year: String(event.year),
          headline: event.headline,
          narrativeParagraph1: event.narrativeParagraph1,
          narrativeParagraph2: event.narrativeParagraph2,
          quote: event.quote,
          quoteAuthor: event.quoteAuthor,
          imageCaption: event.imageCaption,
          customImage: event.customImage,
          customImages: event.customImages
        }));
        setEventsList(convertedEvents);
      } else {
        // Fallback for days with no events
        const dailyThemes = [
          {
            headline: "The Echoes of Divine Consecration and Contemplation",
            narrative1: `During this serene season in Ramakrishna Order history, the various centers in India and across the globe emphasize silent contemplation, personal meditation, and intensive scripture study. Sri Ramakrishna repeatedly emphasized that while active work is essential for spiritual growth, one must also withdraw into solitude occasionally to quiet the intellect and strengthen inner devotion.`,
            narrative2: `Reflecting on this spiritual rhythm, devotees are encouraged to build a mini-shrine of quietude in their own hearts. Whether walking by the sacred Ganges at Belur Math or performing simple duties in a busy metropolis, the goal remains identical: transforming daily work into a continuous flow of mindfulness and divine worship.`,
            quote: "Knowledge leads to unity, and ignorance to diversity. When a person attains the highest wisdom, they see the Divine in everything.",
            quoteAuthor: "Sri Ramakrishna",
            imageCaption: "Soft terracotta shadows falling on the river Ganges, carrying the timeless current of spiritual contemplation."
          },
          {
            headline: "Elevating Human Labor into Direct Divine Service",
            narrative1: `In this period, we reflect on Swami Vivekananda's monumental efforts during his extensive travels to implement the practical application of Vedanta. He taught that active, selfless work, known as Karma Yoga, is not separate from absolute contemplation. By viewing every individual in society as a living embodiment of the divine, we purify our own minds and rise above selfish desires.`,
            narrative2: `The monastic community of the Ramakrishna Order continues to dedicate itself daily to this continuous worship—bridging medical clinics, free educational institutes, and emergency relief with the deep contemplation of the monastics. Today, consider how even the most mundane chores can be consecrated as an offering of peace.`,
            quote: "This is the gist of all worship—to be pure and to do good to others. He who sees Shiva in the poor and weak, really worships Shiva.",
            quoteAuthor: "Swami Vivekananda",
            imageCaption: "A beautifully glowing light illuminating the altar of Belur Math, spreading rays of service and truth."
          },
          {
            headline: "The Motherly Refuge and Wisdom of Holy Mother",
            narrative1: `We reflect on the quiet, profound presence of Holy Mother Sri Sarada Devi. In her humble home at Jayrambati and later in Calcutta, she lived a life devoid of outward luxury but overflowing with unconditioned spiritual grace. She accepted all seekers, monastics and householders alike, into her maternal care with no judgment of their past faults or failures.`,
            narrative2: `Her life represents the ultimate embodiment of spiritual patience, tireless service, and absolute quietude. Under her nurturing direction, the young Ramakrishna Brotherhood found its permanent anchor. Her final teachings remain the highest beacon of peace: to learn to look at no one's faults, but to work on our own spiritual clarity.`,
            quote: "I am the mother of the wicked, as I am the mother of the virtuous. Whenever you are in trouble, say to yourself, 'I have a mother.'",
            quoteAuthor: "Holy Mother Sri Sarada Devi",
            imageCaption: "A sacred diya flickering gently with warm golden light, spreading a calm, protective atmosphere of peace."
          }
        ];

        const index = (selectedDay + selectedMonth.length) % dailyThemes.length;
        const theme = dailyThemes[index];

        setEventsList([{
          date: searchDateStr,
          year: "Seasonal Focus",
          headline: theme.headline,
          narrativeParagraph1: theme.narrative1,
          narrativeParagraph2: theme.narrative2,
          quote: theme.quote,
          quoteAuthor: theme.quoteAuthor,
          imageCaption: theme.imageCaption,
          isAiGenerated: false,
          isFallback: true
        }]);
      }

      setActiveEventIndex(0);
      setLoading(false);
    };

    fetchHistory();

    // Update the URL search parameter silently to reflect the chosen date
    try {
      const normalizedQueryDate = `${selectedMonth}-${selectedDay}`;
      const url = new URL(window.location.href);
      url.searchParams.set("date", normalizedQueryDate);
      window.history.replaceState({}, "", url.toString());
    } catch (e) {
      console.warn("Could not update state URL:", e);
    }

    return () => {
      active = false;
    };
  }, [selectedMonth, selectedDay]);

  // Reset slideshow when switching between multiple events on same day
  useEffect(() => {
    setSlideshowIndex(0);
  }, [activeEventIndex]);

  // Slideshow AutoPlay Timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setSlideshowIndex((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Precise navigation triggers (wraps around calendar months perfectly!)
  const handlePrevDay = () => {
    const currentMonthIdx = getMonthIndex(selectedMonth);
    let prevDay = selectedDay;
    let prevMonth = selectedMonth;

    if (selectedDay > 1) {
      prevDay = selectedDay - 1;
    } else {
      // Go to previous month
      const prevMonthIdx = (currentMonthIdx - 1 + 12) % 12;
      const prevMonthDef = MONTH_DEFS[prevMonthIdx];
      prevMonth = prevMonthDef.name;
      prevDay = prevMonthDef.days;
    }

    if (isBeforeLaunchDate(prevMonth, prevDay)) return;

    setSelectedMonth(prevMonth);
    setSelectedDay(prevDay);
  };

  const handleNextDay = () => {
    const currentMonthIdx = getMonthIndex(selectedMonth);
    const currentMonthDef = MONTH_DEFS[currentMonthIdx];

    let nextDay = selectedDay;
    let nextMonth = selectedMonth;

    if (selectedDay < currentMonthDef.days) {
      nextDay = selectedDay + 1;
    } else {
      // Go to next month
      const nextMonthIdx = (currentMonthIdx + 1) % 12;
      nextMonth = MONTH_DEFS[nextMonthIdx].name;
      nextDay = 1;
    }

    if (isFutureDateInYear(nextMonth, nextDay)) return;

    setSelectedMonth(nextMonth);
    setSelectedDay(nextDay);
  };

  // Copy shareable link to clipboard
  const handleShare = () => {
    try {
      const shareUrl = `https://ramakrishna-johannesburg.org.za/on-this-day?date=${selectedMonth}-${selectedDay}`;
      const introText = `On This Day in the Ramakrishna Movement's History (${selectedMonth} ${selectedDay})`;
      const eventText = eventData?.headline ? `: "${eventData.headline}"` : "";
      const yearText = eventData?.year ? ` [${eventData.year}]` : "";
      const textToCopy = `${introText}${eventText}${yearText} — ${shareUrl}`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      alert("Unable to copy link automatically. Please copy the URL from your address bar!");
    }
  };

  // Canvas Helper for wrapping text
  const wrapTextOnCanvas = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const lines: string[] = [];
    const explicitLines = text.split('\n');

    for (const explicitLine of explicitLines) {
      if (explicitLine.trim() === '') {
        lines.push(''); // Keep empty lines for paragraph spacing
        continue;
      }
      const words = explicitLine.split(" ");
      let currentLine = "";

      for (let n = 0; n < words.length; n++) {
        const testLine = currentLine + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          lines.push(currentLine.trim());
          currentLine = words[n] + " ";
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine.trim());
    }
    return lines;
  };

  // Generate an elegant, highly polished Square Graphic Card via HTML5 Canvas
  const generateShareCard = async (downloadOnly = false): Promise<File | null> => {
    if (!eventData) return null;
    setIsGeneratingCard(true);
    
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      // 1. Solid cream background
      ctx.fillStyle = "#FAF9F6";
      ctx.fillRect(0, 0, 1080, 1080);

      // 2. Thick terracotta elegant outer border & double inner hairline borders
      ctx.strokeStyle = "#E26D5C";
      ctx.lineWidth = 6;
      ctx.strokeRect(30, 30, 1020, 1020);
      
      ctx.strokeStyle = "#E26D5C";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(42, 42, 996, 996);

      // 3. Header text
      ctx.fillStyle = "#A89F91";
      ctx.font = "bold 15px monospace";
      ctx.letterSpacing = "6px";
      ctx.textAlign = "center";
      ctx.fillText("RAMAKRISHNA MOVEMENT HISTORY", 540, 95);

      // Subtle decorative separator line
      ctx.strokeStyle = "#EAE7E0";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(320, 120);
      ctx.lineTo(760, 120);
      ctx.stroke();

      // 4. Year Badge (Beautiful terracotta fill)
      ctx.fillStyle = "#E26D5C";
      ctx.beginPath();
      const badgeText = `CHRONICLE OF ${eventData.year || "UNCHARTED"}`;
      ctx.font = "bold 18px monospace";
      const badgeWidth = ctx.measureText(badgeText).width + 36;
      
      const badgeX = 540 - badgeWidth / 2;
      const badgeY = 150;
      const badgeHeight = 38;
      
      // Standard canvas rect with border radius fallback
      if (ctx.roundRect) {
        ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 8);
      } else {
        ctx.rect(badgeX, badgeY, badgeWidth, badgeHeight);
      }
      ctx.fill();

      // Badge text inside
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.fillText(badgeText, 540, 174);

      // Month/Day display
      ctx.fillStyle = "#2D2A26";
      ctx.font = "bold 26px Georgia, serif";
      ctx.fillText(`On ${selectedMonth} ${selectedDay}`, 540, 232);

      // 5. Headline Text (wrapped dynamically)
      ctx.fillStyle = "#2D2A26";
      ctx.font = "bold 34px Georgia, serif";
      const headlineLines = wrapTextOnCanvas(ctx, eventData.headline || "", 860);
      let currentY = 290;
      headlineLines.forEach((line) => {
        ctx.fillText(line, 540, currentY);
        currentY += 46;
      });

      // Space before narrative starts
      currentY += 15;

      // 6. Narrative Paragraphs
      ctx.fillStyle = "#5C564E";
      ctx.font = "20px Georgia, serif";
      
      const maxNarrativeY = 850; // Increased to prevent cutting off the text
      const fullNarrative = `${eventData.narrativeParagraph1 || ""}${eventData.narrativeParagraph2 ? "\n\n" + eventData.narrativeParagraph2 : ""}`;
      const wrappedLines = wrapTextOnCanvas(ctx, fullNarrative, 860);

      const narrativeLineHeight = 32;
      for (let i = 0; i < wrappedLines.length; i++) {
        if (currentY + narrativeLineHeight > maxNarrativeY) {
          // Add ellipsis representing cut-off gracefully
          ctx.fillText(wrappedLines[i].substring(0, Math.max(0, wrappedLines[i].length - 3)) + "...", 540, currentY);
          currentY += narrativeLineHeight;
          break;
        }
        ctx.fillText(wrappedLines[i], 540, currentY);
        currentY += narrativeLineHeight;
      }

      // 6.5 Draw the accompanying historical picture to beautifully fill the space!
      try {
        currentY += 25; // Add some breathing room below the text
        const availableHeight = 970 - currentY;

        if (availableHeight > 50) {
          const imgUrl = currentSlide.src;

          const img = await new Promise<HTMLImageElement>(async (resolve, reject) => {
            try {
              // Fetch image as blob to completely bypass canvas CORS/tainting issues
              const response = await fetch(imgUrl);
              if (!response.ok) throw new Error(`HTTP ${response.status}`);
              const blob = await response.blob();
              const objectUrl = URL.createObjectURL(blob);

              const image = new window.Image();
              image.onload = () => {
                resolve(image);
              };
              image.onerror = (e) => {
                reject(new Error(`Failed to decode image: ${imgUrl}`));
              };
              image.src = objectUrl;
            } catch (err) {
              reject(err);
            }
          });

          // Calculate dimensions to maintain aspect ratio and fit within boundaries
          const imgRatio = img.width / img.height;
          let drawWidth = 860;
          let drawHeight = drawWidth / imgRatio;

          // If the image is too tall for the remaining space, scale it down
          if (drawHeight > availableHeight) {
            drawHeight = availableHeight;
            drawWidth = drawHeight * imgRatio;
          }

          const drawX = 540 - (drawWidth / 2);

          // Draw image with rounded corners
          ctx.save();
          if (ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(drawX, currentY, drawWidth, drawHeight, 16);
            ctx.clip();
          }
          ctx.drawImage(img, drawX, currentY, drawWidth, drawHeight);
          ctx.restore();
        }
      } catch (err) {
        console.warn("Could not draw historical image on canvas:", err);
      }

      // 9. Footer Credit watermark
      const targetUrl = `https://ramakrishna-johannesburg.org.za/on-this-day?date=${selectedMonth}-${selectedDay}`;
      ctx.fillStyle = "#A89F91";
      ctx.font = "12px monospace";
      ctx.letterSpacing = "1px";
      ctx.textAlign = "center";
      ctx.fillText(targetUrl, 540, 1020);

      // Get ordinal suffix for format: 31stMay style
      const getOrdinalSuffix = (num: number): string => {
        if (num >= 11 && num <= 13) return "th";
        switch (num % 10) {
          case 1: return "st";
          case 2: return "nd";
          case 3: return "rd";
          default: return "th";
        }
      };
      const formattedDaySuffix = `${selectedDay}${getOrdinalSuffix(selectedDay)}`;
      const formattedFileName = `on-this-day(${formattedDaySuffix}${selectedMonth}).png`;

      const dataUrl = canvas.toDataURL("image/png");
      
      if (downloadOnly) {
        const link = document.createElement("a");
        link.download = formattedFileName;
        link.href = dataUrl;
        link.click();
        return null;
      }

      const blob = await (await fetch(dataUrl)).blob();
      return new File([blob], formattedFileName, { type: "image/png" });
    } catch (err) {
      console.error("Canvas share card render error:", err);
      return null;
    } finally {
      setIsGeneratingCard(false);
    }
  };

  // Perform dynamic device native share of the generated picture
  const handleNativeShareCard = async () => {
    const file = await generateShareCard(false);
    if (!file) {
      alert("Unable to compile your graphic card. Please use standard text share or download button!");
      return;
    }
    
    try {
      await navigator.share({
        files: [file],
        title: `On This Day in the Ramakrishna Movement's History — ${selectedMonth} ${selectedDay}`,
        text: `Chronicle of ${eventData?.year || "Uncharted"}: "${eventData?.headline || ""}"`
      });
    } catch (err) {
      console.log("Native system share bypassed or canceled:", err);
    }
  };

  // Prepares and copies a beautiful rich text structure formatted for messengers & social networks
  const handleCopyTextBlock = () => {
    if (!eventData) return;
    try {
      const shareUrl = `https://ramakrishna-johannesburg.org.za/on-this-day?date=${selectedMonth}-${selectedDay}`;
      const textToCopy = `🏛️ *On This Day in the Ramakrishna Movement's History*\n📅 *Date*: ${selectedMonth} ${selectedDay} (${eventData.year || ""})\n\n📜 *Headline*: *${eventData.headline}*\n\n"${eventData.narrativeParagraph1}"\n\n"${eventData.narrativeParagraph2}"\n\n📖 Read, Search & Set Notifications Online:\n🔗 ${shareUrl}`;
      
      navigator.clipboard.writeText(textToCopy);
      setCopiedTextPanel(true);
      setTimeout(() => setCopiedTextPanel(false), 3000);
    } catch (e) {
      alert("Unable to copy formatted post automatically.");
    }
  };

  // Browser-Synthesized Sacred Temple Bell (432Hz with natural acoustic resonance)
  const playTempleBell = () => {
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 1200);

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      
      // We layer several frequencies to mimic the natural rich overtones of a solid bronze temple bell
      const bellFrequencies = [
        432, // Primordial Fundamental (Peace tone)
        432 * 1.5, // Perfect Fifth (648Hz)
        432 * 2.0, // First Octave (864Hz)
        432 * 2.61, // Minor Sixth (Inharmonic metallic spike)
        432 * 3.0 // Third Harmonic
      ];
      
      const gainNodes = bellFrequencies.map((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Lower frequencies ring longer, higher frequencies fade quickly
        const decayDuration = 3.5 / (idx + 1);
        
        gain.gain.setValueAtTime(idx === 0 ? 0.25 : 0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + decayDuration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + decayDuration);
        return osc;
      });
    } catch (e) {
      console.warn("Web Audio API is temporarily restricted by browser play policies.", e);
    }
  };

  const handleExportHtml = () => {
    const currentDayEvents = eventsList.length > 0 ? eventsList : (eventData ? [eventData] : []);
    if (currentDayEvents.length === 0) {
      alert("No event data loaded to export yet.");
      return;
    }
    
    // Create beautiful fully functional offline HTML string with CDN dependencies
    const htmlContent = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>On This Day - History of the Ramakrishna Movement</title>
  <!-- Beautiful Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <!-- Tailwind CSS v3 via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            serif: ['Playfair Display', 'serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>
  <style>
    body {
      background-color: #FAF9F6;
      color: #3D3A35;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #F2EFE9;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #A89F91;
      border-radius: 3px;
    }
  </style>
</head>
<body class="font-sans min-h-screen flex flex-col justify-between py-6 px-4 md:px-8 max-w-6xl mx-auto selection:bg-[#E26D5C]/20 selection:text-[#E26D5C]">

  <!-- Header -->
  <header class="w-full mb-8 border-b border-[#EAE7E0] bg-white rounded-2xl p-6 md:px-10 md:py-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-[#E26D5C] rounded-full flex items-center justify-center text-white shrink-0 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10s3-3 3-8"/><path d="M22 10s-3-3-3-8"/><path d="M5 10c0 4.4 3.6 8 8 8s8-3.6 8-8"/><path d="M12 18v4"/><path d="M8 22h8"/></svg>
      </div>
      <div class="text-left">
        <h1 class="text-xl md:text-2xl font-serif text-[#2D2A26] font-medium tracking-tight">On This Day in the History of the <span class="italic text-[#E26D5C]">Ramakrishna Movement</span></h1>
        <p class="text-xs text-[#8E8679] font-light mt-0.5">Offline self-contained single-page edition</p>
      </div>
    </div>
    <nav class="flex gap-4 uppercase tracking-[0.2em] text-[10px] text-[#A89F91] font-bold select-none">
      <span>Contemplation</span>
      <span>•</span>
      <span>Selfless Service</span>
    </nav>
  </header>

  <!-- Main Grid -->
  <main class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 w-full flex-grow items-start my-4">
    
    <!-- Left: Date Display & Slideshow -->
    <div class="lg:col-span-5 flex flex-col space-y-6 w-full">
      
      <!-- Date Widget -->
      <div class="bg-white rounded-2xl p-6 border border-[#EAE7E0] shadow-sm flex flex-col items-center">
        <span class="text-[10px] tracking-[0.25em] font-mono text-[#A89F91] uppercase mb-2 font-bold">CHRONICLE TARGET DATE</span>
        <h2 class="text-4xl font-serif font-semibold text-[#2D2A26]">${selectedMonth} ${selectedDay}</h2>
        
        <!-- Multi-Event Tabs Selector (Rendered Inline!) -->
        <div id="offline-tabs" class="w-full flex flex-col gap-2 mt-4 border-t border-[#EAE7E0] pt-4">
          <span class="text-[10px] tracking-[0.15em] font-mono text-[#A89F91] uppercase font-bold text-center mb-2">
            Chronicles on this day (${currentDayEvents.length})
          </span>
          <div class="flex flex-col gap-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
            ${currentDayEvents.map((evt, idx) => `
              <button 
                onclick="switchEvent(${idx})" 
                id="tab-\${idx}"
                class="tab-btn px-3 py-2 text-xs font-serif rounded-lg border text-left transition-all duration-200 \${idx === 0 ? 'bg-[#E26D5C] text-white border-[#E26D5C] font-semibold' : 'bg-[#F2EFE9] border-[#EAE7E0] text-[#5C564E] hover:bg-[#EAE7E0]'}"
              >
                <div class="font-sans font-bold text-[9px] opacity-90">\${evt.year}</div>
                <div class="truncate text-[11px] leading-tight mt-0.5">\${evt.headline}</div>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Picture Slideshow -->
      <div class="bg-white rounded-2xl p-5 border border-[#EAE7E0] shadow-sm flex flex-col">
        <div class="relative overflow-hidden rounded-xl aspect-[16/9] w-full bg-[#EAE7E0] border-8 border-white shadow-lg group">
          
          <!-- Image Element (Utilizing beautiful, highly reliable nature/spiritual image service from Unsplash) -->
          <div id="slideshow-container" class="absolute inset-0 bg-cover bg-center transition-all duration-500" style="background-image: url('https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800');"></div>
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-95"></div>
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-[#E26D5C] w-1/3 z-10"></div>

          <!-- Slide Navigation Arrows -->
          <button onclick="prevSlide()" class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full transition-opacity z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button onclick="nextSlide()" class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full transition-opacity z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          <!-- Slideshow Dots Row -->
          <div class="absolute bottom-3 right-4 flex space-x-1.5 items-center z-10" id="dots-container">
            <span class="w-1.5 h-1.5 rounded-full bg-[#E26D5C]"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-white/60"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-white/60"></span>
          </div>
        </div>

        <div class="mt-4 text-center px-2">
          <p class="text-xs italic text-[#8E8679] font-serif leading-relaxed" id="slideshow-caption">
            &ldquo;Spiritual reflection over the water, symbolizing tranquility.&rdquo;
          </p>
        </div>
      </div>
    </div>

    <!-- Right: Text Content -->
    <div class="lg:col-span-7 w-full flex flex-col bg-white border border-[#EAE7E0] shadow-sm rounded-2xl p-6 md:p-8" id="right-panel">
      
      <!-- Year and Headline Header -->
      <div class="flex flex-col space-y-2 mb-4">
        <div class="flex items-baseline gap-3 pt-1">
          <span class="text-4xl md:text-6xl font-serif font-black text-[#E26D5C] opacity-20 leading-none select-none" id="display-year">
            \${events[0]?.year || ""}
          </span>
          <h2 class="text-2xl md:text-3xl font-serif text-[#2D2A26] font-semibold leading-tight tracking-tight shadow-none" id="display-headline">
            \${events[0]?.headline || ""}
          </h2>
        </div>
      </div>

      <!-- Narrative Text -->
      <div class="space-y-4 text-[15px] md:text-base text-[#5C564E] leading-relaxed text-justify mt-2" id="display-narrative">
        <p class="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#E26D5C] first-letter:leading-[0.75]" id="p1">
          \${events[0]?.narrativeParagraph1 || ""}
        </p>
        <p id="p2">
          \${events[0]?.narrativeParagraph2 || ""}
        </p>
      </div>

    </div>
  </main>

  <footer class="w-full border-t border-[#EAE7E0] mt-12 pt-6 text-center text-[10px] text-[#A89F91] font-mono tracking-[0.2em] font-bold flex flex-col md:flex-row justify-between items-center gap-4">
    <p>RAMAKRISHNA ORDER HISTORY PROJECT</p>
    <p class="normal-case tracking-normal font-sans text-xs font-light text-[#8E8679]">
      Exported from On This Day Digital Archive.
    </p>
  </footer>

  <!-- JavaScript logic to power Offline interactivity -->
  <script>
    // Embedded JSON data for state management
    const events = ${JSON.stringify(currentDayEvents)};
    // Determine slideshow pictures: use customImages if available, otherwise fallback to default Unsplash images
    let pictures = [];
    if (events[0] && events[0].customImages && events[0].customImages.length) {
      pictures = events[0].customImages.map((url) => ({
        url: url.startsWith('/') ? \`https://ramakrishna-johannesburg.org.za\${url}\` : url,
        caption: events[0].imageCaption || "Historical picture for this entry."
      }));
    } else {
      pictures = [
        {
          url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800",
          caption: "Sunset over the serene temples, welcoming spiritual illumination."
        },
        {
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
          caption: "Calm water of the sacred river reflections at twilight."
        },
        {
          url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800",
          caption: "Silent dawn mist carrying peace to seekers of Truth."
        }
      ];
    }

    let currentEventIdx = 0;
    let currentSlideIdx = 0;

    function switchEvent(index) {
      if (index < 0 || index >= events.length) return;
      currentEventIdx = index;
      
      // Update Active Tab styles
      events.forEach((_, idx) => {
        const btn = document.getElementById("tab-" + idx);
        if (btn) {
          if (idx === index) {
            btn.className = "tab-btn px-3 py-2 text-xs font-serif rounded-lg border text-left transition-all duration-200 bg-[#E26D5C] text-white border-[#E26D5C] font-semibold";
          } else {
            btn.className = "tab-btn px-3 py-2 text-xs font-serif rounded-lg border text-left transition-all duration-200 bg-[#F2EFE9] border-[#EAE7E0] text-[#5C564E] hover:bg-[#EAE7E0]";
          }
        }
      });

      // Update right panel variables
      const event = events[index];
      document.getElementById("display-year").textContent = event.year;
      document.getElementById("display-headline").textContent = event.headline;

      // We set the text content
      const docP1 = document.getElementById("p1");
      const docP2 = document.getElementById("p2");
      docP1.textContent = event.narrativeParagraph1;
      docP2.textContent = event.narrativeParagraph2;
      
      // Re-apply dropcap class safely
      docP1.className = "first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#E26D5C] first-letter:leading-[0.75]";
      
      // Also apply dynamic custom slides caption if applicable!
      document.getElementById("slideshow-caption").innerHTML = "&ldquo;" + (event.imageCaption || pictures[currentSlideIdx].caption) + "&rdquo;";
    }

    function prevSlide() {
      currentSlideIdx = (currentSlideIdx - 1 + pictures.length) % pictures.length;
      updateSlideshow();
    }

    function nextSlide() {
      currentSlideIdx = (currentSlideIdx + 1) % pictures.length;
      updateSlideshow();
    }

    function updateSlideshow() {
      const container = document.getElementById("slideshow-container");
      container.style.backgroundImage = "url('" + pictures[currentSlideIdx].url + "')";
      
      // Update dots
      const dotsContainer = document.getElementById("dots-container");
      dotsContainer.innerHTML = pictures.map((_, idx) => 
        '<span class="w-1.5 h-1.5 rounded-full ' + (idx === currentSlideIdx ? 'bg-[#E26D5C]' : 'bg-white/60') + '"></span>'
      ).join('');

      // Update caption
      const event = events[currentEventIdx];
      document.getElementById("slideshow-caption").innerHTML = "&ldquo;" + (event.imageCaption || pictures[currentSlideIdx].caption) + "&rdquo;";
    }

    // Initialize first slideshow caption
    updateSlideshow();
  </script>
</body>
</html>`;

    // Create downloadable file blob
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `on_this_day_\${selectedMonth.toLowerCase()}_\${selectedDay}.html`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="min-h-screen px-4 pt-24 pb-8 md:pt-32 md:pb-12 flex flex-col items-center justify-between font-sans antialiased max-w-6xl mx-auto text-[#3D3A35]">
      
      {/* Elegantly Polished Universal Header Section */}
      <header className="relative overflow-hidden w-full mb-8 border border-[#EAE7E0] bg-gradient-to-br from-white via-white to-[#FAF8F5] rounded-3xl p-6 md:p-8 shadow-sm flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between" id="header_section">
        {/* Top visual accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#E26D5C] via-[#E26D5C]/60 to-[#E26D5C]"></div>
        
        {/* Left Info Column */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left max-w-2xl">
          <div className="flex flex-col space-y-2">
            <h1 className="text-xl md:text-2xl font-serif text-[#2D2A26] font-medium tracking-tight leading-tight">
              On This Day in the History of the <span className="italic text-[#E26D5C] font-semibold">Ramakrishna Movement</span>
            </h1>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-[#7C7267] font-sans font-normal leading-relaxed">
                Discover how today is woven into the legacy of the Ramakrishna Movement. From its earliest roots to over 125 years since Swami Vivekananda’s return from the West, this daily chronicle brings you the milestones that happened on this very day in some years past.
              </p>
              <p className="text-xs sm:text-sm text-[#7C7267] font-sans font-normal leading-relaxed">
                (Launched on 31 May 2026)
              </p>
            </div>
          </div>
        </div>

        {/* Right Corner: Exceptionally Compact Date Selector Widget */}
        <div className="shrink-0 w-full lg:w-64 bg-white border border-[#EAE7E0] shadow-xs rounded-xl px-4 py-2.5 flex flex-col items-center" id="date_widget">
          <span className="text-[8px] tracking-[0.15em] font-mono text-[#A89F91] uppercase font-bold mb-1 select-none text-center">DATE</span>
          
          {/* Interactive Date Navigation Row */}
          <div className="flex items-center justify-between w-full">
            <button
              onClick={handlePrevDay}
              disabled={isPrevDisabled}
              className={`p-1 px-1.5 border border-[#EAE7E0]/60 rounded-lg transition-all duration-200 ${
                isPrevDisabled
                  ? "opacity-30 cursor-not-allowed bg-transparent text-stone-300"
                  : "text-stone-600 hover:bg-[#FAF9F6] active:scale-95 cursor-pointer"
              }`}
              aria-label="Previous day"
              title={isPrevDisabled ? "Dates before May 31st are not available" : "Previous day"}
            >
              <ArrowLeft className={`w-3.0 h-3.0 ${isPrevDisabled ? 'text-stone-400' : 'text-[#E26D5C]'}`} />
            </button>

            <div 
              className="flex flex-col items-center cursor-pointer select-none px-3 py-0.5 rounded-lg hover:bg-[#FAF9F6] transition-all active:scale-98 text-center"
              onClick={() => setIsJumpModalOpen(true)}
              title="Click to jump to any date"
            >
              <span className="text-base font-serif font-bold text-[#2D2A26] flex items-center justify-center gap-1 leading-none">
                {selectedMonth.slice(0, 3)} {selectedDay}
              </span>
              <span className="text-[9px] text-[#E26D5C] font-mono flex items-center justify-center mt-0.5 gap-0.5 font-semibold hover:underline">
                <Calendar className="w-2.5 h-2.5" /> Jump Date
              </span>
            </div>

            <button
              onClick={handleNextDay}
              disabled={isNextDisabled}
              className={`p-1 px-1.5 border border-[#EAE7E0]/60 rounded-lg transition-all duration-200 ${
                isNextDisabled
                  ? "opacity-30 cursor-not-allowed bg-transparent text-stone-300"
                  : "text-stone-600 hover:bg-[#FAF9F6] active:scale-95 cursor-pointer"
              }`}
              aria-label="Next day"
              title={isNextDisabled ? "Future dates are not yet available" : "Next day"}
            >
              <ArrowRight className={`w-3.0 h-3.0 ${isNextDisabled ? 'text-stone-400' : 'text-[#E26D5C]'}`} />
            </button>
          </div>

          {/* Event Tabs/Selector: Supporting multiple historical events on the same day */}
          {eventsList.length > 1 && (
            <div className="w-full flex flex-col gap-1 mt-2 border-t border-[#EAE7E0]/60 pt-1.5" id="event_tabs_container">
              <span className="text-[8px] tracking-[0.1em] font-mono text-[#A89F91] uppercase font-bold text-center">
                Chronicles ({eventsList.length})
              </span>
              <div className="flex flex-col gap-0.5 max-h-[80px] overflow-y-auto w-full pr-0.5" id="event_scroll">
                {eventsList.map((evt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveEventIndex(idx)}
                    className={`px-2 py-1 text-[9px] font-serif rounded-md border text-left transition-all duration-150 cursor-pointer w-full flex items-center justify-between gap-1.5 ${
                      idx === activeEventIndex
                        ? "bg-[#E26D5C] text-white border-[#E26D5C] font-semibold"
                        : "bg-[#FAF9F6] border-[#EAE7E0]/50 text-[#5C564E] hover:bg-[#F2EFE9] hover:text-stone-900"
                    }`}
                  >
                    <span className="font-sans font-bold text-[8px] opacity-90">{evt.year}</span>
                    <span className="truncate flex-grow text-right text-[10px] font-normal">{evt.headline}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Row: Share */}
          <div className="w-full flex flex-col items-center mt-2 border-t border-[#EAE7E0]/60 pt-1.5">
            <div className="w-full flex items-center justify-center">
              <button
                onClick={() => setShowSocialShare(!showSocialShare)}
                className={`flex items-center gap-1.5 px-4 py-1.5 border text-xs font-semibold rounded-md transition-all shadow-3xs cursor-pointer ${
                  showSocialShare 
                    ? 'bg-[#F2EFE9] text-[#E26D5C] border-[#E26D5C]' 
                    : 'bg-white text-[#5C564E] hover:bg-[#FAF9F6] border-[#EAE7E0]'
                }`}
                title="Share this historic date on social media"
              >
                <Share2 className="w-3.5 h-3.5 text-[#E26D5C]" />
                <span>Share Post</span>
              </button>
            </div>

            <AnimatePresence>
              {showSocialShare && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full overflow-hidden flex flex-col items-center mt-3 pt-3 border-t border-[#EAE7E0] space-y-4"
                >
                  {/* Part 1: Quick Links */}
                  <div className="w-full flex flex-col items-center">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-[#A89F91] mb-2 font-bold">1. Quick Messenger & Social Links</span>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {/* WhatsApp */}
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                          `On This Day in the Ramakrishna Movement's History (${selectedMonth} ${selectedDay}) — ${eventData?.headline ? `"${eventData.headline}"` : ""}: https://ramakrishna-johannesburg.org.za/on-this-day?date=${selectedMonth}-${selectedDay}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-md transition-all scale-100 hover:scale-105 flex items-center gap-1.5 text-xs font-semibold"
                        title="Share on WhatsApp"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.641-1.03-5.124-2.904-7c-1.873-1.875-4.361-2.907-7.011-2.908-5.44 0-9.866 4.414-9.869 9.866-.001 1.77.461 3.5 1.339 5.025l-.973 3.558 3.65-.957zm11.634-6.802c-.312-.156-1.848-.913-2.126-1.014-.279-.1-.482-.15-.684.15-.202.3-.78.983-.956 1.183-.176.2-.352.226-.664.07-1.116-.558-1.928-.971-2.686-2.272-.198-.34.198-.316.568-1.054.062-.125.031-.234-.015-.327-.046-.093-.482-1.16-.66-1.587-.174-.419-.347-.362-.482-.369h-.41c-.141 0-.371.053-.566.266-.195.213-.746.728-.746 1.775s.76 2.057.866 2.2c.106.143 1.496 2.284 3.624 3.2c.507.219.902.35 1.21.448.51.162.973.139 1.34.084.41-.061 1.848-.756 2.11-1.45.263-.694.263-1.29.184-1.45-.079-.158-.291-.252-.604-.408z"/>
                        </svg>
                        <span>WhatsApp Link</span>
                      </a>

                      {/* Twitter/X */}
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          `On This Day in the Ramakrishna Movement's History: ${eventData?.headline ? `"${eventData.headline}"` : `${selectedMonth} ${selectedDay}`}`
                        )}&url=${encodeURIComponent(
                          `https://ramakrishna-johannesburg.org.za/on-this-day?date=${selectedMonth}-${selectedDay}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-3 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] rounded-md transition-all scale-100 hover:scale-105 flex items-center gap-1.5 text-xs font-semibold"
                        title="Share on X"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                        <span>X / Twitter</span>
                      </a>

                      {/* Facebook */}
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          `https://ramakrishna-johannesburg.org.za/on-this-day?date=${selectedMonth}-${selectedDay}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-3 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] rounded-md transition-all scale-100 hover:scale-105 flex items-center gap-1.5 text-xs font-semibold"
                        title="Share on Facebook"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                        <span>Facebook</span>
                      </a>

                      {/* Copy Link */}
                      <button
                        onClick={handleShare}
                        className={`py-1.5 px-3 rounded-md transition-all scale-100 hover:scale-105 cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                          copied 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
                        }`}
                        title="Copy sharing link"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                        <span>{copied ? "Copied!" : "Copy Link"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Part 2: Max-Length Text Draft Blocks */}
                  <div className="w-full flex flex-col items-center border-t border-[#EAE7E0]/40 pt-3">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-[#A89F91] mb-2 font-bold">2. Editorial Narrative Copier (Full Post Draft)</span>
                    <button
                      onClick={handleCopyTextBlock}
                      className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-2 ${
                        copiedTextPanel 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-3xs' 
                          : 'bg-[#FDFBF7] text-[#5C564E] hover:bg-[#F5F2EB] border-[#EAE7E0] hover:border-[#D6D2C4]'
                      }`}
                      title="Copy full beautifully formatted narrative text with headline to paste on WhatsApp or Facebook"
                    >
                      {copiedTextPanel ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#E26D5C]" />}
                      <span>{copiedTextPanel ? "Narrative Draft Copied!" : "Copy Full Formatted Story Post"}</span>
                    </button>
                    <p className="text-[10px] text-[#A89F91] mt-1 text-center font-sans tracking-tight max-w-xs">
                      Copies full story formatted specifically with bold & bullet layouts for WhatsApp / Telegram / Email.
                    </p>
                  </div>

                  {/* Part 3: Graphics Share Cards */}
                  <div className="w-full flex flex-col items-center border-t border-[#EAE7E0]/40 pt-3">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-[#A89F91] mb-2 font-bold">3. Visual Graphic Design Share Cards</span>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {/* Download PNG Visual Card */}
                      <button
                        onClick={() => generateShareCard(true)}
                        disabled={isGeneratingCard}
                        className="px-4 py-2 text-xs font-bold rounded-lg border border-[#EAE7E0] bg-[#FDFBF7] hover:bg-[#F5F2EB] text-[#5C564E] transition-all cursor-pointer flex items-center gap-2 shadow-3xs disabled:opacity-50"
                        title="Download standard square picture containing high resolution design version of this chronicle"
                      >
                        {isGeneratingCard ? <Loader2 className="w-4 h-4 animate-spin text-[#E26D5C]" /> : <Download className="w-4 h-4 text-[#E26D5C]" />}
                        <span>{isGeneratingCard ? "Rendering Graphic..." : "Download Graphic Card (PNG)"}</span>
                      </button>

                      {/* Device Native Graphic Sharing */}
                      {shareCardSupported && (
                        <button
                          onClick={handleNativeShareCard}
                          disabled={isGeneratingCard}
                          className="px-4 py-2 text-xs font-bold rounded-lg bg-[#E26D5C] hover:bg-[#D05C4D] text-white transition-all cursor-pointer flex items-center gap-2 shadow-3xs disabled:opacity-50"
                        >
                          {isGeneratingCard ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Share2 className="w-4 h-4 text-white" />}
                          <span>{isGeneratingCard ? "Rendering..." : "Direct Share Graphic Card"}</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-[#A89F91] mt-1.5 text-center font-sans tracking-tight max-w-xs font-normal leading-relaxed">
                      Generates a gorgeous high-contrast spiritual card showing chronicle titles and historical year timestamps.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
      </header>

      {/* Main Core Content Container: Split Layout (Responsive Column to Grid) */}
      <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 flex-grow items-start my-4">
        
        {/* LEFT COLUMN (Lg: 5/12): Media Slideshow */}
        <div className="lg:col-span-5 flex flex-col space-y-6 w-full" id="left_column_controls">

          {/* Media Section: Stunning Physical Mount Slideshow Container */}
          <div className="bg-white rounded-2xl p-5 border border-[#EAE7E0] shadow-sm flex flex-col" id="media_slideshow">
            <div className="relative overflow-hidden rounded-xl w-full bg-[#EAE7E0] border-8 border-white shadow-lg group">
              
              {/* Display Images with dynamic source resolving */}
<AnimatePresence mode="wait">
  <motion.img
    key={`${activeEventIndex}-${slideshowIndex}`}
    src={currentSlide?.src}
    alt={currentSlide?.captionHeading}
    referrerPolicy="no-referrer"
    className="w-full h-auto object-contain"
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    onClick={() => {
      const link = document.createElement('a');
      link.href = currentSlide?.src || '';
      link.download = `on_this_day_${selectedMonth.toLowerCase()}_${selectedDay}.png`;
      link.click();
    }}
    style={{ cursor: 'pointer' }}
  />
</AnimatePresence>

              {/* Tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-85 pointer-events-none" />

              {/* Natural Tones bottom bar indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E26D5C] w-1/3 z-10 pointer-events-none" />

              {/* Slideshow Manual Arrow Controls */}
              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  setSlideshowIndex(prev => prev - 1);
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full backdrop-blur-xs transition-opacity md:opacity-0 opacity-100 group-hover:opacity-100 cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  setSlideshowIndex(prev => prev + 1);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full backdrop-blur-xs transition-opacity md:opacity-0 opacity-100 group-hover:opacity-100 cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dynamic Slideshow Dots & Indicator overlays */}
              <div className="absolute bottom-3 left-4 hover:opacity-100 transition-opacity z-10">
                <span className="text-[10px] text-white/95 font-mono py-1 px-2.5 bg-black/35 backdrop-blur-xs rounded-md animate-fade-in">
                  {currentSlide?.captionHeading}
                </span>
              </div>

              <div className="absolute bottom-3 right-4 flex space-x-1.5 items-center z-10">
                {slideshowImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setSlideshowIndex(prev => {
                        const currentSafe = ((prev % slideshowImages.length) + slideshowImages.length) % slideshowImages.length;
                        return prev + (idx - currentSafe);
                      });
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === safeSlideshowIndex ? 'bg-[#E26D5C] w-3.5' : 'bg-white/60 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Captions Section */}
            <div className="mt-4 text-center px-2">
              <p className="text-xs italic text-[#8E8679] font-serif leading-relaxed">
                &ldquo;{eventData?.imageCaption || currentSlide?.defaultCaption}&rdquo;
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (Lg: 7/12): Historical Narrative & Reflection Panel */}
        <div className="lg:col-span-7 w-full flex flex-col bg-white border border-[#EAE7E0] shadow-sm rounded-2xl overflow-hidden p-6 md:p-8" id="right_column_content">
          
          <AnimatePresence mode="wait">
            {loading ? (
              /* Majestic skeletal or spinner loader to maintain peaceful flow */
              <motion.div 
                key="loader"
                className="py-16 flex flex-col items-center justify-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader2 className="w-8 h-8 text-[#E26D5C] animate-spin" />
                <p className="text-xs font-mono text-[#A89F91] uppercase tracking-widest animate-pulse font-bold">Gathering Historic Records...</p>
              </motion.div>
            ) : apiError ? (
              /* Error or high latency handling gracefully */
              <motion.div 
                key="error"
                className="py-12 text-center max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-[#F2EFE9] rounded-full w-12 h-12 flex items-center justify-center text-amber-800 mx-auto mb-4 border border-[#EAE7E0]">
                  <Info className="w-6 h-6 text-[#E26D5C]" />
                </div>
                <h3 className="text-lg font-serif text-[#2D2A26] font-medium">Temporary Connection Variance</h3>
                <p className="text-sm text-[#8E8679] mt-2 leading-relaxed">
                  {apiError}
                </p>
                <button 
                  onClick={() => setSelectedDay(selectedDay)} // Re-triggers effect
                  className="mt-6 px-4 py-2 border border-[#EAE7E0] text-xs font-bold rounded-full hover:bg-stone-50 text-[#3D3A35] cursor-pointer"
                >
                  Attempt Reload
                </button>
              </motion.div>
            ) : (
              /* Render Historical Content */
              <motion.div 
                key={eventData?.headline || "content"}
                className="flex flex-col space-y-6"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4 }}
              >
                
                {/* Year tag & Source Badges Row with beautiful Natural Tones baseline details */}
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-wrap items-center gap-2" id="metadata_badges">
                    {eventData?.isAiGenerated && (
                      <span className="font-mono text-[9px] uppercase font-bold text-[#E26D5C] px-2 py-0.5 border border-[#EAE7E0] bg-[#FAF9F6] rounded flex items-center gap-1 select-none">
                        <Sparkles className="w-3 h-3 text-[#E26D5C]" /> AI-Sourced Chronicle
                      </span>
                    )}

                    {eventData?.isFallback && (
                      <span className="font-mono text-[9px] uppercase font-bold text-[#8E8679] px-2 py-0.5 bg-[#F2EFE9] border border-[#EAE7E0] rounded flex items-center gap-1 select-none">
                        Seasonal Contemplation
                      </span>
                    )}

                    {eventData?.isQuotaExceeded && (
                      <span className="font-mono text-[9px] uppercase font-bold text-amber-800 px-2 py-0.5 bg-[#FEF3C7] border border-[#FDE68A] rounded flex items-center gap-1.5 select-none" title="Gemini API limit reached. Showing preloaded offline monk archives.">
                        <Info className="w-3 h-3 text-[#D97706]" /> Service Quota Met — Monastic Archives Fallback
                      </span>
                    )}
                  </div>
                  
                  {/* Beautiful structured Heading with elegant Year Badge */}
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex items-center">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest bg-[#E26D5C]/10 text-[#E26D5C] px-2.5 py-1 rounded-md border border-[#E26D5C]/15">
                        CHRONICLE OF {eventData?.year}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif text-[#2D2A26] font-semibold leading-snug tracking-tight">
                      {eventData?.headline}
                    </h2>
                  </div>
                </div>

                {/* 2-Paragraph Historical Narrative with Editorial Polish */}
                <div className="space-y-4 text-base md:text-lg text-[#3D3A35] font-serif leading-relaxed text-left mt-2">
                  <p>
                    {eventData?.narrativeParagraph1}
                  </p>

                  {eventData?.narrativeParagraph2 && (
                    <p>
                      {eventData.narrativeParagraph2}
                    </p>
                  )}
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </main>

      {/* Date Jump Modal Popover Overlay */}
      <AnimatePresence>
        {isJumpModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div 
              className="bg-[#FAF9F6] w-full max-w-md rounded-2xl shadow-xl border border-[#EAE7E0] overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              
              <div className="bg-white border-b border-[#EAE7E0] p-4 flex justify-between items-center">
                <span className="font-serif font-medium text-[#2D2A26] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#E26D5C]" /> Jump to Specific Date
                </span>
                <button 
                  onClick={() => setIsJumpModalOpen(false)}
                  className="text-[#8E8679] hover:text-[#2D2A26] text-xs uppercase tracking-widest font-mono font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="p-6 space-y-6">
                
                {/* Select Month Row */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-[#A89F91] uppercase font-bold block">
                    1. Select Month
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {MONTH_DEFS.map((monthDef) => {
                      const isMonthFuture = isFutureDateInYear(monthDef.name, 1);
                      const isMonthPast = isBeforeLaunchDate(monthDef.name, monthDef.days);
                      const isDisabled = isMonthFuture || isMonthPast;

                      return (
                        <button
                          key={monthDef.name}
                          onClick={() => !isDisabled && setSelectedMonth(monthDef.name)}
                          disabled={isDisabled}
                          title={isMonthFuture ? "Future months are not yet available" : isMonthPast ? "Dates before May 31st are not available" : undefined}
                          className={`py-1.5 px-2 text-xs font-bold rounded-md border text-center transition-all ${
                            isDisabled
                              ? 'opacity-30 cursor-not-allowed bg-stone-50 border-stone-100 text-stone-400'
                              : selectedMonth === monthDef.name
                                ? 'bg-[#E26D5C] text-white border-[#E26D5C] cursor-pointer'
                                : 'bg-white border-[#EAE7E0] text-[#5C564E] hover:bg-[#FAF9F6] cursor-pointer'
                          }`}
                        >
                          {monthDef.name.slice(0, 3)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Grid of Days */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-[#A89F91] uppercase font-bold block">
                    2. Select Day
                  </label>
                  <div className="grid grid-cols-7 gap-1 max-h-[160px] overflow-y-auto border border-[#EAE7E0] rounded-lg p-2.5 bg-white">
                    {Array.from(
                      { length: MONTH_DEFS[getMonthIndex(selectedMonth)].days },
                      (_, i) => i + 1
                    ).map((d) => {
                      const isDayFuture = isFutureDateInYear(selectedMonth, d);
                      const isDayPast = isBeforeLaunchDate(selectedMonth, d);
                      const isDisabled = isDayFuture || isDayPast;

                      return (
                        <button
                          key={d}
                          onClick={() => !isDisabled && setSelectedDay(d)}
                          disabled={isDisabled}
                          title={isDayFuture ? "Future dates are not yet available" : isDayPast ? "Dates before May 31st are not available" : undefined}
                          className={`aspect-square text-xs font-bold rounded-md flex items-center justify-center transition-all ${
                            isDisabled
                              ? 'opacity-30 cursor-not-allowed bg-stone-50 text-stone-400'
                              : selectedDay === d
                                ? 'bg-[#E26D5C] text-white cursor-pointer'
                                : 'hover:bg-[#FAF9F6] text-[#5C564E] cursor-pointer'
                          }`}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Perform Jump Trigger */}
                <button
                  onClick={() => setIsJumpModalOpen(false)}
                  className="w-full py-2.5 bg-[#E26D5C] text-white text-xs font-bold font-mono tracking-wider rounded-xl hover:bg-[#d55e4d] active:scale-98 transition-all cursor-pointer"
                >
                  SHOW TIMELINE CHRONICLE
                </button>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="w-full border-t border-[#EAE7E0] mt-12 pt-6 pb-6 text-center text-[10px] text-[#A89F91] font-mono tracking-[0.2em] font-bold flex flex-col md:flex-row justify-center items-center gap-4" id="footer_section">
        <p>RAMAKRISHNA ORDER HISTORY PROJECT</p>
      </footer>

    </div>
  );
}
