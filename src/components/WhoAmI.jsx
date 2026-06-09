/* eslint-disable react-hooks/purity */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WhoAmI = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleElevenClick = () => {
    if (clickCount < 4) {
      setClickCount((prev) => prev + 1);
    } else {
      setShowEasterEgg(true);
      setClickCount(0);
      setTimeout(() => {
        setShowEasterEgg(false);
      }, 4000);
    }
  };

  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="whoami"
      // Адаптивні вертикальні відступи: py-16 для мобілок, py-24 для ПК
      className="relative z-10 min-h-screen flex items-center py-16 lg:py-24 border-t border-white/5 overflow-hidden"
    >
      {/* ЕФЕКТ ПАСХАЛКИ (ВИБУХ JS ТА 11) */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] pointer-events-none flex items-center justify-center overflow-hidden will-change-opacity"
          >
            <div className="absolute inset-0 bg-[#05020A]/80 backdrop-blur-sm" />

            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="relative z-10 px-6 py-4 md:px-8 md:py-6 rounded-2xl bg-[#F7DF1E]/10 border-2 border-[#F7DF1E] shadow-[0_0_50px_rgba(247,223,30,0.4)] backdrop-blur-md mx-4 will-change-transform"
            >
              <p className="text-[#F7DF1E] font-mono text-lg md:text-3xl font-bold tracking-tight text-center">
                &gt; console.log("Achievement unlocked: JavaScript Child. ");
              </p>
            </motion.div>

            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`js-particle-${i}`}
                initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * 1000,
                  y: (Math.random() - 0.5) * 1000,
                  scale: Math.random() * 2 + 0.5,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute text-3xl md:text-5xl font-bold drop-shadow-[0_0_15px_rgba(247,223,30,0.8)] will-change-transform"
                style={{ color: i % 2 === 0 ? "#F7DF1E" : "#EC4899" }}
              >
                {i % 2 === 0 ? "JS" : "11"}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Адаптивний gap: 8 на мобілках, 16 на ПК */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16 relative">
        {/* ========================================== */}
        {/* ЛІВА ЧАСТИНА: ЗАГОЛОВОК                    */}
        {/* ========================================== */}
        {/* Вирівнювання: text-left всюди. Залипання: lg:sticky тільки для ПК */}
        <div className="w-full lg:w-5/12 flex flex-col justify-start text-left relative z-20 min-w-0 lg:sticky lg:top-32">
          {/* Світіння підлаштоване під ліве вирівнювання */}
          <div className="absolute top-1/2 left-0 lg:left-1/4 -translate-y-1/2 w-48 lg:w-64 h-48 lg:h-64 bg-euphoria-purple/30 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 lg:left-1/2 w-32 lg:w-48 h-32 lg:h-48 bg-euphoria-pink/20 blur-[70px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 will-change-transform"
          >
            {/* Адаптивний розмір шрифту */}
            <h2 className="text-[18vw] sm:text-[12vw] md:text-[10vw] lg:text-[80px] xl:text-[100px] 2xl:text-[120px] leading-[0.85] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-euphoria-pink drop-shadow-lg mb-4">
              MY <br /> STORY
            </h2>
            <div className="block">
              <p className="text-euphoria-purple tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm lg:text-base font-semibold border-l-2 border-euphoria-purple pl-3 md:pl-4 ml-1">
                Read carefully
              </p>
            </div>
          </motion.div>
        </div>

        {/* ========================================== */}
        {/* ПРАВА ЧАСТИНА: РОЗГОРТАННЯ ТЕКСТУ          */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full lg:w-7/12 relative z-10 min-w-0 will-change-transform"
        >
          {/* Адаптивні падінги та радіус */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-12 rounded-[2rem] lg:rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-euphoria-glow relative overflow-hidden group transition-all duration-700">
            <div className="absolute top-0 right-0 w-48 lg:w-64 h-48 lg:h-64 bg-euphoria-pink/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 lg:w-64 h-48 lg:h-64 bg-euphoria-blue/10 blur-[80px] rounded-full pointer-events-none" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.15 }}
              className="text-gray-300 font-light leading-relaxed text-sm sm:text-base lg:text-lg space-y-5 sm:space-y-6 relative z-10"
            >
              {/* === ЗАВЖДИ ВИДИМА ЧАСТИНА === */}
              <motion.p
                variants={textVariant}
                className="will-change-transform will-change-opacity"
              >
                Я людина, яка ще в дитинстві розбирала пульти замість того, щоб
                ними користуватись. Не тому що хотіла зламати — а тому що хотіла{" "}
                <span className="text-white font-medium">
                  зрозуміти, як усе влаштовано всередині
                </span>
                . І ця звичка нікуди не ділась досі: якщо щось можна зробити
                краще, зрозуміти глибше або розібрати до самого дна — я розберу.
              </motion.p>

              <motion.p
                variants={textVariant}
                className="pl-4 sm:pl-6 border-l-2 border-euphoria-pink/50 italic bg-gradient-to-r from-euphoria-pink/10 to-transparent py-3 rounded-r-xl shadow-[inset_0_0_10px_rgba(236,72,153,0.02)] will-change-transform will-change-opacity"
              >
                У 1-у класі поки всі вчились додавати «1+1» і в них виходило
                «2», то в мене вийшло
                <motion.span
                  whileHover={{
                    scale: 1.1,
                    textShadow: "0 0 15px rgba(247,223,30,0.8)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleElevenClick}
                  className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-lg sm:text-xl md:text-2xl px-1 cursor-pointer inline-block transition-colors will-change-transform"
                  style={{ color: clickCount > 2 ? "#F7DF1E" : "white" }}
                  title="Клікни мене!"
                >
                  «11»
                </motion.span>{" "}
                — і відтоді багато хто жартує, що мій батько JavaScript. Думаю,
                це був знак. У 4-му класі я вперше спробувала створити алгоритм
                на Scratch — і саме тоді, здається, остаточно визначилась із
                напрямком.
              </motion.p>

              {/* === ПРИХОВАНА ЧАСТИНА (РОЗГОРТАЄТЬСЯ) === */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden will-change-transform"
                  >
                    <div className="space-y-5 sm:space-y-6 pt-5 sm:pt-6 border-t border-white/5 mt-5 sm:mt-6">
                      <p>
                        Далі все розвивалось послідовно і з власної ініціативи:
                        у 9-му класі —{" "}
                        <span className="text-white">Python</span>, у 10-му —
                        курс з веб-розробки (
                        <span className="text-white">HTML/CSS</span>). Вступивши
                        на ПЗ, вивчила <span className="text-white">C/C++</span>
                        , а потрапивши в{" "}
                        <span className="text-euphoria-pink font-bold drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">
                          BEST
                        </span>
                        , зрозуміла, що хочу йти глибше. Не зупинятись на тому,
                        що вже знаю, а постійно рухатись до наступного рівня.
                        Тому освоїла{" "}
                        <span className="text-white font-medium drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">
                          React, Tailwind, Next.js, Redux, бази даних і
                          Telegram-боти
                        </span>{" "}
                        — тому, що зрозуміла: без цього не буде того результату,
                        який я хочу бачити.
                      </p>

                      <p>
                        Зараз я більше фокусуюсь на тому, як людина взаємодіє з
                        продуктом. Чи зрозумілий інтерфейс? Чи відчувається
                        логіка в кожному елементі? Чи є в цьому щось живе —
                        анімація, пасхалка, деталь, яка змушує затриматись і
                        посміхнутись? Саме це відрізняє сайт від{" "}
                        <span className="text-euphoria-blue font-medium">
                          продукту з характером
                        </span>
                        .
                      </p>

                      <p>
                        Я також дуже відкрита і емпатична людина — люблю
                        спілкуватись, люблю бути частиною команди і допомагати
                        не лише у своїй зоні відповідальності, а й там, де
                        взагалі потрібні руки або просто підтримка. З технічного
                        боку: вмію налаштовувати{" "}
                        <span className="text-white font-medium">
                          проєктор та іншу техніку
                        </span>
                        , а вдома є{" "}
                        <span className="text-gray-400 italic">
                          ціла колекція шнурів і перехідників на будь-який
                          випадок життя
                        </span>{" "}
                        — так що з цим теж впораюсь.
                      </p>

                      <p>
                        Окремо хочу сказати, що перед тим як подавати мотивашку,
                        я взяла КТ у трьох людей. З{" "}
                        <span className="text-white font-medium">
                          Олексієм Тарчинським
                        </span>{" "}
                        — він детально розповів про загальну посаду{" "}
                        <span className="text-euphoria-blue font-bold tracking-wide uppercase px-1.5 py-0.5 bg-euphoria-blue/10 border border-euphoria-blue/30 rounded-md">
                          IT Responsible
                        </span>
                        : сайт, брошури, верстка, структура роботи. З{" "}
                        <span className="text-white font-medium">
                          Олегом Власюком
                        </span>{" "}
                        — він поділився конкретним досвідом у кортімі{" "}
                        <span className="text-euphoria-pink font-bold">
                          BTW
                        </span>
                        : як краще робити і як не робити, з чого починати, з ким
                        найбільше буде взаємодія. І з{" "}
                        <span className="text-white font-medium">
                          Романом Сікорським
                        </span>{" "}
                        — від нього дізналась про актуальні технології і стек.
                        Тому я вже розумію контекст, очікування і те, що
                        готувати.
                      </p>

                      <div className="inline-block px-5 py-4 sm:px-6 sm:py-4 rounded-2xl bg-euphoria-pink/10 border border-euphoria-pink/30 shadow-[0_0_20px_rgba(236,72,153,0.15)] relative overflow-hidden mt-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-euphoria-purple/20 to-euphoria-pink/20 mix-blend-overlay pointer-events-none" />
                        <p className="text-white font-bold tracking-wide relative z-10 text-base sm:text-lg md:text-xl">
                          Тому я розумію, з чим маю справу, і готова викладатись
                          на всі{" "}
                          <span className="text-euphoria-pink drop-shadow-[0_0_8px_#EC4899] text-lg sm:text-xl md:text-2xl">
                            1000%!!!
                          </span>{" "}
                          🔥
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* КНОПКА РОЗГОРТАННЯ */}
            <div className="mt-8 flex justify-center lg:justify-start relative z-20">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-mono tracking-widest text-euphoria-pink transition-all duration-300 flex items-center gap-2 group w-full sm:w-auto justify-center"
              >
                {isExpanded ? "SHOW LESS" : "READ FULL STORY"}
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block will-change-transform"
                >
                  ▼
                </motion.span>
              </button>
            </div>

            {/* Градієнт, який ховає текст знизу (зникає, коли відкрито) */}
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#0B0914] to-transparent pointer-events-none rounded-b-[2rem] lg:rounded-b-[2.5rem]" />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoAmI;
