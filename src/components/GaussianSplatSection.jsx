import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";

function StatusPill({ children, tone = "default" }) {
  const toneClass =
    tone === "error"
      ? "border-rose-400/30 bg-rose-50 text-rose-700"
      : tone === "success"
        ? "border-emerald-400/30 bg-emerald-50 text-emerald-700"
        : "border-black/10 bg-white/80 text-stone-600";

  return (
    <div
      className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] ${toneClass}`}
    >
      {children}
    </div>
  );
}

export default function GaussianSplatSection({ content }) {
  const mountRef = useRef(null);
  const viewerRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function setupViewer() {
      const rootElement = mountRef.current;

      if (!rootElement) {
        return;
      }

      try {
        setStatus("loading");
        setErrorMessage("");

        const GaussianSplats3D = await import("@mkkellogg/gaussian-splats-3d");

        if (cancelled || !mountRef.current) {
          return;
        }

        const viewer = new GaussianSplats3D.Viewer({
          rootElement,
          cameraUp: [0, 1, 0],
          initialCameraPosition: [0, 2.2, 8],
          initialCameraLookAt: [0, 1.2, 0],
          sharedMemoryForWorkers: false,
          gpuAcceleratedSort: false,
          integerBasedSort: false,
          ignoreDevicePixelRatio: true,
          sceneRevealMode: GaussianSplats3D.SceneRevealMode.Instant,
          sphericalHarmonicsDegree: 0,
        });

        viewerRef.current = viewer;

        await viewer.addSplatScene(content.splatUrl, {
          format: content.splatUrl.endsWith(".ksplat")
            ? GaussianSplats3D.SceneFormat.KSplat
            : GaussianSplats3D.SceneFormat.Ply,
          splatAlphaRemovalThreshold: 5,
          showLoadingUI: true,
          progressiveLoad: true,
          rotation: [0, 0, 1, 0],
        });

        if (cancelled) {
          await viewer.dispose();
          return;
        }

        viewer.start();
        setStatus("ready");
      } catch (error) {
        if (cancelled) {
          return;
        }

        setStatus("error");
        setErrorMessage(error?.message || "Не удалось загрузить сцену Gaussian Splatting.");
      }
    }

    setupViewer();

    return () => {
      cancelled = true;

      const viewer = viewerRef.current;
      viewerRef.current = null;

      if (viewer) {
        viewer.dispose().catch(() => {});
      }
    };
  }, [content.splatUrl]);

  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,var(--page-bg-soft)_0%,var(--page-bg)_100%)] py-24 md:py-30">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-black/8 bg-[linear-gradient(180deg,#edf2ea_0%,#d7e2d3_100%)] shadow-[0_22px_60px_rgba(0,0,0,0.12)] md:min-h-[42rem]">
          <div ref={mountRef} className="absolute inset-0" />

          <div className="pointer-events-none absolute left-4 top-4 z-10 flex max-w-xl flex-wrap gap-2 md:left-5 md:top-5">
            <StatusPill
              tone={status === "ready" ? "success" : status === "error" ? "error" : "default"}
            >
              {status === "ready"
                ? "Gaussian viewer активен"
                : status === "error"
                  ? "Сцена не загружена"
                  : "Загрузка сцены"}
            </StatusPill>
            <StatusPill>{content.fileLabel}</StatusPill>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(6,77,66,0.08),transparent)]" />

          {status === "error" ? (
            <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 rounded-[1.5rem] border border-rose-200 bg-rose-50/95 px-5 py-4 text-sm leading-7 text-rose-700 shadow-[0_12px_30px_rgba(0,0,0,0.08)] md:inset-x-auto md:right-5 md:max-w-lg">
              {errorMessage}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
