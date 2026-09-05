import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Star,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  ArrowUpRight,
  UtensilsCrossed,
  Trees,
  PartyPopper,
  ShoppingBag,
  Flame,
  Leaf,
  Menu as MenuIcon,
  X,
  Sparkles,
  Navigation,
  Download,
  Quote,
  ChefHat,
} from "lucide-react";

const MAPS_URL = "https://maps.app.goo.gl/JqNBXMX4XcvPocRk7";
const PHONE = "+91 88586 82467";
const PHONE_TEL = "tel:+918858682467";
const ADDRESS =
  "Aditi Apartment, Tashkent Marg, Civil Lines, Prayagraj, Uttar Pradesh 211001";

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-saffron">
      <span className="h-px w-10 bg-saffron/60" />
      {children}
      <span className="h-px w-10 bg-saffron/60" />
    </div>
  );
}

/* ---------------------------------- NAV ---------------------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    ["Story", "#story"],
    ["Signatures", "#signatures"],
    ["Menu", "#menu"],
    ["Gallery", "#gallery"],
    ["Reviews", "#reviews"],
    ["Visit", "#visit"],
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-xl border-b border-cream/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-ink transition-transform duration-500 group-hover:rotate-180">
            <Sparkles className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="leading-none">
            <span className="font-display block text-lg font-semibold tracking-wide">
              Khana Khazana
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-saffron">
              Restaurant &amp; Cafe
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-cream/70 transition-colors hover:text-saffron"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={PHONE_TEL}
            className="group inline-flex items-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-[13px] font-extrabold uppercase tracking-wider text-ink transition-all hover:bg-cream"
          >
            <Phone className="h-3.5 w-3.5" />
            Reserve a Table
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-cream/10 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-cream/80 hover:bg-cream/5 hover:text-saffron"
                >
                  {label}
                </a>
              ))}
              <a
                href={PHONE_TEL}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-5 py-3.5 text-sm font-extrabold uppercase tracking-wider text-ink"
              >
                <Phone className="h-4 w-4" /> Call to Reserve
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------------------------- HERO --------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src="images/hero.jpg"
          alt="A royal North Indian feast at Khana Khazana"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/45 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-24 pt-32 md:px-8">
        <Reveal>
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-saffron/40 bg-ink/60 px-4 py-2 text-xs font-bold tracking-wide text-saffron backdrop-blur">
              <Star className="h-3.5 w-3.5 fill-saffron" /> 4.3 · 1,678 Google
              reviews
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-ink/60 px-4 py-2 text-xs font-bold tracking-wide text-cream/85 backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-saffron" /> Civil Lines,
              Prayagraj
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-display mb-2 text-lg italic text-saffron md:text-xl">
            खाना ख़ज़ाना — a treasure of flavour
          </p>
          <h1 className="font-display max-w-5xl text-[13.5vw] font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            Where Prayagraj
            <br />
            comes to{" "}
            <em className="bg-gradient-to-r from-saffron via-gold to-ember bg-clip-text font-semibold italic text-transparent">
              feast.
            </em>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-cream/75 md:text-lg">
            Awadhi slow-cooking, a roaring clay tandoor, smoky Mughlai kebabs
            and wok-tossed Indo-Chinese — served on a lantern-lit lawn in the
            heart of Civil Lines since day one.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="group inline-flex items-center gap-3 rounded-full bg-saffron px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-ink transition-all hover:bg-cream"
            >
              Explore the Menu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-cream/30 px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-cream backdrop-blur transition-all hover:border-saffron hover:text-saffron"
            >
              <Navigation className="h-4 w-4" />
              Get Directions
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.45} className="mt-16">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-cream/60">
            {[
              "Awadhi · Mughlai",
              "North Indian",
              "Indo-Chinese",
              "Cafe & Sweets",
            ].map((c) => (
              <span key={c} className="flex items-center gap-2">
                <Flame className="h-3.5 w-3.5 text-ember" />
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-cream/50">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="h-10 w-px bg-gradient-to-b from-saffron to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------- MARQUEE -------------------------------- */

function Marquee() {
  const items = [
    "Paneer Lababdar",
    "Afghani Chicken Tikka",
    "Chhole Bhature",
    "Dum Biryani",
    "Seekh Kebab",
    "Honey Chilli Potato",
    "Butter Naan",
    "Cold Coffee",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-cream/10 bg-pine py-5">
      <div className="flex w-max animate-marquee items-center gap-8">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-xl italic text-cream/90 md:text-2xl">
              {item}
            </span>
            <Sparkles className="h-4 w-4 shrink-0 text-saffron" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- STORY --------------------------------- */

function Story() {
  const stats = [
    { k: "4.3★", v: "Google rating" },
    { k: "1,678", v: "Diner reviews" },
    { k: "4", v: "Cuisines, one kitchen" },
    { k: "40", v: "Guests per party" },
  ];
  return (
    <section id="story" className="relative overflow-hidden py-24 md:py-36">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="absolute -left-6 -top-6 h-28 w-28 rounded-tl-[2.5rem] border-l-2 border-t-2 border-saffron/50" />
          <div className="relative overflow-hidden rounded-[2.5rem]">
            <img
              src="images/interior.jpg"
              alt="Lantern-lit dining room at Khana Khazana"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1.6s] hover:scale-105 md:aspect-[5/6]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="font-display text-2xl italic text-cream">
                  The lantern room
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-saffron">
                  Indoors · Lawn · Open air
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-4 rounded-3xl bg-saffron p-6 text-ink shadow-2xl shadow-saffron/20 md:-right-8">
            <p className="font-display text-4xl font-semibold leading-none">
              ₹850
            </p>
            <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.2em]">
              for two, approx.
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionTag>Our Story</SectionTag>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-6 text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
              A small kitchen on Tashkent Marg,{" "}
              <em className="italic text-saffron">a very big reputation.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 text-base leading-relaxed text-cream/70 md:text-lg">
              Tucked beside Aditi Apartment in Civil Lines, Khana Khazana is
              the neighbourhood's open secret — the place locals take their
              favourite people. Gravies are simmered low and slow the Awadhi
              way, breads blister to order in the clay tandoor, and the cold
              coffee is exactly as famous as the kebabs.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream/70 md:text-lg">
              Dine under the lanterns indoors, or carry your plate out to the
              lawn on a winter evening. Birthdays, kitty parties, office
              dinners for up to forty — we host them all.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-cream/10 bg-cream/10 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.v} className="bg-ink-2 p-5 text-center">
                  <p className="font-display text-3xl font-semibold text-saffron">
                    {s.k}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cream/55">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- SIGNATURES ------------------------------ */

const signatures = [
  {
    img: "images/paneer.jpg",
    name: "Paneer Lababdar",
    desc: "Our most-reviewed dish. Soft paneer folded into a silky tomato-cashew gravy, finished with cream.",
    tag: "House legend",
    veg: true,
    price: "₹280",
  },
  {
    img: "images/tandoori.jpg",
    name: "Tandoori Platter",
    desc: "Chicken tikka & seekh kebabs straight off the clay oven, on a sizzler with mint chutney.",
    tag: "From the tandoor",
    veg: false,
    price: "₹420",
  },
  {
    img: "images/chole.jpg",
    name: "Chhole Bhature",
    desc: "Cloud-light bhature with aptly-spiced Amritsari chhole — the brunch Civil Lines queues for.",
    tag: "Crowd favourite",
    veg: true,
    price: "₹180",
  },
  {
    img: "images/biryani.jpg",
    name: "Awadhi Dum Biryani",
    desc: "Saffron basmati layered and sealed in the handi, opened at your table while it's still singing.",
    tag: "Slow & sealed",
    veg: false,
    price: "₹290",
  },
];

function Signatures() {
  return (
    <section id="signatures" className="bg-ink-2 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionTag>Signature Plates</SectionTag>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                The dishes that made us{" "}
                <em className="italic text-saffron">a local legend.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-cream/60">
              Pulled straight from 1,678 diner reviews — these are the plates
              people cross the city for.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {signatures.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.08}>
              <article className="group relative overflow-hidden rounded-3xl border border-cream/10 bg-ink">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={d.img}
                    alt={d.name}
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-saffron backdrop-blur">
                    {d.veg ? (
                      <Leaf className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Flame className="h-3 w-3 text-chili" />
                    )}
                    {d.tag}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-saffron px-3 py-1.5 text-xs font-extrabold text-ink">
                    {d.price}
                  </span>
                </div>
                <div className="relative -mt-10 p-6">
                  <h3 className="font-display text-2xl font-medium text-cream">
                    {d.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">
                    {d.desc}
                  </p>
                </div>
                <div className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-saffron transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- MENU --------------------------------- */

type MenuItem = { name: string; desc?: string; price: string; veg: boolean };
const menu: Record<string, MenuItem[]> = {
  "North Indian & Awadhi": [
    { name: "Paneer Lababdar", desc: "The dish our regulars swear by", price: "₹280", veg: true },
    { name: "Kadhai Paneer", desc: "Charred capsicum, crushed coriander", price: "₹270", veg: true },
    { name: "Chicken Lababdar", desc: "Rich, slow-simmered house gravy", price: "₹320", veg: false },
    { name: "Butter Chicken", desc: "Tomato-makhani, kasuri methi, cream", price: "₹340", veg: false },
    { name: "Chicken Tikka Masala", desc: "Tandoor-smoked tikka in spiced gravy", price: "₹320", veg: false },
    { name: "Awadhi Dum Biryani", desc: "Sealed handi, saffron, mint", price: "₹290", veg: false },
    { name: "Dal Makhani", desc: "Overnight black urad, white butter", price: "₹220", veg: true },
    { name: "Chhole Kulche", desc: "Generously stuffed, famously good", price: "₹180", veg: true },
    { name: "Pav Bhaji", desc: "Amul butter, street-style", price: "₹160", veg: true },
    { name: "Khana Khazana Thali", desc: "A little of everything, on one platter", price: "₹299", veg: true },
  ],
  "Tandoor & Kebabs": [
    { name: "Afghani Chicken Tikka", desc: "Mild, creamy, melt-in-mouth", price: "₹300", veg: false },
    { name: "Chicken Seekh Kebab", desc: "Hand-minced, smoked over coals", price: "₹260", veg: false },
    { name: "Paneer Tikka", desc: "Ajwain marinade, charred edges", price: "₹260", veg: true },
    { name: "Tandoori Chicken", desc: "Half bird, classic red masala", price: "₹240", veg: false },
    { name: "Fish Cutlet", desc: "Crisp crumb, tartar dip", price: "₹220", veg: false },
    { name: "Butter Naan", price: "₹50", veg: true },
    { name: "Garlic Naan", price: "₹70", veg: true },
    { name: "Lachha Paratha", price: "₹60", veg: true },
    { name: "Paneer Kulcha", price: "₹90", veg: true },
    { name: "Missi Roti", price: "₹45", veg: true },
  ],
  "Indo-Chinese": [
    { name: "Honey Chilli Potato", desc: "Crispy, sticky, perfectly balanced", price: "₹180", veg: true },
    { name: "Veg Schezwan Noodles", desc: "Wok-tossed, chatpata", price: "₹170", veg: true },
    { name: "Chicken Chowmein", price: "₹200", veg: false },
    { name: "Chilli Chicken", desc: "Dry or gravy", price: "₹280", veg: false },
    { name: "Chicken Lollypop", desc: "For spicy-starter lovers", price: "₹260", veg: false },
    { name: "Veg Manchurian", price: "₹200", veg: true },
    { name: "Arrabbiata Pasta", desc: "From the continental corner", price: "₹220", veg: true },
    { name: "Fried Rice", price: "₹170", veg: true },
  ],
  "Cafe & Sweets": [
    { name: "Cold Coffee", desc: "The Civil Lines favourite", price: "₹120", veg: true },
    { name: "Cold Coffee with Vanilla Ice Cream", desc: "Perfect for scorching summers", price: "₹150", veg: true },
    { name: "Virgin Mint Mojito", price: "₹110", veg: true },
    { name: "Sweet / Salted Lassi", price: "₹80", veg: true },
    { name: "Gulab Jamun (2 pc)", desc: "Warm, with pistachios", price: "₹90", veg: true },
    { name: "Ice Cream", desc: "Per scoop, rotating flavours", price: "₹50", veg: true },
  ],
};

function MenuSection() {
  const tabs = Object.keys(menu);
  const [active, setActive] = useState(tabs[0]);
  return (
    <section id="menu" className="relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-pine/40 blur-[120px]" />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <Reveal className="text-center">
          <SectionTag>The Menu</SectionTag>
          <h2 className="font-display mt-6 text-4xl font-medium tracking-tight md:text-6xl">
            Order like a <em className="italic text-saffron">regular.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-cream/55">
            Prices indicative — ask the team for today's specials and party
            menus.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`rounded-full px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.14em] transition-all md:px-6 md:text-[13px] ${
                  active === t
                    ? "bg-saffron text-ink"
                    : "border border-cream/15 text-cream/60 hover:border-saffron/60 hover:text-saffron"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-12 grid gap-x-12 gap-y-2 md:grid-cols-2"
          >
            {menu[active].map((item) => (
              <div
                key={item.name}
                className="group flex items-baseline justify-between gap-3 border-b border-dashed border-cream/15 py-4 transition-colors hover:border-saffron/50"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-[3px] border ${
                      item.veg
                        ? "border-emerald-400 bg-emerald-400/20"
                        : "border-chili bg-chili/20"
                    }`}
                  />
                  <div>
                    <p className="font-display text-lg text-cream transition-colors group-hover:text-saffron">
                      {item.name}
                    </p>
                    {item.desc && (
                      <p className="text-xs text-cream/45">{item.desc}</p>
                    )}
                  </div>
                </div>
                <span className="shrink-0 text-sm font-extrabold text-saffron">
                  {item.price}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <Reveal delay={0.1} className="mt-12 text-center">
          <a
            href={PHONE_TEL}
            className="group inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-ink transition-all hover:bg-saffron"
          >
            <Phone className="h-4 w-4" /> Call {PHONE} to order
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- EXPERIENCE ------------------------------ */

function Experience() {
  const feats = [
    {
      icon: UtensilsCrossed,
      title: "Family dining hall",
      desc: "Comfortable, well-lit seating for 30–40 indoors.",
    },
    {
      icon: Trees,
      title: "Open-air lawn",
      desc: "Evenings under the sky, winter sun at noon.",
    },
    {
      icon: PartyPopper,
      title: "Parties up to 40",
      desc: "Birthdays, kitties & office dinners, fully hosted.",
    },
    {
      icon: ShoppingBag,
      title: "Takeaway & delivery",
      desc: "Hot stays hot, cold stays cold — packed right.",
    },
  ];
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="absolute inset-0">
        <img
          src="images/interior.jpg"
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/88 backdrop-blur-[2px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <SectionTag>The Experience</SectionTag>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-6 text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
              Come for dinner,{" "}
              <em className="italic text-saffron">stay for the evening.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/70">
              Soothing, homelike and quick on its feet — service is famously
              fast, the staff famously warm, and there's always a corner for
              your occasion.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {feats.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-cream/12 bg-cream/[0.04] p-7 backdrop-blur-md transition-all hover:-translate-y-2 hover:border-saffron/50 hover:bg-cream/[0.07]">
                <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-saffron/15 text-saffron transition-all group-hover:bg-saffron group-hover:text-ink">
                  <f.icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-5 text-xl font-medium">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- GALLERY -------------------------------- */

function Gallery() {
  const shots = [
    { src: "images/hero.jpg", label: "The full spread", tall: true },
    { src: "images/tandoori.jpg", label: "Off the tandoor" },
    { src: "images/chinese.jpg", label: "Honey chilli potato" },
    { src: "images/biryani.jpg", label: "Handi biryani", tall: true },
    { src: "images/dessert.jpg", label: "Cafe corners" },
    { src: "images/chole.jpg", label: "Chhole bhature" },
  ];
  return (
    <section id="gallery" className="bg-ink-2 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionTag>The Gallery</SectionTag>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-6 text-4xl font-medium tracking-tight md:text-6xl">
                Shot fresh, <em className="italic text-saffron">served hot.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-saffron"
            >
              See diner photos on Google
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 columns-2 gap-5 space-y-5 md:columns-3">
          {shots.map((s, i) => (
            <Reveal key={s.src + i} delay={(i % 3) * 0.08}>
              <figure className="group relative overflow-hidden rounded-3xl break-inside-avoid border border-cream/10">
                <img
                  src={s.src}
                  alt={s.label}
                  className={`w-full object-cover transition-transform duration-[1.4s] group-hover:scale-108 ${
                    s.tall ? "aspect-[3/4]" : "aspect-square"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute bottom-4 left-5 translate-y-3 text-sm font-bold uppercase tracking-[0.18em] text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-saffron">—</span> {s.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- REVIEWS -------------------------------- */

const reviews = [
  {
    quote:
      "Paneer tikka and afghani chicken tikka were an absolute delight. Kadhai paneer tasted on point — good portions, service exactly as promised.",
    name: "Kulsoom Rehman",
    meta: "Google review",
    stars: 5,
  },
  {
    quote:
      "The chhole were so aptly spiced and bhature so light and fluffy. One of the best kulchas I've had in a long time. Recommend 100%.",
    name: "Shretima Gangwar",
    meta: "Google review",
    stars: 5,
  },
  {
    quote:
      "Food is always fresh. Hot is served proper hot, cold is real cold. Take the manager's recommendation with your eyes closed.",
    name: "Satyendra Verma",
    meta: "Google review",
    stars: 5,
  },
  {
    quote:
      "Taste was good and the kebabs were delicious. Staff was appreciative and service was quick. Try the chicken lollypop if you love spicy starters.",
    name: "Rishi Saxena",
    meta: "Google review",
    stars: 4,
  },
];

function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden py-24 md:py-36">
      <Quote className="pointer-events-none absolute -top-10 right-8 h-72 w-72 rotate-12 text-cream/[0.04]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center">
          <Reveal>
            <SectionTag>Word on the Street</SectionTag>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mx-auto mt-6 max-w-3xl text-4xl font-medium tracking-tight md:text-6xl">
              4.3 stars,{" "}
              <em className="italic text-saffron">1,678 stories.</em>
            </h2>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <blockquote className="flex h-full flex-col justify-between rounded-3xl border border-cream/12 bg-ink-2 p-8 transition-all hover:-translate-y-1.5 hover:border-saffron/40">
                <div>
                  <div className="flex gap-1">
                    {Array.from({ length: r.stars }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-saffron text-saffron" />
                    ))}
                    {Array.from({ length: 5 - r.stars }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 text-cream/25" />
                    ))}
                  </div>
                  <p className="font-display mt-5 text-xl italic leading-relaxed text-cream/85 md:text-[1.35rem]">
                    "{r.quote}"
                  </p>
                </div>
                <footer className="mt-7 flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-pine font-display text-lg font-semibold text-saffron">
                    {r.name[0]}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-cream">{r.name}</p>
                    <p className="text-xs text-cream/45">{r.meta}</p>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- VISIT --------------------------------- */

function Visit() {
  return (
    <section id="visit" className="relative overflow-hidden bg-pine py-24 md:py-36">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <Reveal>
            <SectionTag>Find Us</SectionTag>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-6 text-5xl font-medium leading-[0.98] tracking-tight md:text-7xl">
              Tonight's plan,
              <br />
              <em className="italic text-saffron">sorted.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ink/50 text-saffron">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-cream/50">
                    Address
                  </p>
                  <p className="mt-1 max-w-md text-lg text-cream">{ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ink/50 text-saffron">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-cream/50">
                    Hours
                  </p>
                  <p className="mt-1 text-lg text-cream">
                    Open daily · 11:00 AM — 11:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ink/50 text-saffron">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-cream/50">
                    Reservations &amp; takeaway
                  </p>
                  <a
                    href={PHONE_TEL}
                    className="mt-1 block text-lg text-cream underline decoration-saffron/60 underline-offset-4 hover:text-saffron"
                  >
                    {PHONE}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-saffron px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-ink transition-all hover:bg-cream"
              >
                <Navigation className="h-4 w-4" /> Open in Google Maps
              </a>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-3 rounded-full border border-cream/30 px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-cream transition-all hover:border-saffron hover:text-saffron"
              >
                <Phone className="h-4 w-4" /> Call the Kitchen
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <div className="relative h-full min-h-[26rem] overflow-hidden rounded-[2.5rem] border border-cream/15">
            <img
              src="images/dessert.jpg"
              alt="Cold coffee and gulab jamun at the cafe"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
            <div className="absolute bottom-0 w-full p-8">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-saffron">
                Chef's parting note
              </p>
              <p className="font-display mt-3 text-2xl italic leading-snug text-cream md:text-3xl">
                "End every meal with our cold coffee — thank us later."
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm font-bold text-cream/70">
                <ChefHat className="h-4 w-4 text-saffron" /> The Khana Khazana
                kitchen
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- FOOTER -------------------------------- */

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-ink">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div>
            <p className="font-display text-4xl font-medium tracking-tight md:text-5xl">
              Khana <em className="italic text-saffron">Khazana</em>
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-cream/45">
              Restaurant &amp; Cafe · Civil Lines · Prayagraj
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {[
              ["Story", "#story"],
              ["Menu", "#menu"],
              ["Gallery", "#gallery"],
              ["Visit", "#visit"],
            ].map(([l, h]) => (
              <a
                key={h}
                href={h}
                className="rounded-full border border-cream/15 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-cream/70 transition-all hover:border-saffron hover:text-saffron"
              >
                {l}
              </a>
            ))}
            <a
              href="khana-khazana-website.zip"
              download
              className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-ink transition-all hover:bg-saffron"
            >
              <Download className="h-3.5 w-3.5" /> Website files (.zip)
            </a>
          </div>
        </div>

        <div className="paisley-divider mt-12 h-3 w-full opacity-40" />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-cream/40 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Khana Khazana Restaurant &amp; Cafe,
            Prayagraj. All flavours reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Crafted with <Flame className="h-3.5 w-3.5 text-ember" /> on Tashkent
            Marg
          </p>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden pb-2">
        <p className="font-display text-outline whitespace-nowrap text-center text-[18vw] font-bold leading-[0.8] md:text-[13vw]">
          KHANA KHAZANA
        </p>
      </div>
    </footer>
  );
}

/* ---------------------------------- APP ---------------------------------- */

export default function App() {
  return (
    <main className="bg-ink text-cream antialiased">
      <Nav />
      <Hero />
      <Marquee />
      <Story />
      <Signatures />
      <MenuSection />
      <Experience />
      <Gallery />
      <Reviews />
      <Visit />
      <Footer />
    </main>
  );
}
