import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, ChevronDown, Leaf, Bug, TreePine, Shield, Wheat, Heart,
  GraduationCap, FlaskConical, Sun, Globe, Users, Sprout, Bird,
  HandHeart, Scale, Recycle, Apple, Mail, Phone, MapPin, Layout
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans scroll-smooth overflow-hidden">

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80"
            alt="Natura"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 via-emerald-900/50 to-emerald-950/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto text-white">
          <div className="mb-8">
            <img src="/logo.svg" alt="BeeHouses Foundation" className="h-28 md:h-40 w-auto mx-auto drop-shadow-2xl" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-6 leading-[1.1]">
            Dom dla <span className="text-amber-300">Całej Natury</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-4 leading-relaxed">
            BeeHouses to nie tylko dom dla pszczół. To dom dla wszystkich —
            zwierząt, roślin, ekosystemów i ludzi, którzy chcą żyć w harmonii z&nbsp;naturą.
          </p>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-10">
            Edukacja ekologiczna · Ochrona gatunków · Innowacje · Bezpieczeństwo żywnościowe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="group inline-flex items-center justify-center px-8 py-4 bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-amber-400/30 hover:-translate-y-0.5">
              Platforma Edukacyjna
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#mission" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:bg-white/10 text-white rounded-full font-bold text-lg transition-all">
              Poznaj Naszą Misję
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce z-10">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* ═══════════ MISSION INTRO ═══════════ */}
      <section id="mission" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeader
            label="Nasza Misja"
            title="Więcej niż pszczoły"
            subtitle="Fundacja BeeHouses łączy ekologię, naukę i empatię. Chronimy nie tylko zapylacze — działamy na rzecz całego ekosystemu, bezpieczeństwa żywnościowego i przyszłych pokoleń."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="relative rounded-3xl overflow-hidden h-[400px] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1446292532430-3e76f6ab6444?w=800&q=80"
                alt="Ekologia"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-white text-2xl font-serif font-bold mb-2">
                    Chronimy to, co najważniejsze
                  </h3>
                  <p className="text-white/70">
                    Od łąk po oceany — każdy ekosystem zasługuje na ochronę.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <MiniCard icon={<Globe className="h-6 w-6" />} title="Ochrona klimatu" text="Działamy na rzecz ograniczenia zmian klimatycznych i adaptacji środowiskowej." />
              <MiniCard icon={<Shield className="h-6 w-6" />} title="Ochrona gatunków" text="Wspieramy programy ochrony zagrożonych gatunków zwierząt i roślin." />
              <MiniCard icon={<Sprout className="h-6 w-6" />} title="Siedliska naturalne" text="Przywracamy i chronimy naturalne siedliska jako fundament bioróżnorodności." />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 4 FILARY ═══════════ */}
      <section className="py-24 bg-emerald-50/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeader
            label="Czym się zajmujemy"
            title="Cztery filary naszej działalności"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
            <PillarCard
              icon={<GraduationCap className="h-8 w-8" />}
              title="Edukacja Ekologiczna"
              text="Prowadzimy warsztaty, programy szkolne i platformy cyfrowe, które budują świadomość ekologiczną i promują zdrowy, zrównoważony styl życia."
              image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80"
            />
            <PillarCard
              icon={<FlaskConical className="h-8 w-8" />}
              title="Nauka i Innowacje"
              text="Wspieramy badania naukowe i rozwój innowacyjnych technologii przyjaznych środowisku — od inteligentnych uli po systemy monitoringu bioróżnorodności."
              image="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80"
            />
            <PillarCard
              icon={<HandHeart className="h-8 w-8" />}
              title="Działania Społeczne i Charytatywne"
              text="Angażujemy się w inicjatywy społeczne, legislacyjne i charytatywne na rzecz ludzi, zwierząt i przyrody. Każda istota zasługuje na godne życie."
              image="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80"
            />
            <PillarCard
              icon={<Apple className="h-8 w-8" />}
              title="Bezpieczeństwo Żywnościowe"
              text="Działamy na rzecz ochrony zasobów żywnościowych, przeciwdziałania marnowaniu żywności i zapobiegania degradacji systemów produkcji rolnej."
              image="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80"
            />
          </div>
        </div>
      </section>

      {/* ═══════════ SPECIES PROTECTION ═══════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeader
            label="Ochrona Gatunków"
            title="Dom dla wszystkich istot"
            subtitle="Pszczoły to tylko początek. Chronimy całe ekosystemy — od owadów po ssaki, od łąk po lasy. Każdy gatunek odgrywa kluczową rolę."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mt-14">
            <SpeciesCard icon={<Bug />} label="Zapylacze" />
            <SpeciesCard icon={<Bird />} label="Ptaki" />
            <SpeciesCard icon={<TreePine />} label="Lasy" />
            <SpeciesCard icon={<Leaf />} label="Rośliny" />
            <SpeciesCard icon={<Wheat />} label="Uprawy" />
            <SpeciesCard icon={<Heart />} label="Zwierzęta" />
          </div>

          {/* Full-width image banner */}
          <div className="relative rounded-3xl overflow-hidden mt-14 h-[300px] shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80"
              alt="Ekosystem leśny"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/70 to-transparent flex items-center">
              <div className="p-10 md:p-16 max-w-lg">
                <h3 className="text-white text-2xl md:text-3xl font-serif font-bold mb-3">
                  Bioróżnorodność to&nbsp;życie
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Każdy gatunek jest częścią sieci, od której zależy nasze jedzenie, powietrze i przyszłość. Chrońmy ją razem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ POLLINATORS EDUCATION ═══════════ */}
      <section className="py-24 bg-amber-50/40">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeader
            label="Zapylacze"
            title="Świat zapylaczy — mali bohaterowie"
            subtitle="Bez zapylaczy nie byłoby 75% upraw. Poznaj te niezwykłe istoty i dowiedz się, jak możesz im pomóc."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
            <div className="relative rounded-3xl overflow-hidden h-full min-h-[350px] shadow-md">
              <img
                src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80"
                alt="Pszczoła na kwiacie"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <PollinatorFact q="Co to są zapylacze?" a="Organizmy przenoszące pyłek: pszczoły, motyle, trzmiele, ptaki, a nawet wiatr i woda." />
              <PollinatorFact q="Dlaczego są ważne?" a="Wspierają reprodukcję roślin, różnorodność gatunkową i produkcję żywności na całym świecie." />
              <PollinatorFact q="Jak im pomóc?" a="Posiać kwiaty, zapewnić wodę, postawić domki dla owadów i unikać pestycydów." />
              <PollinatorFact q="Co robić przy użądleniu?" a="Wyciągnij żądło kartą, zdezynfekuj i przyłóż lód. Nie używaj pincety." />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TECH & INNOVATION ═══════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeader
            label="Innowacje"
            title="Technologia w służbie natury"
            subtitle="Łączymy tradycyjną wiedzę z nowoczesnymi rozwiązaniami, aby chronić środowisko skuteczniej niż kiedykolwiek."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            <TechCard icon={<Sun className="h-8 w-8" />} title="Inteligentne Ule" text="Czujniki IoT monitorujące temperaturę, wilgotność i akustykę roju w czasie rzeczywistym." />
            <TechCard icon={<Recycle className="h-8 w-8" />} title="Zielone Technologie" text="Rozwój rozwiązań minimalizujących ślad ekologiczny w rolnictwie i produkcji." />
            <TechCard icon={<Scale className="h-8 w-8" />} title="Inicjatywy Legislacyjne" text="Wspieramy tworzenie prawa chroniącego środowisko i prawa zwierząt na poziomie krajowym i europejskim." />
          </div>
        </div>
      </section>

      {/* ═══════════ FOOD SECURITY ═══════════ */}
      <section className="py-24 bg-emerald-50/50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase block mb-3">Żywność</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-6">
                Bezpieczeństwo żywnościowe <span className="text-emerald-600">zaczyna się od natury</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                Zdrowa żywność pochodzi ze zdrowego środowiska. Działamy na rzecz ochrony zasobów żywnościowych, zapobiegania marnowaniu jedzenia i przeciwdziałania degradacji systemów produkcji rolnej.
              </p>
              <ul className="space-y-3">
                <CheckItem text="Ochrona zasobów żywnościowych i gleb" />
                <CheckItem text="Przeciwdziałanie marnowaniu żywności" />
                <CheckItem text="Wspieranie zrównoważonego rolnictwa" />
                <CheckItem text="Edukacja o świadomej konsumpcji" />
              </ul>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-[400px] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
                alt="Zrównoważone rolnictwo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ HISTORY ═══════════ */}
      <section id="history" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeader
            label="O Nas"
            title="Historia Fundacji BeeHouses"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-14">
            <TimelineCard step="01" title="Początek Misji" text="Projekt Brodnica BeeHouses w ramach Olimpiady Zwolnieni z Teorii. Zuzanna Czupryńska, Jędrzej Pisarek i Wiktor Gencel pod opieką Pawła Cieczko." />
            <TimelineCard step="02" title="Edukacja" text="Dwa lata warsztatów w szkołach, DPS-ach i placówkach wsparcia. Do zespołu dołączył Mateusz Brzeziński." />
            <TimelineCard step="03" title="Srebrny Wilk" text="Prestiżowa Nagroda Srebrnego Wilka i wyróżnienie Marszałka Województwa Kujawsko-Pomorskiego." />
            <TimelineCard step="04" title="Fundacja" text="BeeHouses Foundation — przestrzeń, w której ekologia spotyka się z empatią i innowacją." />
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-20 bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <img src="/logo.svg" alt="Logo" className="h-16 w-auto mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Dołącz do nas</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg">
            Razem możemy więcej. Ucz się, działaj i buduj przyszłość, w&nbsp;której natura i człowiek żyją w harmonii.
          </p>
          <Link href="/login" className="group inline-flex items-center px-8 py-4 bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-amber-400/20 hover:-translate-y-0.5">
            Wejdź na Platformę
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="kontakt" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeader label="Kontakt" title="Porozmawiajmy" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            <ContactTile icon={<Mail />} label="Email" value="hello@beehouses.org" href="mailto:hello@beehouses.org" />
            <ContactTile icon={<Phone />} label="Telefon" value="+48 535 617 829" href="tel:+48535617829" />
            <ContactTile icon={<MapPin />} label="Adres" value="ul. Miodowa 12, Poznań" />
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
            <div className="max-w-sm">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
                <span className="font-serif font-bold text-lg">BeeHouses Foundation</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Dom dla całej natury. Edukacja, ochrona, innowacja — wszystko w harmonii z ekosystemem.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-x-10 gap-y-2 text-sm">
              <div>
                <h4 className="font-bold text-white/70 mb-3 text-xs uppercase tracking-wider">Fundacja</h4>
                <ul className="space-y-2 text-white/40">
                  <li><Link href="#mission" className="hover:text-white transition-colors">Misja</Link></li>
                  <li><Link href="#history" className="hover:text-white transition-colors">Historia</Link></li>
                  <li><Link href="#kontakt" className="hover:text-white transition-colors">Kontakt</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white/70 mb-3 text-xs uppercase tracking-wider">Działaj</h4>
                <ul className="space-y-2 text-white/40">
                  <li><Link href="/login" className="hover:text-white transition-colors">Platforma</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Wolontariat</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Współpraca</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white/70 mb-3 text-xs uppercase tracking-wider">Obszary</h4>
                <ul className="space-y-2 text-white/40">
                  <li><Link href="#" className="hover:text-white transition-colors">Edukacja</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Ochrona gatunków</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Żywność</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/30 text-xs">
            © {new Date().getFullYear()} BeeHouses Foundation. Wszelkie prawa zastrzeżone.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ═══════════ COMPONENT HELPERS ═══════════ */

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center">
      <span className="text-emerald-600 text-xs font-bold tracking-[0.25em] uppercase block mb-3">{label}</span>
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-3">{title}</h2>
      <div className="h-1 w-14 bg-amber-400 mx-auto rounded-full mb-4"></div>
      {subtitle && <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed mt-4">{subtitle}</p>}
    </div>
  );
}

function MiniCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-emerald-50 rounded-2xl p-6 flex items-start gap-4 hover:bg-emerald-100/60 transition-colors group">
      <div className="text-emerald-600 mt-1 group-hover:scale-110 transition-transform flex-shrink-0">{icon}</div>
      <div>
        <h4 className="font-bold text-slate-800 mb-1">{title}</h4>
        <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function PillarCard({ icon, title, text, image }: { icon: React.ReactNode; title: string; text: string; image: string }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-7">
        <div className="text-emerald-600 mb-3">{icon}</div>
        <h3 className="text-lg font-serif font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function SpeciesCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-emerald-50 rounded-2xl p-6 text-center hover:bg-emerald-100 transition-colors group cursor-default">
      <div className="text-emerald-600 mx-auto mb-3 flex justify-center group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-sm font-bold text-slate-700">{label}</span>
    </div>
  );
}

function PollinatorFact({ q, a }: { q: string; a: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-100 hover:border-amber-200 transition-colors">
      <h4 className="font-bold text-slate-800 text-sm mb-1">{q}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
    </div>
  );
}

function TechCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-md transition-all group text-center">
      <div className="text-emerald-600 mx-auto mb-4 flex justify-center group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-lg font-serif font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-slate-600 text-sm">
      <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      </div>
      {text}
    </li>
  );
}

function TimelineCard({ step, title, text }: { step: string; title: string; text: string }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100 hover:shadow-md transition-shadow group relative overflow-hidden">
      <div className="text-7xl font-serif font-bold text-slate-100 absolute -top-3 -right-2 group-hover:text-emerald-100 transition-colors">{step}</div>
      <div className="relative z-10">
        <div className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">Etap {step}</div>
        <h3 className="text-base font-serif font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function ContactTile({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="bg-slate-50 rounded-2xl p-8 text-center hover:bg-emerald-50 transition-colors group border border-slate-100">
      <div className="text-emerald-600 mx-auto mb-3 flex justify-center group-hover:scale-110 transition-transform">{icon}</div>
      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</div>
      <div className="font-semibold text-slate-700">{value}</div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
