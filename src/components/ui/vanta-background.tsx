/** @jsxImportSource react */
"use client";
import React, { useEffect, useRef, useState } from "react";

// Vanta effect types
type VantaEffect = "TOPOLOGY" | "WAVES" | "CLOUDS" | "NET" | "BIRDS" | "FOG" | "GLOBE";

interface VantaBackgroundProps {
  effect?: VantaEffect;
  className?: string;
}

export const VantaBackground: React.FC<VantaBackgroundProps> = ({ 
  effect = "TOPOLOGY",
  className = "" 
}) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  // Load scripts
  useEffect(() => {
    // Load p5.js
    const p5Script = document.createElement('script');
    p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js';
    p5Script.async = true;
    
    p5Script.onload = () => {
      // Load Vanta effect after p5
      const vantaScript = document.createElement('script');
      const effectName = effect.toLowerCase();
      vantaScript.src = `https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.${effectName}.min.js`;
      vantaScript.async = true;
      
      vantaScript.onload = () => {
        setScriptsLoaded(true);
      };
      
      document.body.appendChild(vantaScript);
    };
    
    document.body.appendChild(p5Script);

    return () => {
      // Cleanup scripts on unmount
      const scripts = document.querySelectorAll('script[src*="p5.js"], script[src*="vanta"]');
      scripts.forEach(script => script.remove());
    };
  }, [effect]);

  // Initialize Vanta effect
  useEffect(() => {
    if (!scriptsLoaded || !vantaRef.current) return;

    const initVanta = () => {
      if (vantaEffect) vantaEffect.destroy();

      const windowVanta = (window as any).VANTA;
      if (!windowVanta) return;

      let newEffect;
      
      switch (effect) {
        case "TOPOLOGY":
          newEffect = windowVanta.TOPOLOGY({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x3b82f6,
            backgroundColor: 0x0f172a
          });
          break;
          
        case "WAVES":
          newEffect = windowVanta.WAVES({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x6366f1,
            shininess: 30.00,
            waveHeight: 15.00,
            waveSpeed: 1.00,
            zoom: 0.75
          });
          break;
          
        case "CLOUDS":
          newEffect = windowVanta.CLOUDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            skyColor: 0x1e293b,
            cloudColor: 0x475569,
            cloudShadowColor: 0x0f172a,
            sunColor: 0x3b82f6,
            sunGlareColor: 0x60a5fa,
            sunlightColor: 0x1e3a8a
          });
          break;
          
        case "NET":
          newEffect = windowVanta.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x3b82f6,
            backgroundColor: 0x0f172a,
            points: 10.00,
            maxDistance: 20.00,
            spacing: 15.00
          });
          break;
          
        case "BIRDS":
          newEffect = windowVanta.BIRDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0x0f172a,
            color1: 0x3b82f6,
            color2: 0x8b5cf6,
            colorMode: "lerp",
            birdSize: 1.50,
            wingSpan: 25.00,
            speedLimit: 5.00,
            separation: 50.00
          });
          break;
          
        case "FOG":
          newEffect = windowVanta.FOG({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0x3b82f6,
            midtoneColor: 0x1e293b,
            lowlightColor: 0x0f172a,
            baseColor: 0x0f172a,
            blurFactor: 0.90,
            speed: 1.50,
            zoom: 1.00
          });
          break;
          
        case "GLOBE":
          newEffect = windowVanta.GLOBE({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x3b82f6,
            color2: 0x8b5cf6,
            backgroundColor: 0x0f172a,
            size: 1.00
          });
          break;
          
        default:
          newEffect = windowVanta.TOPOLOGY({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00
          });
      }
      
      setVantaEffect(newEffect);
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initVanta, 100);

    return () => {
      clearTimeout(timer);
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [scriptsLoaded, effect]);

  return (
    <div 
      ref={vantaRef} 
      className={`w-full h-full ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default VantaBackground;
