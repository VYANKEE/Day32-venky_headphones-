import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowDown } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 80;
const getFramePath = (index) => {
  const number = index.toString().padStart(3, "0"); 
  return `/images/Create_a_smooth_1080p_202601282028_${number}.jpg`;
};

const HeroScroll = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  // Refs for different text blocks
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  
  const [images, setImages] = useState([]);
  const [framesLoaded, setFramesLoaded] = useState(0);

  // PRELOADER
  useEffect(() => {
    const imgArray = [];
    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setFramesLoaded(loadedCount);
      };
      imgArray.push(img);
    }
    setImages(imgArray);
  }, []);

  // ANIMATION LOGIC
  useGSAP(() => {
    if (framesLoaded < frameCount) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    const updateCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        renderFrame(0);
    };

    const renderFrame = (index) => {
      if (images[index]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[index];
        // Calculate aspect ratio to cover the screen completely
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const playhead = { frame: 0 };

    // MAIN TIMELINE (IMAGE SCROLL)
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        // YAHAN CHANGE KIYA HAI: Speed fast karne ke liye value kam ki
        end: "+=350%", 
        scrub: 0.5, // Thoda snappy feel ke liye kam kiya
        pin: true,
      },
    });

    tl.to(playhead, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => renderFrame(Math.round(playhead.frame)),
    });

    // TEXT CHANGING TIMELINE (Seperate timeline linked to same trigger duration)
    let textTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=350%", // Must match main timeline end
          scrub: true,
        },
      });

    // Text Sequence Logic
    textTl
        .to(text1Ref.current, { opacity: 0, duration: 0.1 }, "start+=5%") // Text 1 Fade Out quickly
        .fromTo(text2Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, "start+=10%") // Text 2 Fade In
        .to(text2Ref.current, { opacity: 0, duration: 0.1 }, "start+=50%") // Text 2 Fade Out
        .fromTo(text3Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, "start+=55%"); // Text 3 Fade In


    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [framesLoaded]);

  // Shared Text Styles
  const textOverlayStyle = "absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center transition-opacity duration-300";
  const mainTitleStyle = "text-[12vw] md:text-[10vw] leading-none font-black tracking-tighter text-white mix-blend-difference select-none";
  const subtitleStyle = "text-white text-sm md:text-xl tracking-[0.4em] uppercase font-light mt-4 mix-blend-difference";

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505]">
      {framesLoaded < frameCount && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
          <p className="font-mono text-[10px] tracking-[0.5em] animate-pulse">LOADING ASSETS</p>
        </div>
      )}
      <canvas ref={canvasRef} className="block w-full h-full object-cover" />
      
      {/* --- TEXT BLOCK 1 (Initial) --- */}
      <div ref={text1Ref} className={textOverlayStyle}>
        <h1 className={mainTitleStyle}>VENKY</h1>
        <p className={subtitleStyle}>Sonic Perfection</p>
      </div>

      {/* --- TEXT BLOCK 2 (Middle Scroll) --- */}
      <div ref={text2Ref} className={`${textOverlayStyle} opacity-0`}>
        <h1 className={mainTitleStyle}>SILENCE</h1>
        <p className={subtitleStyle}>World Off. Music On.</p>
      </div>

      {/* --- TEXT BLOCK 3 (End Scroll) --- */}
      <div ref={text3Ref} className={`${textOverlayStyle} opacity-0`}>
        <h1 className={mainTitleStyle}>OBSESSIVE</h1>
        <p className={subtitleStyle}>Designed for ears, engineered for souls.</p>
      </div>
        
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce z-20 mix-blend-difference text-white">
          <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
          <FaArrowDown />
      </div>
    </div>
  );
};
export default HeroScroll;