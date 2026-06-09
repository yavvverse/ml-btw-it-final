import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// 3D Картка з ефектом нахилу та голограми
const TiltCard = ({ title, description, color, isAnchored, onAnchorClick }) => {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isAnchorCard = title === "The Anchor";

  return (
    <div className="relative w-full h-full perspective-1000">
      {/* АНІМАЦІЯ ПАДІННЯ ЛОГОТИПУ BTW (Тільки для Anchor) */}
      <AnimatePresence>
        {isAnchorCard && isAnchored && (
          <motion.div
            initial={{ y: -800, scale: 2, rotate: -20 }}
            animate={{ y: -40, scale: 1.2, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 10,
              mass: 2,
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] pointer-events-none will-change-transform"
          >
            <img
              src="/logo_BTW_white.svg"
              alt="BTW Anchor"
              className="w-24 h-24 drop-shadow-[0_20px_30px_rgba(59,130,246,0.8)] filter transition-all"
            />
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#3B82F6] rounded-full blur-[20px] -z-10 will-change-transform"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Обгортка для ефекту придавлювання */}
      <motion.div
        animate={
          isAnchorCard && isAnchored
            ? { y: 40, rotateZ: 3, scale: 0.95 }
            : { y: 0, rotateZ: 0, scale: 1 }
        }
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-full h-full will-change-transform"
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            borderColor:
              isAnchorCard && isAnchored
                ? `${color}80`
                : "rgba(255,255,255,0.1)",
          }}
          className="relative w-full h-full rounded-3xl border bg-white/[0.02] backdrop-blur-xl transition-colors duration-500 hover:bg-white/[0.05] group will-change-transform flex flex-col"
        >
          {/* Голографічний відблиск (Shimmer) */}
          <motion.div
            style={{
              background: `radial-gradient(circle at center, ${color}25 0%, transparent 70%)`,
              opacity: useTransform(mouseXSpring, [-0.5, 0.5], [0, 1]),
            }}
            className="absolute inset-0 pointer-events-none z-0 group-hover:opacity-100 transition-opacity rounded-3xl will-change-opacity"
          />

          {/* Вміст картки з ефектом глибини. Вирівнювання justify-start для однакового рівня заголовків */}
          <div
            style={{ transform: "translateZ(40px)" }}
            className="relative z-10 p-6 md:p-8 h-full flex flex-col items-center text-center justify-start will-change-transform"
          >
            {/* КЛІКАБЕЛЬНА ЧАСТИНА ДЛЯ ТИТЛУ */}
            <div
              className={`relative w-full mb-6 flex justify-center ${
                isAnchorCard ? "cursor-pointer z-50" : ""
              }`}
              onClick={isAnchorCard ? onAnchorClick : undefined}
              title={
                isAnchorCard && !isAnchored ? "Клікни, щоб кинути якір!" : ""
              }
            >
              {isAnchorCard && !isAnchored && (
                <motion.div
                  animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.1, 0.3, 0.1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-white/20 blur-xl rounded-full pointer-events-none transition-colors will-change-transform"
                />
              )}

              {/* Звичайне відображення (БІЛЕ ДО ХОВЕРА) */}
              <motion.div
                animate={isAnchorCard && !isAnchored ? { y: [-3, 3, -3] } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center justify-center relative w-full will-change-transform"
              >
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white group-hover:opacity-0 transition-opacity duration-500">
                  {title}
                </h3>
                <h3
                  className="text-xl md:text-2xl font-black uppercase tracking-tighter absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(to right, #ffffff, ${color})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {title}
                </h3>
              </motion.div>
            </div>

            {/* Текст опису (збільшений відступ знизу для декоративної лінії) */}
            <div className="text-gray-400 font-light leading-relaxed transition-colors text-sm md:text-base pb-6">
              {description}
            </div>

            {/* Декоративна лінія знизу (завжди внизу завдяки margin-top: auto) */}
            <div
              className="absolute bottom-6 w-12 h-1 rounded-full transition-all duration-500 group-hover:w-24 bg-white/20 group-hover:bg-transparent"
              style={{
                // Щоб колір застосовувався тільки на hover, використаємо змінну стилю
                "--hover-color": color,
              }}
              // Tailwind hack: додаємо стиль через кастомний CSS
            />
            {/* Для лінії робимо хитрий трюк: 2 шари */}
            <div className="absolute bottom-6 w-12 h-1 rounded-full bg-white/20 transition-all duration-500 group-hover:opacity-0" />
            <div
              className="absolute bottom-6 w-12 h-1 rounded-full opacity-0 transition-all duration-500 group-hover:w-24 group-hover:opacity-100"
              style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const WhyMe = () => {
  const [isAnchored, setIsAnchored] = useState(false);

  const handleAnchorDrop = () => {
    if (!isAnchored) {
      setIsAnchored(true);
    }
  };

  const cards = [
    {
      title: "The Visionary",
      color: "#EC4899", // Рожевий
      description: (
        <div className="space-y-3">
          <p>
            Для мене важливо, щоб проєкт викликав емоції з першої секунди. Коли
            людина відкриває сайт{" "}
            <span className="font-bold text-white transition-all duration-500 group-hover:text-euphoria-pink group-hover:drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">
              BTW
            </span>
            , я хочу, щоб вона одразу відчула: це буде щось особливе. Щось живе
            — з характером і тим самим вайбом, який є в самому івенті.
          </p>
          <p>
            Тому я постійно думаю про кожен елемент.{" "}
            <span className="font-medium text-white transition-colors duration-500 group-hover:text-euphoria-pink">
              Анімації, пасхалки
            </span>{" "}
            <span className="italic opacity-70">
              (спробуй зловити 🛸, і в розповідях знайти виділені слова, вони
              теж пасхалки, спробуй знайти усі))))
            </span>
            , маленькі фішки, які помічають не всі — саме вони роблять проєкт
            таким, що його запам'ятовують. І я готова викладатись на повну!
          </p>
        </div>
      ),
    },
    {
      title: "Tech Adaptability",
      color: "#8B5CF6", // Фіолетовий
      description: (
        <p>
          Я вчусь дуже швидко — і завжди через практику. Курси, YouTube,
          документація — і одразу все тестую в коді, бо тільки так воно реально
          засвоюється. Коли я потрапила в{" "}
          <span className="font-bold text-white transition-all duration-500 group-hover:text-[#8B5CF6] group-hover:drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">
            BEST
          </span>
          , мені довелось з нуля освоювати{" "}
          <span className="font-medium text-white transition-all duration-500 group-hover:text-[#8B5CF6] group-hover:drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">
            React
          </span>{" "}
          — і я так втягнулась, що досить швидко почала збирати власні проєкти і
          розбиратись, як робити круто. Я{" "}
          <span className="font-medium text-white border-b border-white/30 transition-colors duration-500 group-hover:border-[#8B5CF6]/50 group-hover:text-gray-200">
            не боюсь помилок
          </span>{" "}
          — більше того, я їх люблю, бо кожна помилка дає зрозуміти те, що ніяка
          теорія не пояснить.
        </p>
      ),
    },
    {
      title: "The Anchor",
      color: "#3B82F6", // Синій
      description: (
        <p>
          Коли щось йде не за планом — а в роботі над івентом це буває — я не
          зависаю в паніці і не починаю шукати, хто винен. Я швидко перемикаюсь
          і думаю,{" "}
          <span className="font-medium text-white transition-colors duration-500 group-hover:text-[#3B82F6]">
            що можна зробити прямо зараз
          </span>
          . Думаю, це одна з моїх сильних сторін: вміти зберігати{" "}
          <span className="font-bold text-white transition-all duration-500 group-hover:text-[#3B82F6] group-hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
            холодну голову
          </span>{" "}
          тоді, коли все навколо горить. Для{" "}
          <span className="inline-block whitespace-nowrap font-mono bg-white/10 px-1.5 py-0.5 rounded transition-colors duration-500 group-hover:bg-[#3B82F6]/20 group-hover:text-[#3B82F6] text-white">
            IT-посади
          </span>{" "}
          під час івенту це критично — бо якщо щось ламається за 20 хвилин до
          початку, команді потрібна людина, яка вирішить цю проблему.
        </p>
      ),
    },
    {
      title: "100% Reliable",
      color: "#10B981", // Смарагдовий
      description: (
        <p>
          Я відповідально ставлюсь до всього, за що берусь — і це не красиві
          слова. Якщо задача на мені, вона буде зроблена. І{" "}
          <span className="font-medium text-white transition-colors duration-500 group-hover:text-[#10B981]">
            зроблена так, щоб не соромно було показати команді
          </span>
          . Якщо щось іде не так, я не чекаю, поки хтось інший розбереться — я
          сама розбираюсь і рухаюсь далі. Для мене важливо бути людиною, на яку
          можна{" "}
          <span className="font-bold text-white transition-all duration-500 group-hover:text-[#10B981] group-hover:drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">
            покластись у будь-який момент.
          </span>
        </p>
      ),
    },
    {
      title: "Vibe Maker",
      color: "#F59E0B", // Золотий
      description: (
        <p>
          <span className="font-black tracking-wider text-white transition-all duration-500 group-hover:text-[#F59E0B] group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
            WORK HARD, PARTY HARDER
          </span>{" "}
          — і цього я дотримуюсь свято. Для мене BTW — це не тільки про технічну
          роботу. Це про спільний вайб і ті моменти, коли вся{" "}
          <span className="font-medium text-white transition-colors duration-500 group-hover:text-[#F59E0B]">
            кортіма
          </span>{" "}
          збирається разом. Я хочу зробити продукт, яким ми будемо пишатись — і
          потім святкувати це разом. Бути на тих зборах,{" "}
          <span className="font-medium italic text-white transition-colors duration-500 group-hover:text-[#F59E0B]">
            афтерах і афтерафтерах
          </span>
          , про які потім ще рік згадують і з яких роблять найвайбовіші
          відосики!
        </p>
      ),
    },
  ];

  return (
    <section
      id="why-me"
      className="relative z-10 py-24 px-6 md:px-12 lg:px-20 border-t border-white/5 bg-[#05020A] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 text-center lg:text-left will-change-transform"
        >
          <h2 className="text-[12vw] lg:text-[7vw] leading-[0.85] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-euphoria-purple via-euphoria-pink to-white drop-shadow-lg mb-2">
            WHY <br className="hidden lg:block" /> ME
          </h2>
          <p className="text-euphoria-pink tracking-[0.3em] uppercase text-sm md:text-base font-semibold border-l-2 border-euphoria-pink pl-4 ml-1 inline-block lg:block">
            Elevating the core team
          </p>
        </motion.div>

        {/* СІТКА З КАРТКАМИ. Додано items-stretch для вирівнювання висоти */}
        <motion.div
          animate={
            isAnchored
              ? { x: [-15, 15, -10, 10, -5, 5, 0], y: [10, -10, 5, -5, 0] }
              : {}
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-wrap justify-center gap-6 lg:gap-8 items-stretch will-change-transform"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] flex will-change-transform"
            >
              <TiltCard
                {...card}
                isAnchored={isAnchored}
                onAnchorClick={handleAnchorDrop}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyMe;
