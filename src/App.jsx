import React, { useLayoutEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import HeroScroll from './components/HeroScroll';
import { FaApple, FaSpotify, FaSoundcloud, FaBatteryFull, FaMicrochip } from "react-icons/fa";
import { SiDolby } from "react-icons/si";
import { BsSoundwave } from "react-icons/bs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Text Animation
      const texts = document.querySelectorAll(".reveal-text");
      texts.forEach((text) => {
        gsap.fromTo(text, 
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Bento Grid Stagger Animation
      gsap.from(".bento-card", {
        y: 50, opacity: 0,
        duration: 0.8, stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#features",
            start: "top 60%",
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    // Lenis smooth scroll settings adjusted for snappier feel
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothTouch: true }}>
      <main ref={mainRef} className="bg-[#050505] min-h-screen text-white selection:bg-white selection:text-black">
        
        {/* NAVBAR */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-8 py-6 flex justify-between items-center z-50 mix-blend-difference">
          <div className="text-2xl font-black tracking-tighter cursor-pointer hover:opacity-70 transition">VNKY.</div>
          <button className="hidden md:block px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            Pre-order
          </button>
        </nav>

        {/* HERO SECTION WITH DYNAMIC TEXT */}
        <HeroScroll />

        {/* MARQUEE SECTION */}
        <div className="py-6 bg-white text-black overflow-hidden whitespace-nowrap border-y border-white relative z-10">
            <div className="animate-marquee inline-block">
                <span className="text-4xl md:text-7xl font-black tracking-tighter mx-6">STUDIO QUALITY</span>
                <span className="text-4xl md:text-7xl font-black tracking-tighter mx-6">•</span>
                <span className="text-4xl md:text-7xl font-black tracking-tighter mx-6">ACTIVE NOISE CANCELLING</span>
                <span className="text-4xl md:text-7xl font-black tracking-tighter mx-6">•</span>
                <span className="text-4xl md:text-7xl font-black tracking-tighter mx-6">60HR BATTERY</span>
                <span className="text-4xl md:text-7xl font-black tracking-tighter mx-6">•</span>
            </div>
        </div>

        {/* SECTION 1: INTRODUCTION */}
        <section className="py-24 md:py-32 flex flex-col justify-center items-center px-6 relative overflow-hidden">
          <div className="max-w-4xl text-center z-10">
            <p className="reveal-text text-blue-500 text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4">Redefining Immersion</p>
            <h2 className="reveal-text text-4xl md:text-7xl font-bold leading-[1.1] mb-8">
              Sound, stripped of <br/> <span className="text-zinc-700">distractions.</span>
            </h2>
            <p className="reveal-text text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              We kept the emotion. The new Venky One isn't just a headphone, it's a private concert hall tailored tailored specifically for your ears.
            </p>
          </div>
        </section>

        {/* SECTION 2: BENTO GRID FEATURES (FIXED EMPTY SPACE) */}
        <section id="features" className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
            <h3 className="reveal-text text-3xl md:text-5xl font-bold mb-12 text-center tracking-tight">Engineered for perfection.</h3>
            
            {/* Grid Layout Fixed: Removed hardcoded height, adjusted gap */}
            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4 md:gap-6">
                
                {/* Large Card (Left) */}
                <div className="bento-card md:col-span-2 md:row-span-2 bg-[#111] rounded-[2rem] p-8 md:p-12 flex flex-col justify-between border border-white/5 overflow-hidden relative min-h-[400px] md:min-h-[500px]">
                    <div className="absolute -top-10 -right-10 opacity-[0.15] pointer-events-none">
                        <BsSoundwave className="text-[18rem] text-white" />
                    </div>
                    <div className="relative z-10">
                        <FaMicrochip className="text-3xl md:text-4xl mb-6 text-blue-500" />
                        <h4 className="text-2xl md:text-4xl font-bold mb-4">V1 Neural Processor</h4>
                        <p className="text-zinc-400 text-base md:text-lg max-w-md leading-relaxed">
                            Our custom silicon analyzes audio 48,000 times per second, optimizing noise cancellation in real-time for pure sonic clarity.
                        </p>
                    </div>
                </div>

                {/* Top Right Card */}
                <div className="bento-card bg-[#111] rounded-[2rem] p-8 border border-white/5 flex flex-col justify-center min-h-[250px]">
                    <FaBatteryFull className="text-3xl text-green-400 mb-4" />
                    <h4 className="text-xl md:text-2xl font-bold mb-2">60 Hr Playtime</h4>
                    <p className="text-zinc-400 text-sm">Uninterrupted listening for a week. 10 min charge = 4 hours.</p>
                </div>

                {/* Bottom Right Card */}
                <div className="bento-card bg-[#111] rounded-[2rem] p-8 border border-white/5 flex flex-col justify-center relative overflow-hidden min-h-[250px]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent pointer-events-none"></div>
                    <SiDolby className="text-4xl mb-4 text-white relative z-10" />
                    <h4 className="text-xl md:text-2xl font-bold mb-2 relative z-10">Spatial Audio</h4>
                    <p className="text-zinc-400 text-sm relative z-10">Cinema-grade 3D sound with dynamic head tracking.</p>
                </div>
            </div>
        </section>

        {/* PARALLAX IMAGE BANNER */}
        <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center mt-20">
            <div 
                className="absolute inset-0 bg-cover bg-center grayscale opacity-50 scale-105"
                style={{ 
                    backgroundImage: "url('/images/Create_a_smooth_1080p_202601282028_045.jpg')", // Using one of your frames as banner
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center 30%" 
                }}
            ></div>
             <div className="absolute inset-0 bg-black/40"></div>
            <div className="z-10 text-center mix-blend-overlay relative">
                <h2 className="text-[12vw] font-black leading-none text-white tracking-tighter">PURE</h2>
                <h2 className="text-[12vw] font-black leading-none text-zinc-400 tracking-tighter">FOCUS</h2>
            </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 px-6 bg-[#080808] text-center">
            <h2 className="text-[8rem] md:text-[12rem] font-black leading-none opacity-10 tracking-tighter select-none -mb-8 md:-mb-12">VENKY</h2>
            <div className="relative z-10">
                <div className="flex justify-center gap-8 mb-8 text-2xl text-white/60">
                    <FaApple className="hover:text-white cursor-pointer transition"/>
                    <FaSpotify className="hover:text-white cursor-pointer transition"/>
                    <FaSoundcloud className="hover:text-white cursor-pointer transition"/>
                </div>
                <p className="text-xs text-zinc-600 uppercase tracking-widest">© 2026 Venky Audio. Designed for the Obsessive.</p>
            </div>
        </footer>

      </main>
    </ReactLenis>
  );
}

export default App;