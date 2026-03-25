import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import SectionHeader from "./SectionHeader";

function ControlChip({ label, value }) {
  return (
    <div className="rounded-full border border-white/14 bg-white/10 px-3 py-2 backdrop-blur-md">
      <span className="block text-[0.6rem] font-bold uppercase tracking-[0.24em] text-white/55">
        {label}
      </span>
      <span className="mt-1 block text-xs font-medium text-white/88">{value}</span>
    </div>
  );
}

function ModelCanvas({ modelUrl, title }) {
  const mountRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const container = mountRef.current;

    if (!container) {
      return undefined;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#dfe8dc");
    scene.fog = new THREE.Fog("#dfe8dc", 14, 28);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(8, 5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = true;
    controls.minDistance = 3;
    controls.maxDistance = 18;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.panSpeed = 0.85;
    controls.touches.ONE = THREE.TOUCH.ROTATE;
    controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;

    const ambientLight = new THREE.AmbientLight("#f7f1df", 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#f4dfab", 2.6);
    keyLight.position.set(7, 10, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight("#c7ddd4", 1.4);
    fillLight.position.set(-8, 5, -6);
    scene.add(fillLight);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(8, 72),
      new THREE.ShadowMaterial({ color: "#000000", opacity: 0.12 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.001;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(16, 16, "#6d8977", "#b7c8b7");
    grid.position.y = 0;
    grid.material.opacity = 0.25;
    grid.material.transparent = true;
    scene.add(grid);

    let frameId = 0;
    let mounted = true;
    let model = null;

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight, false);
    };

    const frameModel = (root) => {
      root.position.set(0, 0, 0);
      root.rotation.set(0, 0, 0);
      root.scale.setScalar(1);

      const initialBox = new THREE.Box3().setFromObject(root);
      const initialSize = initialBox.getSize(new THREE.Vector3());
      const maxDimension = Math.max(initialSize.x, initialSize.y, initialSize.z) || 1;
      const scale = 5.8 / maxDimension;
      root.scale.setScalar(scale);

      const box = new THREE.Box3().setFromObject(root);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const isMobile = container.clientWidth < 768;

      root.position.x -= center.x;
      root.position.y -= box.min.y;
      root.position.z -= center.z;

      if (isMobile) {
        root.position.y += size.y * 0.3;
      }

      const radius = Math.max(size.x, size.z) * 0.5;
      const height = size.y;
      const targetY = isMobile ? height * 0.12 : height * 0.42;
      const cameraY = isMobile ? Math.max(3.4, height * 0.74) : Math.max(3.6, height * 0.9);
      const cameraX = isMobile ? radius * 1.65 : radius * 1.85;
      const cameraZ = isMobile ? radius * 2.1 : radius * 2.15;

      controls.target.set(0, targetY, 0);
      camera.position.set(cameraX, cameraY, cameraZ);
      controls.update();
    };

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    dracoLoader.setDecoderConfig({ type: "js" });

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      modelUrl,
      (gltf) => {
        if (!mounted) {
          return;
        }

        model = gltf.scene;
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        frameModel(model);
        scene.add(model);
        setStatus("ready");
      },
      undefined,
      (error) => {
        if (!mounted) {
          return;
        }

        setStatus("error");
        setErrorMessage(error?.message || "Не удалось загрузить модель.");
      },
    );

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      mounted = false;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      controls.dispose();
      dracoLoader.dispose();
      renderer.dispose();

      if (model) {
        model.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();

            if (Array.isArray(child.material)) {
              child.material.forEach((material) => material.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      }

      container.removeChild(renderer.domElement);
    };
  }, [modelUrl]);

  return (
    <div className="relative h-[38rem] overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#edf2ea_0%,#d8e2d3_100%)] md:h-[52rem] xl:h-[60rem]">
      <div ref={mountRef} className="h-full w-full" aria-label={title} />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,rgba(13,53,41,0.24),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(to_top,rgba(13,53,41,0.18),transparent)] md:hidden" />

      <div className="pointer-events-none absolute right-5 top-5 hidden max-w-sm rounded-[1.4rem] border border-white/16 bg-[rgba(10,40,32,0.2)] p-3 text-white shadow-[0_24px_48px_rgba(0,0,0,0.16)] backdrop-blur-xl md:block">
        <div className="flex flex-wrap justify-end gap-2">
          <ControlChip label="Вращение" value="Зажать и вести" />
          <ControlChip label="Масштаб" value="Колесо мыши" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-3 top-3 md:hidden">
        <div className="mx-auto max-w-sm rounded-[1.4rem] border border-white/14 bg-[rgba(10,40,32,0.22)] px-4 py-3 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-2">
            <ControlChip label="Вращение" value="Поворот пальцем" />
            <ControlChip label="Масштаб" value="Pinch / жест" />
          </div>
        </div>
      </div>

      {status !== "ready" ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[color:var(--page-bg-soft)]/88 backdrop-blur-sm">
          <div className="rounded-full border border-[color:var(--accent)]/20 bg-white/85 px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            {status === "error" ? errorMessage : "Загрузка 3D-модели"}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function ModelViewerSection({ content }) {
  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,var(--page-bg)_0%,var(--page-bg-soft)_100%)] py-24 md:py-30">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
      </div>

      <div className="mt-12 px-0 sm:px-4 lg:px-6">
        <div className="mx-auto w-full max-w-[110rem]">
          <ModelCanvas modelUrl={content.modelUrl} title={content.title} />
        </div>
      </div>
    </section>
  );
}
