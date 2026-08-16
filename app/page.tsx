"use client";

import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Tools from "@/components/sections/Tools";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <main>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <Hero />
      <About />
      <Tools />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}