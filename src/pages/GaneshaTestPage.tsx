import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const EXPERIENCES = [
  {
    id: "obstacles",
    label: "Remove the Obstacles",
    shortLabel: "Obstacles",
    src: "/ganeshatest/obstacles/index.html?v=20260913a",
    title: "Help Ganesha Remove the Obstacles",
  },
  {
    id: "symbolism",
    label: "Discover the Meaning",
    shortLabel: "Meaning",
    src: "/ganeshatest/symbolism/index.html?v=20260913a",
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
    document.title = `${active.title} | Ramakrishna Centre of South Africa, Johannesburg`;
  }, [active.title]);

  useEffect(() => {
    setIframeReady(false);
  }, [active.src]);

  const selectExperience = (id: ExperienceId) => {
    setSearchParams(id === "obstacles" ? {} : { view: id }, { replace: true });
  };

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-[#fffdf7] text-[#281d19]">
      <header className="shrink-0 border-b border-[#f8eacb] bg-[#fff8e7]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2 md:gap-3 md:px-4 md:py-3">
          <div className="min-w-0">
            <Link
              to="/learn#festivals"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#741f26] hover:underline md:text-xs"
            >
              ← Festivals
            </Link>
            <p className="truncate text-sm text-[#6f625a]">
              Ganesh Chaturthi
            </p>
          </div>
          <div className="flex shrink-0 gap-1.5 sm:gap-2">
            {EXPERIENCES.map((experience) => {
              const isActive = experience.id === activeId;
              return (
                <button
                  key={experience.id}
                  type="button"
                  onClick={() => selectExperience(experience.id)}
                  className={`min-h-10 rounded-full border px-3 py-2 text-xs font-medium transition-colors sm:min-h-0 sm:px-4 sm:text-sm ${
                    isActive
                      ? "border-[#741f26] bg-[#741f26] text-white"
                      : "border-[#f3c75d] bg-white text-[#741f26] hover:bg-[#fffaf0]"
                  }`}
                >
                  <span className="sm:hidden">{experience.shortLabel}</span>
                  <span className="hidden sm:inline">{experience.label}</span>
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
          className="h-full w-full border-0 bg-[#fffdf7]"
          onLoad={() => setIframeReady(true)}
        />
      </main>
    </div>
  );
};

export default GaneshaTestPage;
