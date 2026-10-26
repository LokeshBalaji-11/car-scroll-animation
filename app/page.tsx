"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const STATS = [
  { value: "212 mph", label: "Top Speed" },
  { value: "2.8 s", label: "0–60 mph" },
  { value: "98%", label: "Aerodynamics" },
];

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const car = useRef<HTMLImageElement>(null);
  const trail = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.config({ force3D: true });

      /* 1. Initial Load Animation (Requirement #2) */
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          q(".headline-word"),
          { autoAlpha: 0, y: 32 },
          { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.18 }
        )
        .fromTo(
          q(".stat-inner"),
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.2 },
          "-=0.4"
        );

      /* 2. Scroll-Based Animation (Requirement #3 - Tied to Scroll Progress) */
      const vw = () => document.documentElement.clientWidth;
      const carW = () => car.current?.offsetWidth ?? 0;
      const maxX = () => vw() - carW();

      const tl = gsap.timeline({
        defaults: { ease: "none" }, 
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1.5, // This makes it tied to the scrollbar smoothly
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(car.current, { x: 0 }, { x: maxX }, 0)
        .fromTo(
          trail.current,
          { scaleX: () => carW() / 2 / vw() },
          { scaleX: () => (maxX() + carW() / 2) / vw() },
          0
        )
        .to(q(".headline"), { opacity: 0.4, duration: 0.5 }, 0);

      q(".stat").forEach((el, i) => {
        tl.fromTo(el, { opacity: 0.25 }, { opacity: 1, duration: 0.15 }, 0.17 + i * 0.33);
      });
    },
    { scope: root }
  );

  return (
    <main>
      {/* Background */}
      <section ref={root} className="relative h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black text-white">
        
        {/* Headline (Requirement #1) */}
        <h1
          aria-label="Welcome Itzfizz"
          className="headline absolute inset-x-0 top-[9vh] flex flex-wrap justify-center gap-x-[1.4em] px-4 text-center text-sm font-black uppercase tracking-[0.55em] sm:text-5xl"
        >
          <span aria-hidden className="headline-word reveal invisible bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
            W E L C O M E
          </span>
          <span aria-hidden className="headline-word reveal invisible bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">
            I T Z F I Z Z
          </span>
        </h1>

        <div className="absolute inset-x-0 top-[32vh]">
          {/* Trail */}
          <div
            ref={trail}
            className="absolute inset-0 origin-left bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 will-change-transform shadow-[0_0_30px_rgba(249,115,22,0.8)]"
            style={{ transform: "scaleX(0.07)" }}
          />
          {/* Car */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={car}
            src={`${BASE_PATH}/image_08731c.png`}
            alt="Top view of an orange sports car"
            width={519}
            height={247}
            draggable={false}
            className="relative block h-auto w-[clamp(220px,34vw,520px)] max-w-none select-none will-change-transform drop-shadow-2xl"
          />
        </div>

        {/* Stats below the car (Requirement #1) */}
        <div className="absolute inset-x-0 bottom-[9vh] grid grid-cols-3 gap-4 px-[5%] text-center">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <div className="stat-inner reveal invisible bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl py-6 shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-transform hover:scale-105">
                <div className="text-3xl font-extrabold bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent sm:text-6xl drop-shadow-sm">
                  {s.value}
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-widest text-neutral-300 sm:text-sm font-bold">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}