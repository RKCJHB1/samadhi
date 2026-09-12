import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const EXPERIENCES = [
  {
    id: "obstacles",
    label: "Remove the Obstacles",
    src: "/ganeshatest/obstacles/index.html?v=20260912g",
    title: "Help Ganesha Remove the Obstacles",
  },
  {
    id: "symbolism",
    label: "Discover the Meaning",
    src: "/ganeshatest/symbolism/index.html",
    title: "Discover the Meaning of Ganesha",
  },
] as const;

type ExperienceId = (typeof EXPERIENCES)[number]["id"];

const GaneshaTestPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("view");
  const activeId: ExperienceId = requested === "symbolism" ? "symbolism" : "obstacles";
  const [iframeReady, setIframeReady] = useState(false);

  const active = useMemo(
    () => EXPERIENCES.find((experience) => experience.id === activeId) ?? EXPERIENCES[0],
    [activeId]
  );

  useEffect(() => {
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    document.title = `${active.title} (Test) | Ramakrishna Centre of South Africa, Johannesburg`;
    return () => {
      document.head.removeChild(robots);
    };
  }, [active.title]);

  useEffect(() => {
    setIframeReady(false);
  }, [active.src]);

  const selectExperience = (id: ExperienceId) => {
    setSearchParams(id === "obstacles" ? {} : { view: id }, { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fffdf7] text-[#281d19]">
      <header className="border-b border-[#f8eacb] bg-[#fff8e7]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#741f26]">
              Unlisted test page — not linked from the rest of the website
            </p>
            <p className="text-sm text-[#6f625a]">
              Share this URL only for review.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {EXPERIENCES.map((experience) => {
              const isActive = experience.id === activeId;
              return (
                <button
                  key={experience.id}
                  type="button"
                  onClick={() => selectExperience(experience.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-[#741f26] bg-[#741f26] text-white"
                      : "border-[#f3c75d] bg-white text-[#741f26] hover:bg-[#fffaf0]"
                  }`}
                >
                  {experience.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="relative min-h-0 flex-1">
        {!iframeReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#fffdf7] text-sm text-[#6f625a]">
            Loading the interactive experience…
          </div>
        )}
        <iframe
          key={active.src}
          title={active.title}
          src={active.src}
          className="h-[calc(100vh-5.5rem)] w-full border-0 bg-[#fffdf7] md:h-[calc(100vh-4.75rem)]"
          onLoad={() => setIframeReady(true)}
        />
      </main>
    </div>
  );
};

export default GaneshaTestPage;
