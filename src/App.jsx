// eslint-disable-next-line no-unused-vars
import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import EuphoriaStars from "./components/EuphoriaStars";
import Hero from "./components/Hero";

// 🔥 ЛІНИВЕ ЗАВАНТАЖЕННЯ (Lazy Loading)
// Ці секції не видно на першому екрані.
// Тепер вони вантажитимуться лише тоді, коли браузер відмалює головне.
const WhoAmI = lazy(() => import("./components/WhoAmI"));
const WhyMe = lazy(() => import("./components/WhyMe"));
const WhyBTW = lazy(() => import("./components/WhyBTW"));
const Skills = lazy(() => import("./components/Skills"));
const Answers = lazy(() => import("./components/Answers"));
const FinalCTA = lazy(() => import("./components/FinalCTA"));

function App() {
  return (
    // ВИПРАВЛЕННЯ: Додано overflow-x-hidden, w-full та max-w-[100vw]
    // Це жорстко фіксує ширину сайту по ширині екрану і не дає йому "їздити" в боки
    <div className="bg-[#0B0914] min-h-screen w-full max-w-[100vw] text-white font-sans selection:bg-euphoria-pink selection:text-white relative overflow-x-hidden flex flex-col">
      <Navbar />

      {/* Якщо EuphoriaStars використовує багато DOM-елементів (div) замість Canvas, воно теж може лагати. */}
      <EuphoriaStars />

      {/* ФОН: Ейфорія */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* ФІКС 1: Прибрано mix-blend-overlay. Залишаємо просто opacity. Це збереже купу FPS! */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>

        {/* ФІКС 2: Додано клас will-change-transform */}
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -80, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] left-[10%] w-[50vw] h-[50vw] bg-euphoria-purple/20 blur-[150px] rounded-full mix-blend-screen will-change-transform"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[5%] w-[45vw] h-[45vw] bg-euphoria-pink/15 blur-[180px] rounded-full mix-blend-screen will-change-transform"
        />
      </div>

      <main className="w-full flex-grow flex flex-col relative z-10">
        <Hero />

        {/* Suspense очікує завантаження "лінивих" компонентів */}
        <Suspense fallback={<div className="min-h-screen" />}>
          <WhoAmI />
          <WhyMe />
          <WhyBTW />
          <Skills />
          <Answers />
          <FinalCTA />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
